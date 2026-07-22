"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import DesignOpenIntro from "@/components/DesignOpenIntro";

const COLLAGE_IMAGES = [
  "/images/hero/studio-lights.jpg",
  "/images/hero/creative-desk.jpg",
  "/images/hero/urban-night.jpg",
  "/images/manifesto/studio-meeting.jpg",
] as const;

const PHONES = [
  {
    label: "The Green Edit",
    image: "/images/hero/neon-crowd.jpg",
    caption: "Campaign",
  },
  {
    label: "Removing Background…",
    image: "/images/hero/paint-splash.jpg",
    caption: "Tool",
  },
  {
    label: "Move money",
    image: "/images/hero/liquid-violet.jpg",
    caption: "Product",
    glow: true,
  },
] as const;

const CITIES = [
  { name: "Istanbul", region: "TÜRKİYE" },
  { name: "Ankara", region: "TÜRKİYE" },
  { name: "London", region: "UNITED KINGDOM" },
  { name: "New York", region: "USA", studio: true },
  { name: "Dubai", region: "UAE" },
] as const;

function GlitchHeroTitle() {
  return (
    <div className="relative mx-auto max-w-5xl text-center">
      <h1 className="relative z-10 font-[family-name:var(--font-display)] text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-black">
        Make the
        <br />
        new normal
      </h1>
      <p className="relative z-10 mx-auto mt-6 max-w-lg text-base text-black/55 sm:text-lg">
        How we work is changing shape. So is what&apos;s possible.
      </p>
    </div>
  );
}

