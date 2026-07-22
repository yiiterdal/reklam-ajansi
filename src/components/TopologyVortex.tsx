"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

type TopologyVortexProps = {
  /** Scroll-linked zoom. Omit for a gentle idle hero. */
  progress?: MotionValue<number>;
};

const SEGMENTS = 72;
const cosT = new Float32Array(SEGMENTS + 1);
const sinT = new Float32Array(SEGMENTS + 1);
const thetaT = new Float32Array(SEGMENTS + 1);
for (let p = 0; p <= SEGMENTS; p++) {
  const theta = (p / SEGMENTS) * Math.PI * 2;
  thetaT[p] = theta;
  cosT[p] = Math.cos(theta);
  sinT[p] = Math.sin(theta);
}

type ChromaticPass = { dx: number; dy: number; r: number; g: number; b: number };

export default function TopologyVortex({ progress }: TopologyVortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const idleProgress = useMotionValue(0.12);
  const progressSource = progress ?? idleProgress;
  const scrollRef = useRef(progressSource.get());

  useMotionValueEvent(progressSource, "change", (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // desynchronized:true can leave a blank buffer on some GPUs / Fast Refresh paths
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    let rings = coarse ? 36 : 48;
    let segments = coarse ? 56 : SEGMENTS;
    let renderScale = coarse ? 0.55 : 0.72;

    let frameId = 0;
    let w = 0;
    let h = 0;
    let tick = 0;
    let visible = true;
    let running = false;
    let sized = false;
    let cancelled = false;
    let lastFrame = 0;
    let slowFrames = 0;
    let resizeTries = 0;

    const resize = () => {
      if (cancelled) return false;
      const parent = canvas.parentElement;
      if (!parent) return false;

      const rect = parent.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) {
        // Parent not laid out yet — retry next frame (avoids 1×1 dead canvas)
        if (resizeTries < 60) {
          resizeTries++;
          requestAnimationFrame(resize);
        }
        return false;
      }

      resizeTries = 0;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr * renderScale));
      canvas.height = Math.max(1, Math.floor(h * dpr * renderScale));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr * renderScale, 0, 0, dpr * renderScale, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      sized = true;
      return true;
    };

    const appendRing = (
      i: number,
      t: number,
      zoom: number,
      mx: number,
      my: number,
    ) => {
      const cx = w / 2 + mx * 30;
      const cy = h / 2 + my * 22;
      const minDim = Math.min(w, h);
      const depth = i / rings;
      const baseR = minDim * (0.06 + depth * 0.62) * (1 + zoom * 0.85);
      const waveAmp = 6 + depth * 28;

      for (let p = 0; p <= segments; p++) {
        const idx = Math.round((p / segments) * SEGMENTS);
        const theta = thetaT[idx];
        const wave =
          Math.sin(theta * 5 + t * 1.1 + i * 0.35) * waveAmp +
          Math.cos(theta * 3 - t * 0.75 + i * 0.22) * waveAmp * 0.55 +
          Math.sin(theta * 8 + t * 0.5) * waveAmp * 0.25;
        const r = baseR + wave;
        const x = cx + cosT[idx] * r;
        const y = cy + sinT[idx] * r * 0.86;
        if (p === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawPass = (
      passes: ChromaticPass[],
      t: number,
      zoom: number,
      mx: number,
      my: number,
    ) => {
      for (const pass of passes) {
        ctx.beginPath();
        for (let i = rings - 1; i >= 0; i--) {
          appendRing(i, t, zoom, mx, my);
        }
        ctx.lineWidth = 1.4;
        ctx.lineJoin = "round";
        ctx.strokeStyle = `rgba(${pass.r},${pass.g},${pass.b},0.42)`;
        ctx.save();
        ctx.translate(pass.dx, pass.dy);
        ctx.stroke();
        ctx.restore();
      }
    };

    const paint = (now: number) => {
      if (!sized && !resize()) return;

      if (lastFrame) {
        const dt = now - lastFrame;
        if (dt > 22) {
          slowFrames++;
          if (slowFrames > 8 && renderScale > 0.5) {
            renderScale -= 0.06;
            rings = Math.max(28, rings - 4);
            slowFrames = 0;
            resize();
          }
        } else if (slowFrames > 0) {
          slowFrames--;
        }
      }
      lastFrame = now;

      tick++;
      const t = reduced ? 0 : tick * 0.012;
      const zoom = scrollRef.current * 1.2;
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      ctx.clearRect(0, 0, w, h);

      drawPass(
        [
          { dx: 2.5, dy: 0, r: 255, g: 70, b: 70 },
          { dx: 0, dy: 0, r: 210, g: 210, b: 210 },
          { dx: -2.5, dy: 0, r: 70, g: 130, b: 255 },
        ],
        t,
        zoom,
        mx,
        my,
      );
    };

    // Keep the rAF chain alive while running; skip paint only when offscreen.
    // Avoids the race where IntersectionObserver fires false before layout and
    // permanently kills a loop that returned early without scheduling again.
    const loop = (now: number) => {
      if (cancelled) return;
      frameId = requestAnimationFrame(loop);
      if (!visible) return;
      paint(now);
    };

    const start = () => {
      if (cancelled || running) return;
      running = true;
      visible = true;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / innerWidth, y: e.clientY / innerHeight };
    };

    resize();
    start();
    // Guarantee a first paint after layout (covers Fast Refresh / Strict Mode remount)
    requestAnimationFrame(() => {
      resize();
      if (!running) start();
      else paint(performance.now());
    });

    const ro = new ResizeObserver(() => {
      if (resize() && !running) start();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => {
        // Ignore "not intersecting" until we've had a real size — prevents the
        // 0×0 mount race that stops the loop before the first paint.
        if (!entry.isIntersecting && !sized) return;
        visible = entry.isIntersecting;
        // Never tear down the loop on leave; paint() no-ops via `visible`.
        // Restart only if something else stopped us (e.g. unmount/remount edge).
        if (visible && !running) start();
      },
      { threshold: 0, rootMargin: "40px" },
    );
    io.observe(canvas);

    if (matchMedia("(pointer:fine)").matches && !reduced) {
      addEventListener("mousemove", onMove, { passive: true });
    }

    return () => {
      cancelled = true;
      ro.disconnect();
      io.disconnect();
      removeEventListener("mousemove", onMove);
      stop();
    };
  }, [progressSource]);

  return (
    <>
      {/* Static background — light topology surface (not canvas-cleared black) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #f8f8f8 0%, #efefef 35%, #e4e4e4 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 18%, transparent 42%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 25%, rgba(180,180,180,0.35) 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
    </>
  );
}
