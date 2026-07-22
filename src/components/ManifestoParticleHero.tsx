"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

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

type Star = {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
};

type Streak = {
  angle: number;
  dist: number;
  speed: number;
  len: number;
  alpha: number;
  hue: number;
};

const WARP_WORDS = ["Strategy", "Creativity", "Technology", "Impact"] as const;

function buildClusters(width: number, height: number): Cluster[] {
  const s = Math.min(width, height);
  return [
    { bx: width * 0.22, by: height * 0.38, spread: s * 0.34, r: 139, g: 92, b: 246, drift: 0.5, phase: 0 },
    { bx: width * 0.78, by: height * 0.42, spread: s * 0.3, r: 249, g: 115, b: 22, drift: 0.62, phase: 1.2 },
    { bx: width * 0.5, by: height * 0.62, spread: s * 0.38, r: 192, g: 38, b: 211, drift: 0.4, phase: 2.4 },
    { bx: width * 0.62, by: height * 0.22, spread: s * 0.26, r: 96, g: 165, b: 250, drift: 0.55, phase: 3.6 },
    { bx: width * 0.35, by: height * 0.72, spread: s * 0.22, r: 230, g: 210, b: 255, drift: 0.35, phase: 4.8 },
    { bx: width * 0.85, by: height * 0.68, spread: s * 0.2, r: 167, g: 243, b: 208, drift: 0.45, phase: 5.5 },
  ];
}

function seedParticles(count: number, clusters: Cluster[]): Particle[] {
  return Array.from({ length: count }, () => {
    const ci = Math.floor(Math.random() * clusters.length);
    const cluster = clusters[ci];
    return {
      angle: Math.random() * Math.PI * 2,
      radius: Math.pow(Math.random(), 0.52) * cluster.spread,
      size: 0.5 + Math.random() * 2.4,
      alpha: 0.1 + Math.random() * 0.75,
      r: cluster.r + (Math.random() - 0.5) * 55,
      g: cluster.g + (Math.random() - 0.5) * 55,
      b: cluster.b + (Math.random() - 0.5) * 55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.9,
      cluster: ci,
    };
  });
}

function seedStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.4 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 2,
  }));
}

function seedStreaks(count: number): Streak[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    dist: Math.random() * 40,
    speed: 2 + Math.random() * 6,
    len: 30 + Math.random() * 120,
    alpha: 0.1 + Math.random() * 0.35,
    hue: Math.random() > 0.5 ? 270 : 25,
  }));
}

type ManifestoParticleHeroProps = {
  progress?: MotionValue<number>;
};

