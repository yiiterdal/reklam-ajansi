"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import AnimatedVisual from "@/components/AnimatedVisual";
import ScrollIndicator from "@/components/ScrollIndicator";
import RevealText from "@/components/RevealText";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55, 1], [0, -80, -80]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#1a0f24] px-6 pb-16 pt-28 lg:px-10 lg:pb-24"
    >
      <m.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <AnimatedVisual
          src="/images/glow-teal-orange.png"
          index={1}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />
        <m.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(26,15,36,0.65) 0%, rgba(139,92,246,0.35) 50%, rgba(26,15,36,0.75) 100%)",
              "linear-gradient(135deg, rgba(26,15,36,0.65) 0%, rgba(192,38,211,0.3) 50%, rgba(26,15,36,0.75) 100%)",
              "linear-gradient(135deg, rgba(26,15,36,0.65) 0%, rgba(168,85,247,0.32) 50%, rgba(26,15,36,0.75) 100%)",
              "linear-gradient(135deg, rgba(26,15,36,0.65) 0%, rgba(139,92,246,0.35) 50%, rgba(26,15,36,0.75) 100%)",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/35" />
      </m.div>

      <ScrollIndicator />

      <m.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative mx-auto w-full max-w-7xl"
      >
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            New-generation communications agency
          </p>
          <RevealText
            as="h1"
            text="A multidisciplinary strategy, marketing, and design agency."
            trigger="mount"
            delay={0.1}
            className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/85 lg:text-xl">
            We combine strategy, design, and technology to accelerate company
            growth and increase brand awareness.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-sm font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-70"
          >
            About us
          </Link>
        </m.div>
      </m.div>
    </section>
  );
}
