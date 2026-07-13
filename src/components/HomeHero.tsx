"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import AnimatedVisual from "@/components/AnimatedVisual";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-28 lg:px-10 lg:pb-24"
    >
      <m.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <AnimatedVisual
          src="/images/abstract-fluid-1.png"
          index={1}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />
        <m.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(13,148,136,0.25) 50%, rgba(15,23,42,0.65) 100%)",
              "linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(234,88,12,0.22) 50%, rgba(15,23,42,0.65) 100%)",
              "linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(124,58,237,0.22) 50%, rgba(15,23,42,0.65) 100%)",
              "linear-gradient(135deg, rgba(15,23,42,0.55) 0%, rgba(13,148,136,0.25) 50%, rgba(15,23,42,0.65) 100%)",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
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
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            A multidisciplinary strategy, marketing, and design agency.
          </h1>
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
