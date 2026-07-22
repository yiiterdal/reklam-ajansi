"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

type Cluster = {
  bx: number;
  by: number;
  spread: number;
  r: number;
  g: number;
  b: number;
  drift: number;
  phase: number;
};

type Particle = {
  angle: number;
  radius: number;
  size: number;
  alpha: number;
  r: number;
  g: number;
  b: number;
  phase: number;
  speed: number;
  cluster: number;
};

type GrainDot = { x: number; y: number; r: number; g: number; b: number; size: number; phase: number };
type Star = { x: number; y: number; size: number; phase: number; speed: number };
type Streak = { angle: number; dist: number; speed: number; len: number; alpha: number; hue: number };
type TreeDot = { x: number; y: number; size: number; hue: number; rowAlpha: number };

function sceneWeights(p: number) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  return {
    grain: clamp(1 - p / 0.14),
    landscape: clamp((p - 0.2) / 0.14) * clamp(1 - (p - 0.48) / 0.12),
    aurora: clamp((p - 0.32) / 0.12) * clamp(1 - (p - 0.74) / 0.14),
    manifesto: clamp((p - 0.38) / 0.1) * clamp(1 - (p - 0.7) / 0.12),
    warp: clamp((p - 0.52) / 0.1) * clamp(1 - (p - 0.8) / 0.1),
    photo: clamp((p - 0.68) / 0.12) * clamp(1 - (p - 0.92) / 0.1),
    exit: clamp((p - 0.84) / 0.16),
  };
}

function buildClusters(w: number, h: number): Cluster[] {
  const s = Math.min(w, h);
  return [
    { bx: w * 0.22, by: h * 0.38, spread: s * 0.34, r: 120, g: 200, b: 80, drift: 0.5, phase: 0 },
    { bx: w * 0.78, by: h * 0.42, spread: s * 0.3, r: 200, g: 220, b: 100, drift: 0.62, phase: 1.2 },
    { bx: w * 0.5, by: h * 0.62, spread: s * 0.38, r: 139, g: 92, b: 246, drift: 0.4, phase: 2.4 },
    { bx: w * 0.62, by: h * 0.22, spread: s * 0.26, r: 249, g: 115, b: 22, drift: 0.55, phase: 3.6 },
    { bx: w * 0.35, by: h * 0.72, spread: s * 0.22, r: 192, g: 38, b: 211, drift: 0.35, phase: 4.8 },
  ];
}

function seedParticles(n: number, clusters: Cluster[]): Particle[] {
  return Array.from({ length: n }, () => {
    const ci = Math.floor(Math.random() * clusters.length);
    const c = clusters[ci];
    return {
      angle: Math.random() * Math.PI * 2,
      radius: Math.pow(Math.random(), 0.52) * c.spread,
      size: 0.5 + Math.random() * 2.2,
      alpha: 0.12 + Math.random() * 0.7,
      r: c.r + (Math.random() - 0.5) * 45,
      g: c.g + (Math.random() - 0.5) * 45,
      b: c.b + (Math.random() - 0.5) * 45,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.9,
      cluster: ci,
    };
  });
}