/** Mouse-follow glitch windows — mid-intro state from the video */
function HeroGlitchPortals() {
  const ref = useRef<HTMLDivElement>(null);
  const [spots, setSpots] = useState(
    () =>
      [
        { x: 22, y: 28, s: 56, hue: 180 },
        { x: 48, y: 18, s: 40, hue: 300 },
        { x: 62, y: 42, s: 48, hue: 140 },
        { x: 38, y: 58, s: 36, hue: 20 },
      ] as { x: number; y: number; s: number; hue: number }[],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      setSpots((prev) =>
        prev.map((p, i) => ({
          ...p,
          x: p.x + (px - p.x) * (0.04 + i * 0.01),
          y: p.y + (py - p.y) * (0.03 + i * 0.01),
        })),
      );
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      {spots.map((s, i) => (
        <div
          key={i}
          className="absolute overflow-hidden rounded-sm shadow-sm"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            transform: "translate(-50%, -50%)",
            background: `
              linear-gradient(90deg,
                hsl(${s.hue} 90% 55% / 0.9),
                hsl(${s.hue + 80} 90% 60% / 0.85),
                hsl(${s.hue + 160} 80% 50% / 0.9)
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.35) 2px,
                rgba(0,0,0,0.35) 3px
              )
            `,
            mixBlendMode: "multiply",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

type MosaicTile = {
  src: string;
  className: string;
  depth: number;
  label?: string;
  accent?: "lime" | "dark" | "phone" | "none";
};

const MOSAIC: MosaicTile[] = [
  {
    src: "/images/hero/paint-splash.jpg",
    className: "left-[4%] top-[8%] h-[26%] w-[22%] rounded-2xl",
    depth: 18,
    label: "Product grid",
  },
  {
    src: "/images/hero/neon-crowd.jpg",
    className: "left-[28%] top-[4%] h-[30%] w-[28%] rounded-2xl",
    depth: 28,
    accent: "dark",
  },
  {
    src: "/images/hero/liquid-violet.jpg",
    className: "right-[6%] top-[6%] h-[24%] w-[20%] rounded-2xl",
    depth: 14,
  },
  {
    src: "/images/hero/design-mockup.jpg",
    className: "left-[8%] top-[42%] h-[38%] w-[18%] rounded-[1.6rem]",
    depth: 32,
    accent: "phone",
  },
  {
    src: "/images/hero/creative-desk.jpg",
    className: "left-[30%] top-[42%] h-[34%] w-[24%] rounded-2xl",
    depth: 22,
  },
  {
    src: "/images/hero/studio-lights.jpg",
    className: "right-[8%] top-[38%] h-[36%] w-[22%] rounded-2xl",
    depth: 26,
    accent: "phone",
  },
  {
    src: "/images/hero/color-field.jpg",
    className: "right-[28%] top-[48%] h-[28%] w-[18%] rounded-2xl",
    depth: 16,
    accent: "lime",
    label: "Play with",
  },
];

function FloatingArtifactField() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative h-[120vh] overflow-hidden bg-[#f4f4f4]"
      aria-label="Design mosaic"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {MOSAIC.map((tile, i) => (
          <MosaicCard key={tile.src + i} tile={tile} sx={sx} sy={sy} index={i} />
        ))}

        <m.p
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-black/90 sm:text-5xl"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          artifact
        </m.p>
      </div>
    </section>
  );
}

function MosaicCard({
  tile,
  sx,
  sy,
  index,
}: {
  tile: MosaicTile;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  index: number;
}) {
  const x = useTransform(sx, (v) => v * tile.depth * 2.4);
  const y = useTransform(sy, (v) => v * tile.depth * 1.8);

  return (
    <m.div
      className={`absolute overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.14)] ${tile.className}`}
      style={{ x, y, zIndex: 10 + index }}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image src={tile.src} alt="" fill className="object-cover" sizes="40vw" />
      {tile.accent === "dark" && <div className="absolute inset-0 bg-black/35" />}
      {tile.accent === "lime" && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#c8ff00]">
          <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Play with
          </span>
        </div>
      )}
      {tile.accent === "phone" && (
        <div className="absolute inset-x-0 top-2 z-10 flex justify-center">
          <div className="h-3 w-14 rounded-full bg-black/70" />
        </div>
      )}
      {tile.label && tile.accent !== "lime" && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/90">{tile.label}</p>
        </div>
      )}
    </m.div>
  );
}

function ApplyPill() {
  return (
    <Link
      href="/contact"
      className="group fixed right-5 top-5 z-[60] flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02] sm:right-8 sm:top-6"
    >
      <span className="pl-1 text-sm font-medium text-black">apply</span>
      <span className="inline-block h-3 w-3 bg-[#e6007e]" aria-hidden />
      <span className="text-sm font-medium text-black">now</span>
      <span className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </Link>
  );
}

function DialArc() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const smooth = useSpring(mx, { stiffness: 120, damping: 22 });
  const rotate = useTransform(smooth, [0, 1], [-48, 48]);
  const capsuleX = useTransform(smooth, [0, 1], ["18%", "78%"]);
  const capsuleY = useTransform(smooth, [0, 0.5, 1], ["42%", "18%", "42%"]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx]);

  const ticks = Array.from({ length: 48 }, (_, i) => i);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-6 py-24"
    >
      <m.svg
        viewBox="0 0 800 420"
        className="absolute left-1/2 top-[18%] h-auto w-[min(1100px,120%)] -translate-x-1/2"
        style={{ rotate }}
        aria-hidden
      >
        <path
          d="M 40 360 A 360 360 0 0 1 760 360"
          fill="none"
          stroke="#e10600"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {ticks.map((i) => {
          const t = i / (ticks.length - 1);
          const angle = Math.PI - t * Math.PI;
          const r1 = 330;
          const r2 = 345;
          const cx = 400;
          const cy = 360;
          const x1 = cx + Math.cos(angle) * r1;
          const y1 = cy - Math.sin(angle) * r1;
          const x2 = cx + Math.cos(angle) * r2;
          const y2 = cy - Math.sin(angle) * r2;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d4d4d4"
              strokeWidth="1.5"
            />
          );
        })}
      </m.svg>

      <m.div
        className="absolute h-10 w-16 -translate-x-1/2 -translate-y-1/2"
        style={{ left: capsuleX, top: capsuleY }}
      >
        <div
          className="h-full w-full rotate-[-28deg] rounded-full shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, #1e3a8a 0%, #1e3a8a 48%, #e6007e 52%, #e6007e 100%)",
          }}
        />
      </m.div>

      <p className="relative z-10 mt-48 max-w-md text-center text-sm text-black/50 sm:mt-56">
        Move to shape what&apos;s next — strategy, product, and brand systems in motion.
      </p>
    </section>
  );
}