export default function ManifestoParticleHero({ progress }: ManifestoParticleHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const intensityRef = useRef(0.6);
  const fallbackProgress = useMotionValue(0.5);
  const activeProgress = progress ?? fallbackProgress;

  useMotionValueEvent(activeProgress, "change", (v) => {
    const active = Math.max(0, Math.min(1, (v - 0.28) / 0.24));
    intensityRef.current = 0.35 + active * 0.65;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;
    let particles: Particle[] = [];
    let stars: Star[] = [];
    let streaks: Streak[] = [];
    let clusters: Cluster[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let tick = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      clusters = buildClusters(width, height);
      const area = width * height;
      particles = seedParticles(Math.min(4800, Math.floor(area / 160)), clusters);
      stars = seedStars(Math.min(2200, Math.floor(area / 400)), width, height);
      streaks = seedStreaks(120);
    };

    const clusterPos = (cluster: Cluster, t: number, mx: number, my: number) => {
      const morphX = Math.sin(t * 0.22 + cluster.phase) * width * 0.06;
      const morphY = Math.cos(t * 0.18 + cluster.phase * 1.3) * height * 0.05;
      const breathe = 1 + Math.sin(t * 0.35 + cluster.phase) * 0.12;
      return {
        cx: cluster.bx + morphX + mx * cluster.drift * 50,
        cy: cluster.by + morphY + my * cluster.drift * 40,
        spread: cluster.spread * breathe,
      };
    };

    const draw = () => {
      if (!isVisible || !isPageVisible) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      tick += 1;
      const t = tick * 0.004;
      const intensity = intensityRef.current;
      const warpPhase = (Math.sin(t * 0.35) + 1) / 2;

      ctx.fillStyle = "#06040c";
      ctx.fillRect(0, 0, width, height);

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      // Nebula wash
      const neb = ctx.createRadialGradient(
        width * (0.5 + mx * 0.08),
        height * (0.45 + my * 0.06),
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.7,
      );
      neb.addColorStop(0, `rgba(139,92,246,${0.08 + intensity * 0.1})`);
      neb.addColorStop(0.4, `rgba(192,38,211,${0.04 + warpPhase * 0.06})`);
      neb.addColorStop(1, "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, width, height);

      // Twinkling star field
      for (const star of stars) {
        const twinkle = reducedMotion
          ? 0.5
          : 0.25 + ((Math.sin(t * star.speed + star.phase) + 1) / 2) * 0.75;
        const sx = star.x + mx * 8;
        const sy = star.y + my * 6;
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.35 * intensity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Warp speed streaks (Payments-style radial burst)
      if (!reducedMotion && warpPhase > 0.55) {
        const cx = width / 2;
        const cy = height / 2;
        const streakPower = (warpPhase - 0.55) * 2.2 * intensity;

        ctx.save();
        ctx.translate(cx, cy);
        for (const streak of streaks) {
          streak.dist += streak.speed * streakPower;
          if (streak.dist > Math.max(width, height)) {
            streak.dist = 0;
            streak.angle = Math.random() * Math.PI * 2;
          }

          const x1 = Math.cos(streak.angle) * streak.dist;
          const y1 = Math.sin(streak.angle) * streak.dist;
          const x2 = Math.cos(streak.angle) * (streak.dist + streak.len * streakPower);
          const y2 = Math.sin(streak.angle) * (streak.dist + streak.len * streakPower);

          const grad = ctx.createLinearGradient(x1, y1, x2, y2);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(
            0.5,
            streak.hue > 180
              ? `rgba(167,139,250,${streak.alpha * streakPower})`
              : `rgba(251,191,36,${streak.alpha * streakPower * 0.8})`,
          );
          grad.addColorStop(1, "transparent");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 + streakPower;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Organic particle clusters (point-cloud landscape)
      for (const particle of particles) {
        const cluster = clusters[particle.cluster];
        const { cx, cy, spread } = clusterPos(cluster, t, mx, my);
        const drift = reducedMotion ? 0 : Math.sin(t * particle.speed + particle.phase) * 14;
        const swirl = reducedMotion ? 0 : Math.cos(t * particle.speed * 0.65 + particle.phase) * 10;
        const angle = particle.angle + (reducedMotion ? 0 : t * 0.1 * particle.speed);
        const radius = (particle.radius / cluster.spread) * spread + drift * 0.2;

        const x = cx + Math.cos(angle) * radius + swirl;
        const y = cy + Math.sin(angle) * radius * 0.88 + drift * 0.5;

        const dist = Math.hypot(x - width / 2, y - height / 2);
        const centerFade = 1 - Math.min(dist / (Math.min(width, height) * 0.5), 1) * 0.4;
        const alpha = particle.alpha * centerFade * intensity;

        ctx.fillStyle = `rgba(${particle.r | 0},${particle.g | 0},${particle.b | 0},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * (0.8 + intensity * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reducedMotion) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#06040c]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* Cylindrical warp words — "Everywhere" effect */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {WARP_WORDS.map((word, i) => (
          <m.div
            key={word}
            aria-hidden
            className="absolute whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,7rem)] font-bold uppercase tracking-tight text-white/[0.035]"
            style={{
              transformStyle: "preserve-3d",
              rotateY: -60 + i * 40,
            }}
            animate={{
              rotateY: [-60 + i * 40, 300 + i * 40],
              z: [0, 80, 0, -80, 0],
            }}
            transition={{
              duration: 28 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {word}
          </m.div>
        ))}
      </div>

      {/* Animated aurora beams */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <m.div
          className="absolute left-[12%] top-0 h-full w-[24%] bg-gradient-to-b from-violet-400/30 via-fuchsia-500/12 to-transparent blur-3xl"
          animate={{ x: [0, 30, -20, 0], opacity: [0.5, 0.9, 0.6, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute left-[38%] top-0 h-full w-[18%] bg-gradient-to-b from-purple-300/25 via-violet-500/10 to-transparent blur-2xl"
          animate={{ x: [0, -25, 15, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute right-[15%] top-0 h-full w-[22%] bg-gradient-to-b from-orange-300/20 via-violet-500/12 to-transparent blur-3xl"
          animate={{ x: [0, 20, -30, 0], opacity: [0.35, 0.75, 0.45, 0.35] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(139,92,246,0.18),transparent_65%)]" />
      </m.div>

      {/* Vignette + grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,4,12,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06040c]/50 via-transparent to-[#06040c]/70" />
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
