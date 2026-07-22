"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import TopologyVortex from "@/components/TopologyVortex";

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.32], [1, 1, 0, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.36], [0, 0, -40, -60]);
  const introScale = useTransform(scrollYProgress, [0, 0.1, 0.28, 0.36], [1, 1, 0.92, 0.85]);

  const jumpOpacity = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.52], [0, 1, 1, 0]);
  const jumpScale = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.52], [0.88, 1, 1, 0.94]);

  const statementOpacity = useTransform(scrollYProgress, [0.38, 0.48, 0.72, 0.82], [0, 1, 1, 0]);
  const statementY = useTransform(scrollYProgress, [0.38, 0.48, 0.72, 0.82], [40, 0, 0, -30]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.12, 1], [1, 1, 0, 0]);
  const exitFade = useTransform(scrollYProgress, [0.88, 0.96, 1], [0, 0.6, 1]);

  return (
    <section id="work" ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <m.div className="sticky top-0 h-[100svh] overflow-hidden bg-[#efefef]">
        <TopologyVortex progress={scrollYProgress} />

        {/* Intro — "Meet us at the edge" style */}
        <m.div
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
          className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex items-end justify-between px-8 lg:bottom-[14%] lg:px-14"
        >
          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-[#1a1a1a]">
            Meet us at
            <br />
            the edge.
          </h1>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-[#555] sm:block lg:text-base">
            A new-generation communications agency — strategy, design, and
            technology for brands that move culture.
          </p>
        </m.div>

        {/* "We jump..." chapter */}
        <m.div
          style={{ opacity: jumpOpacity, scale: jumpScale }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,11vw,8rem)] font-bold tracking-tight text-[#1a1a1a]">
            We jump…
          </h2>
        </m.div>

        {/* Manifesto */}
        <m.p
          style={{ opacity: statementOpacity, y: statementY }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 mx-auto max-w-3xl -translate-y-1/2 px-6 text-center font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[#1a1a1a] sm:text-2xl lg:text-[2.4rem] lg:leading-[1.2]"
        >
          People expect more of brands than ever before. We connect strategy,
          creativity, and technology to build experiences that move people —
          and grow business.
        </m.p>

        {/* Exit to white */}
        <m.div
          style={{ opacity: exitFade }}
          className="pointer-events-none absolute inset-0 z-20 bg-white"
        />

        <m.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#888]">
            Scroll
          </span>
          <m.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-[#888]/70 to-transparent"
          />
        </m.div>
      </m.div>
    </section>
  );
}
