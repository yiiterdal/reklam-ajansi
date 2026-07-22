"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import EditionsExperience from "@/components/EditionsExperience";

const CHAPTERS = [
  { word: "Everywhere", start: 0.12, end: 0.28 },
  { word: "Strategy", start: 0.26, end: 0.4 },
  { word: "Creative", start: 0.38, end: 0.52 },
  { word: "Digital", start: 0.5, end: 0.64 },
  { word: "Impact", start: 0.62, end: 0.76 },
] as const;

const WARP_WORDS = ["Everywhere", "Strategy", "Creative", "Digital", "Impact"] as const;

const FEATURES = [
  {
    title: "Brand strategy",
    body: "Positioning, narrative, and go-to-market clarity for brands ready to lead.",
  },
  {
    title: "Campaign creative",
    body: "Film, social, OOH, and launch systems built to move culture.",
  },
  {
    title: "Digital experience",
    body: "Websites, platforms, and product storytelling that convert attention.",
  },
  {
    title: "Content & social",
    body: "Always-on content engines and community-first channel playbooks.",
  },
  {
    title: "Data & analytics",
    body: "Measurement frameworks that connect creative work to business outcomes.",
  },
  {
    title: "Retail & activation",
    body: "Pop-ups, events, and in-store moments that extend the brand world.",
  },
] as const;

const PILL_LABELS = ["Strategy", "Creative", "Digital", "Impact"] as const;

export default function EditionsHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const auroraOpacity = useTransform(scrollYProgress, [0.28, 0.36, 0.72, 0.8], [0, 1, 1, 0]);
  const warpWordsOpacity = useTransform(scrollYProgress, [0.18, 0.26, 0.58, 0.66], [0, 1, 1, 0]);
  const manifestoOpacity = useTransform(scrollYProgress, [0.36, 0.44, 0.68, 0.76], [0, 1, 1, 0]);
  const manifestoY = useTransform(scrollYProgress, [0.36, 0.44, 0.68, 0.76], [30, 0, 0, -20]);
  const gridOpacity = useTransform(scrollYProgress, [0.62, 0.7, 0.88, 0.94], [0, 1, 1, 0]);
  const gridY = useTransform(scrollYProgress, [0.62, 0.7, 0.88, 0.94], [40, 0, 0, -20]);
  const pillOpacity = useTransform(scrollYProgress, [0.58, 0.66, 0.92, 0.98], [0, 1, 1, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0.66, 0.74, 0.88, 0.94], [0, 0.75, 0.75, 0]);
  const exitFade = useTransform(scrollYProgress, [0.9, 0.97, 1], [0, 0.7, 1]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.03, 0.1, 1], [1, 1, 0, 0]);

  const ch0 = useTransform(scrollYProgress, [0.08, 0.12, 0.28, 0.34], [0, 1, 1, 0]);
  const ch1 = useTransform(scrollYProgress, [0.22, 0.26, 0.4, 0.46], [0, 1, 1, 0]);
  const ch2 = useTransform(scrollYProgress, [0.34, 0.38, 0.52, 0.58], [0, 1, 1, 0]);
  const ch3 = useTransform(scrollYProgress, [0.46, 0.5, 0.64, 0.7], [0, 1, 1, 0]);
  const ch4 = useTransform(scrollYProgress, [0.58, 0.62, 0.76, 0.82], [0, 1, 1, 0]);
  const chapterOpacities = [ch0, ch1, ch2, ch3, ch4];

  return (
    <section ref={containerRef} className="relative" style={{ height: "600vh" }}>
      <m.div className="sticky top-0 h-[100svh] overflow-hidden bg-[#06040c]">
        <EditionsExperience progress={scrollYProgress} />

        {/* Aurora columns — CSS, not canvas */}
        <m.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: auroraOpacity }}>
          <m.div
            className="absolute left-[12%] top-0 h-full w-[24%] bg-gradient-to-b from-violet-400/30 via-fuchsia-500/12 to-transparent blur-3xl"
            animate={{ x: [0, 30, -20, 0], opacity: [0.4, 0.85, 0.5, 0.4] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.div
            className="absolute left-[40%] top-0 h-full w-[16%] bg-gradient-to-b from-purple-300/25 via-violet-500/10 to-transparent blur-2xl"
            animate={{ x: [0, -25, 15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.div
            className="absolute right-[14%] top-0 h-full w-[22%] bg-gradient-to-b from-orange-300/20 via-violet-500/12 to-transparent blur-3xl"
            animate={{ x: [0, 20, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </m.div>

        {/* Blurred photo layer */}
        <m.div className="absolute inset-0" style={{ opacity: photoOpacity }}>
          <div
            className="absolute inset-0 bg-cover bg-center blur-2xl saturate-125"
            style={{ backgroundImage: "url(/images/hero/creative-desk.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </m.div>

        {/* Cylindrical warp words */}
        <m.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px", opacity: warpWordsOpacity }}
        >
          {WARP_WORDS.map((word, i) => (
            <m.div
              key={word}
              aria-hidden
              className="absolute whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2rem,9vw,6.5rem)] font-bold uppercase tracking-tight text-white/[0.05]"
              style={{ transformStyle: "preserve-3d", rotateY: -50 + i * 36 }}
              animate={{ rotateY: [-50 + i * 36, 310 + i * 36] }}
              transition={{ duration: 26 + i * 3, repeat: Infinity, ease: "linear" }}
            >
              {word}
            </m.div>
          ))}
        </m.div>

        {/* Chapter titles */}
        {CHAPTERS.map((chapter, i) => (
          <m.h2
            key={chapter.word}
            style={{ opacity: chapterOpacities[i] }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,9rem)] font-bold uppercase tracking-tight text-white"
          >
            {chapter.word}
          </m.h2>
        ))}

        {/* Manifesto */}
        <m.p
          style={{ opacity: manifestoOpacity, y: manifestoY }}
          className="pointer-events-none absolute inset-x-0 top-[58%] z-10 mx-auto max-w-2xl px-6 text-center text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl"
        >
          150+ ways to build brands that sell, inspire, and grow — strategy,
          creative, and technology in one connected system.
        </m.p>

        {/* Feature grid — Shopify Editions card layout */}
        <m.div
          style={{ opacity: gridOpacity, y: gridY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl px-6 pb-24 pt-8 lg:px-10 lg:pb-28"
        >
          <div className="grid gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((item) => (
              <div
                key={item.title}
                className="border-b border-white/10 px-0 py-5 sm:border-r sm:px-5 lg:py-6 [&:nth-child(3n)]:sm:border-r-0 lg:[&:nth-child(3n)]:border-r"
              >
                <h3 className="mb-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/55 sm:text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </m.div>

        {/* Category pill */}
        <m.div
          style={{ opacity: pillOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md">
            <span className="text-sm font-medium text-white">Strategy</span>
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-white/60" />
              <span className="block h-px w-4 bg-white/60" />
            </span>
          </div>
        </m.div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(6,4,12,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06040c]/45 via-transparent to-[#06040c]/70" />

        {/* Exit to white */}
        <m.div
          style={{ opacity: exitFade }}
          className="pointer-events-none absolute inset-0 z-30 bg-white"
        />

        <m.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <m.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent"
          />
        </m.div>
      </m.div>
    </section>
  );
}
