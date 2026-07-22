"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type WaterRippleWordmarkProps = {
  /** Path to glass wordmark PNG (transparent bg preferred) */
  src?: string;
  alt?: string;
  className?: string;
  /** Fill a full viewport-tall section (dirtverse-scale mark) */
  fillViewport?: boolean;
  /** dirtverse defaults */
  hoverRippleRadius?: number;
  clickRippleRadius?: number;
  clickRippleStrength?: number;
  damping?: number;
  frameRate?: number;
  borderRadius?: number;
};

type RippleState = {
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
  oldIdx: number;
  newIdx: number;
  rippleMap: number[];
  lastMap: number[];
  texture: ImageData;
  ripple: ImageData;
  mapIdx: number;
};

/**
 * Exact port of dirtverse.co footer water-ripple (Framer code component).
 * Distorts a pre-rendered glass wordmark image on hover/click.
 */
export default function WaterRippleWordmark({
  src = "/images/bearstow-glass-wordmark.png",
  alt = "bearstow",
  className = "",
  fillViewport = false,
  hoverRippleRadius = 10,
  clickRippleRadius = 6,
  clickRippleStrength = 804,
  damping = 5,
  frameRate = 36,
  borderRadius = 0,
}: WaterRippleWordmarkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const stateRef = useRef<RippleState | null>(null);
  const hoveringRef = useRef(false);
  const trailsRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  /** Map CSS pointer position → canvas buffer pixels (handles DPR / downscale). */
  const pointerToCanvas = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return null;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  }, []);

  const disturb = useCallback(
    (x: number, y: number, radius: number, strength: number) => {
      const st = stateRef.current;
      if (!st?.rippleMap) return;
      const { width, height, rippleMap, oldIdx } = st;
      x = Math.floor(x);
      y = Math.floor(y);
      for (let i = y - radius; i < y + radius; i++) {
        for (let j = x - radius; j < x + radius; j++) {
          if (i >= 0 && i < height && j >= 0 && j < width) {
            rippleMap[oldIdx + i * width + j] += strength;
          }
        }
      }
    },
    [],
  );

  const stepRipple = useCallback(() => {
    const st = stateRef.current;
    if (!st?.rippleMap) return;
    const { width, height, halfWidth, halfHeight, rippleMap, lastMap, texture, ripple } = st;

    let oldIdx = st.oldIdx;
    st.oldIdx = st.newIdx;
    st.newIdx = oldIdx;

    let u = 0;
    st.mapIdx = st.oldIdx;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let p =
          (rippleMap[st.mapIdx - width] +
            rippleMap[st.mapIdx + width] +
            rippleMap[st.mapIdx - 1] +
            rippleMap[st.mapIdx + 1]) >>
          1;
        p -= rippleMap[st.newIdx + u];
        if (damping > 0) p -= p >> damping;
        rippleMap[st.newIdx + u] = p;
        p = 1024 - p;
        const prev = lastMap[u];
        lastMap[u] = p;
        if (prev !== p) {
          let sx = Math.floor(((x - halfWidth) * p) / 1024) + halfWidth;
          let sy = Math.floor(((y - halfHeight) * p) / 1024) + halfHeight;
          sx = Math.max(0, Math.min(width - 1, sx));
          sy = Math.max(0, Math.min(height - 1, sy));
          const src = (sx + sy * width) * 4;
          const dst = u * 4;
          ripple.data[dst] = texture.data[src];
          ripple.data[dst + 1] = texture.data[src + 1];
          ripple.data[dst + 2] = texture.data[src + 2];
          ripple.data[dst + 3] = texture.data[src + 3];
        }
        st.mapIdx++;
        u++;
      }
    }
  }, [damping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width < 2 || size.height < 2) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = size.width;
    canvas.height = size.height;

    let cancelled = false;
    let running = true;
    const img = new Image();
    img.crossOrigin = "anonymous";

    const init = () => {
      if (cancelled || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const imgAspect = img.width / img.height;
      let dw: number;
      let dh: number;
      let dx: number;
      let dy: number;

      if (fillViewport) {
        // Full word visible — fit inside viewport with light margin
        const padX = 0.06;
        const padY = 0.1;
        const maxW = w * (1 - padX * 2);
        const maxH = h * (1 - padY * 2);
        if (maxW / imgAspect <= maxH) {
          dw = maxW;
          dh = dw / imgAspect;
        } else {
          dh = maxH;
          dw = dh * imgAspect;
        }
        dx = (w - dw) / 2;
        dy = (h - dh) / 2;
      } else {
        const canvasAspect = w / h;
        if (imgAspect > canvasAspect) {
          dw = w;
          dh = w / imgAspect;
          dx = 0;
          dy = (h - dh) / 2;
        } else {
          dh = h;
          dw = h * imgAspect;
          dx = (w - dw) / 2;
          dy = 0;
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
      const texture = ctx.getImageData(0, 0, w, h);
      const ripple = ctx.getImageData(0, 0, w, h);
      const mapSize = w * (h + 2) * 2;
      stateRef.current = {
        width: w,
        height: h,
        halfWidth: w >> 1,
        halfHeight: h >> 1,
        oldIdx: w,
        newIdx: w * (h + 3),
        rippleMap: Array(mapSize).fill(0),
        lastMap: Array(w * h).fill(0),
        texture,
        ripple,
        mapIdx: w,
      };

      const interval = 1000 / frameRate;
      const loop = (now: number) => {
        if (cancelled) return;
        rafRef.current = requestAnimationFrame(loop);
        if (!running || !stateRef.current?.rippleMap) return;
        if (now - lastFrameRef.current < interval) return;
        lastFrameRef.current = now;
        stepRipple();
        ctx.putImageData(stateRef.current.ripple, 0, 0);

        if (hoveringRef.current && trailsRef.current.length > 0) {
          ctx.save();
          ctx.globalCompositeOperation = "source-over";
          trailsRef.current.forEach((t, n) => {
            const age = Date.now() - t.time;
            if (age < 500) {
              const alpha = 1 - age / 500;
              ctx.globalAlpha = alpha * 0.35;
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(t.x, t.y, 2.5 + n * 0.4, 0, Math.PI * 2);
              ctx.fill();
            }
          });
          ctx.restore();
          const t = Date.now();
          trailsRef.current = trailsRef.current.filter((e) => t - e.time < 500);
        }
      };
      lastFrameRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    img.onload = init;
    img.onerror = () => {
      console.error("[WaterRippleWordmark] failed to load", src);
    };
    img.src = src;

    const parent = canvas.parentElement;
    const io =
      parent &&
      new IntersectionObserver(
        ([entry]) => {
          running = entry.isIntersecting;
        },
        { threshold: 0.01 },
      );
    if (parent && io) io.observe(parent);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      stateRef.current = null;
      io?.disconnect();
    };
  }, [size, src, frameRate, stepRipple, fillViewport]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // Cap buffer for perf, but mouse coords are remapped to this size
      const maxW = 1600;
      const scale = Math.min(1, maxW / Math.max(1, width));
      setSize({
        width: Math.max(2, Math.floor(width * scale)),
        height: Math.max(2, Math.floor(height * scale)),
      });
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const pushTrail = (x: number, y: number) => {
    trailsRef.current.push({ x, y, time: Date.now() });
    if (trailsRef.current.length > 10) trailsRef.current.shift();
  };

  const onMove = (e: React.MouseEvent) => {
    if (!hoveringRef.current) return;
    const p = pointerToCanvas(e.clientX, e.clientY);
    if (!p) return;
    pushTrail(p.x, p.y);
    disturb(p.x, p.y, hoverRippleRadius, 160);
  };

  const onDown = (e: React.MouseEvent) => {
    const p = pointerToCanvas(e.clientX, e.clientY);
    if (!p) return;
    disturb(p.x, p.y, clickRippleRadius, clickRippleStrength);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!e.touches.length || !hoveringRef.current) return;
    const p = pointerToCanvas(e.touches[0].clientX, e.touches[0].clientY);
    if (!p) return;
    pushTrail(p.x, p.y);
    disturb(p.x, p.y, hoverRippleRadius, 160);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    hoveringRef.current = true;
    if (!e.touches.length) return;
    const p = pointerToCanvas(e.touches[0].clientX, e.touches[0].clientY);
    if (!p) return;
    disturb(p.x, p.y, clickRippleRadius, clickRippleStrength);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        borderRadius,
        ...(fillViewport
          ? { height: "100%", width: "100%" }
          : { aspectRatio: "2945 / 1294" }),
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="block h-full w-full touch-none"
        style={{ borderRadius }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseEnter={() => {
          hoveringRef.current = true;
        }}
        onMouseLeave={() => {
          hoveringRef.current = false;
          trailsRef.current = [];
        }}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={() => {
          hoveringRef.current = false;
          trailsRef.current = [];
        }}
      />
    </div>
  );
}