function PhoneFrame({
  image,
  label,
  caption,
  glow,
  offset,
}: {
  image: string;
  label: string;
  caption: string;
  glow?: boolean;
  offset: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative mx-auto w-[min(260px,78vw)] ${offset}`}
    >
      <div className="rounded-[2rem] bg-[#e8e8e8] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
        <div className="relative overflow-hidden rounded-[1.55rem] bg-black aspect-[9/19]">
          <Image src={image} alt="" fill className="object-cover" sizes="260px" />
          <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-3">
            <div className="h-5 w-20 rounded-full bg-black/80" />
          </div>
          <div className="absolute inset-x-3 bottom-16 z-10 rounded-2xl bg-white/25 p-4 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white drop-shadow">{label}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/70">{caption}</p>
          </div>
          {glow && (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-8 right-2 h-24 w-24 rounded-full bg-[#c084fc]/50 blur-2xl"
            />
          )}
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-8 text-white/80">
            <span className="text-[10px]">●</span>
            <span className="text-[10px]">○</span>
            <span className="text-[10px]">▢</span>
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function DesignExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <div className="bg-white text-black">
      {!introDone && <DesignOpenIntro onDone={() => setIntroDone(true)} />}

      <ApplyPill />

      {/* Hero — clean state after video open */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-6 pb-24 pt-28"
      >
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2 sm:left-8 sm:top-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-[10px] font-bold text-white">
            B
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
            .design
          </span>
        </div>

        <HeroGlitchPortals />

        <m.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
          <GlitchHeroTitle />
        </m.div>
      </section>

      {/* Floating artifact mosaic — mouse-reactive cards */}
      <FloatingArtifactField />

      {/* LIVE grid */}
      <section className="border-t border-black/10 px-5 pb-20 pt-8 sm:px-10">
        <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between gap-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            • LIVE
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">
            FROM BEARSTOW
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 md:gap-5">
          {/* Collage card */}
          <m.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-[#f3f3f3] p-6"
          >
            <div className="relative mx-auto h-[260px] w-full">
              {COLLAGE_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className="absolute overflow-hidden rounded-lg shadow-md"
                  style={{
                    width: "42%",
                    aspectRatio: "3/4",
                    left: `${8 + i * 14}%`,
                    top: `${10 + (i % 2) * 18}%`,
                    rotate: `${-12 + i * 8}deg`,
                    zIndex: i + 1,
                  }}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="160px" />
                </div>
              ))}
            </div>
            <p className="pointer-events-none absolute inset-x-4 bottom-8 text-center font-mono text-[11px] tracking-[0.35em] text-black/70">
              V E R E&nbsp;&nbsp;S T O R E&nbsp;&nbsp;A G E N T
            </p>
          </m.article>

          {/* Dark product card */}
          <m.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-[#111]"
          >
            <Image
              src="/images/hero/design-mockup.jpg"
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-28 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm" />
            </div>
          </m.article>

          {/* Ops / flow card */}
          <m.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="relative min-h-[340px] overflow-hidden rounded-[1.5rem] bg-[#f6f6f6]"
          >
            <Image
              src="/images/hero/color-field.jpg"
              alt=""
              fill
              className="object-cover opacity-40"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 p-6">
              <div className="space-y-3 font-mono text-[11px] text-black/60">
                {["Brief", "System", "Launch", "Learn"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-black" />
                    <span>{step}</span>
                    {i < 3 && <span className="h-px flex-1 bg-black/15" />}
                  </div>
                ))}
              </div>
            </div>
          </m.article>
        </div>
      </section>

      {/* Phone showcase */}
      <section className="bg-[#f2f2f2] px-4 py-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-3 md:gap-6">
          <PhoneFrame {...PHONES[0]} offset="md:mt-16" />
          <PhoneFrame {...PHONES[1]} offset="md:mt-0" />
          <PhoneFrame {...PHONES[2]} offset="md:mt-24" glow />
        </div>
      </section>

      {/* Red dial */}
      <DialArc />

      {/* Together in cities */}
      <section className="border-t border-black/10 bg-white px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-8 text-center font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Together in
          </p>
          <ul className="space-y-5 sm:space-y-6">
            {CITIES.map((city, i) => (
              <m.li
                key={city.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: i * 0.04 }}
                className={`flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 ${
                  i % 2 === 0 ? "sm:justify-center" : "sm:justify-center"
                }`}
              >
                {"studio" in city && city.studio ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-none tracking-tight">
                      New
                    </span>
                    <span className="relative h-16 w-28 overflow-hidden rounded-md sm:h-20 sm:w-36">
                      <Image
                        src="/images/manifesto/studio-meeting.jpg"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                      <span className="absolute bottom-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-black">
                        studio
                      </span>
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-none tracking-tight">
                      York
                    </span>
                  </span>
                ) : (
                  <span className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,8vw,4.5rem)] font-bold leading-none tracking-tight">
                    {city.name}
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                  {city.region}
                </span>
              </m.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