function seedGrain(n: number, w: number, h: number): GrainDot[] {
  const palette = [
    [120, 200, 80],
    [200, 220, 100],
    [139, 92, 246],
    [249, 115, 22],
    [255, 255, 255],
  ] as const;
  return Array.from({ length: n }, () => {
    const c = palette[Math.floor(Math.random() * palette.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: c[0],
      g: c[1],
      b: c[2],
      size: 0.8 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function seedStars(n: number, w: number, h: number): Star[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 0.4 + Math.random() * 1.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 2,
  }));
}

function seedStreaks(n: number): Streak[] {
  return Array.from({ length: n }, () => ({
    angle: Math.random() * Math.PI * 2,
    dist: Math.random() * 40,
    speed: 2 + Math.random() * 6,
    len: 30 + Math.random() * 100,
    alpha: 0.1 + Math.random() * 0.35,
    hue: Math.random() > 0.5 ? 270 : 25,
  }));
}

function seedTreeDots(n: number, w: number, h: number): TreeDot[] {
  const dots: TreeDot[] = [];
  for (let t = 0; t < n; t++) {
    const x = Math.random() * w;
    const base = h * (0.55 + Math.random() * 0.35);
    const height = 60 + Math.random() * 160;
    const width = 20 + Math.random() * 45;
    const hue = 120 + Math.random() * 80;
    const cols = 10;
    for (let row = 0; row < cols; row++) {
      const py = base - (row / cols) * height;
      const pw = width * (1 - row / cols) * 0.85;
      const rowAlpha = 0.15 + (row / cols) * 0.55;
      for (let i = 0; i < 6; i++) {
        dots.push({
          x: x + (Math.random() - 0.5) * pw,
          y: py + (Math.random() - 0.5) * 8,
          size: 1 + Math.random() * 2,
          hue: hue + row * 3,
          rowAlpha,
        });
      }
    }
  }
  return dots;
}

type EditionsExperienceProps = {
  progress: MotionValue<number>;
};

export default function EditionsExperience({ progress }: EditionsExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const progressRef = useRef(0);

  useMotionValueEvent(progress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    let renderScale = coarse ? 0.55 : 0.68;

    let frameId = 0;
    let particles: Particle[] = [];
    let grain: GrainDot[] = [];
    let stars: Star[] = [];
    let streaks: Streak[] = [];
    let treeDots: TreeDot[] = [];
    let clusters: Cluster[] = [];
    let w = 0;
    let h = 0;
    let tick = 0;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.max(1, Math.floor(w * dpr * renderScale));
      canvas.height = Math.max(1, Math.floor(h * dpr * renderScale));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr * renderScale, 0, 0, dpr * renderScale, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      clusters = buildClusters(w, h);
      const area = w * h;
      const scale = coarse ? 0.55 : 1;
      particles = seedParticles(Math.min(1400, Math.floor((area / 320) * scale)), clusters);
      grain = seedGrain(Math.min(900, Math.floor((area / 520) * scale)), w, h);
      stars = seedStars(Math.min(700, Math.floor((area / 680) * scale)), w, h);
      streaks = seedStreaks(coarse ? 50 : 80);
      treeDots = seedTreeDots(coarse ? 14 : 22, w, h);
    };

    const clusterPos = (c: Cluster, t: number, mx: number, my: number) => {
      const morphX = Math.sin(t * 0.22 + c.phase) * w * 0.06;
      const morphY = Math.cos(t * 0.18 + c.phase * 1.3) * h * 0.05;
      const breathe = 1 + Math.sin(t * 0.35 + c.phase) * 0.12;
      return {
        cx: c.bx + morphX + mx * c.drift * 50,
        cy: c.by + morphY + my * c.drift * 40,
        spread: c.spread * breathe,
      };
    };

    const draw = () => {
      if (!visible) return;

      tick++;
      const t = reduced ? 0 : tick * 0.004;
      const p = progressRef.current;
      const s = sceneWeights(p);
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;
      const warpPhase = (Math.sin(t * 0.35) + 1) / 2;

      ctx.fillStyle = s.exit > 0.5 ? "#faf8ff" : "#06040c";
      ctx.fillRect(0, 0, w, h);

      if (s.exit > 0) {
        ctx.fillStyle = `rgba(250,248,255,${s.exit * 0.95})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (s.grain > 0.02) {
        for (const dot of grain) {
          const tw = reduced ? 0.5 : 0.3 + ((Math.sin(t * 2 + dot.phase) + 1) / 2) * 0.7;
          ctx.fillStyle = `rgba(${dot.r},${dot.g},${dot.b},${tw * 0.5 * s.grain})`;
          ctx.beginPath();
          ctx.arc(dot.x + mx * 4, dot.y + my * 3, dot.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const starA = Math.max(s.aurora, s.manifesto, s.warp, s.landscape);
      if (starA > 0.02) {
        for (const star of stars) {
          const tw = reduced ? 0.4 : 0.2 + ((Math.sin(t * star.speed + star.phase) + 1) / 2) * 0.8;
          ctx.fillStyle = `rgba(255,255,255,${tw * 0.4 * starA})`;
          ctx.beginPath();
          ctx.arc(star.x + mx * 6, star.y + my * 5, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (s.landscape > 0.02) {
        for (const dot of treeDots) {
          const sway = reduced ? 0 : Math.sin(t * 0.5 + dot.x * 0.01) * 6;
          ctx.fillStyle = `hsla(${dot.hue},55%,${38}%,${dot.rowAlpha * s.landscape})`;
          ctx.beginPath();
          ctx.arc(dot.x + sway, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const partA = Math.max(s.landscape, s.manifesto, s.aurora);
      if (partA > 0.02) {
        for (const particle of particles) {
          const cluster = clusters[particle.cluster];
          const { cx, cy, spread } = clusterPos(cluster, t, mx, my);
          const drift = reduced ? 0 : Math.sin(t * particle.speed + particle.phase) * 14;
          const angle = particle.angle + (reduced ? 0 : t * 0.1 * particle.speed);
          const radius = (particle.radius / cluster.spread) * spread + drift * 0.2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius * 0.88 + drift * 0.5;
          const dist = Math.hypot(x - w / 2, y - h / 2);
          const fade = 1 - Math.min(dist / (Math.min(w, h) * 0.5), 1) * 0.4;
          ctx.fillStyle = `rgba(${particle.r | 0},${particle.g | 0},${particle.b | 0},${particle.alpha * fade * partA})`;
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (s.warp > 0.05 && !reduced) {
        ctx.save();
        ctx.translate(w / 2, h / 2);
        const power = s.warp * (0.5 + warpPhase * 0.8);
        for (const streak of streaks) {
          streak.dist += streak.speed * power;
          if (streak.dist > Math.max(w, h)) {
            streak.dist = 0;
            streak.angle = Math.random() * Math.PI * 2;
          }
          const x1 = Math.cos(streak.angle) * streak.dist;
          const y1 = Math.sin(streak.angle) * streak.dist;
          const x2 = Math.cos(streak.angle) * (streak.dist + streak.len * power);
          const y2 = Math.sin(streak.angle) * (streak.dist + streak.len * power);
          ctx.strokeStyle =
            streak.hue > 180
              ? `rgba(167,139,250,${streak.alpha * power})`
              : `rgba(251,191,36,${streak.alpha * power * 0.8})`;
          ctx.lineWidth = 1 + power;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(draw);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / innerWidth, y: e.clientY / innerHeight };
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    canvas.parentElement && ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(canvas);

    if (matchMedia("(pointer:fine)").matches && !reduced) {
      addEventListener("mousemove", onMove, { passive: true });
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      removeEventListener("mousemove", onMove);
      stop();
    };
  }, [progress]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
  );
}
