"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";

const heroSlides = [
  "/images/hero/creative-desk.jpg",
  "/images/hero/studio-lights.jpg",
  "/images/hero/design-mockup.jpg",
] as const;

const disciplines = [
  "Brand Strategy",
  "Campaign Identity",
  "Digital Experience",
  "Social Content",
  "Film & Photography",
  "E-commerce",
  "ATL / BTL",
  "Performance Media",
] as const;

const sectors = [
  {
    label: "Consumer",
    title: "Launch systems",
    text: "Identity, key visual, and channel rollout for product-led brands entering new markets.",
  },
  {
    label: "Health",
    title: "Trust at scale",
    text: "Insight-led campaigns that turn complex propositions into clear, credible stories.",
  },
  {
    label: "Luxury",
    title: "Editorial craft",
    text: "Premium visual language across retail, content, and commerce touchpoints.",
  },
] as const;

export default function WorkHero() {
  const ref = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const panelScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 1.03]);
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], [32, 0, -24]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-gray-200 bg-[#1a0f24]"
    >
      <m.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="sync">
          <m.div
            key={heroSlides[activeSlide]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[activeSlide]}
              alt=""
              fill
              priority={activeSlide === 0}
              className="object-cover"
              sizes="100vw"
            />
          </m.div>
        </AnimatePresence>
      </m.div>

      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 15% 20%, rgba(139,92,246,0.45), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(192,38,211,0.28), transparent 50%)",
            "radial-gradient(ellipse at 75% 25%, rgba(168,85,247,0.4), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(249,115,22,0.22), transparent 48%)",
            "radial-gradient(ellipse at 40% 60%, rgba(124,58,237,0.42), transparent 52%), radial-gradient(ellipse at 90% 30%, rgba(236,72,153,0.25), transparent 50%)",
            "radial-gradient(ellipse at 15% 20%, rgba(139,92,246,0.45), transparent 55%), radial-gradient(ellipse at 85% 75%, rgba(192,38,211,0.28), transparent 50%)",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a0f24]/92 via-[#1a0f24]/55 to-[#1a0f24]/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0f24]/80 via-transparent to-[#1a0f24]/30" />

      <div className="relative mx-auto grid min-h-[min(92vh,940px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-28">
        <m.div style={{ y: contentY }} className="relative z-10">
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200/80"
          >
            Selected work
          </m.p>

          <RevealText
            as="h2"
            text="Strategy, craft, and motion — built as one system."
            className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.35rem]"
          />

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg"
          >
            We present work by idea, discipline, and outcome — not client names.
            Every project starts with insight and ends with measurable impact
            across brand, campaign, and digital.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Explore work
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/services"
              className="text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
            >
              Our services
            </Link>
          </m.div>
        </m.div>

        <m.div
          style={{ scale: panelScale }}
          className="relative z-10 hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
            <AnimatePresence mode="wait">
              <m.div
                key={heroSlides[activeSlide]}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={heroSlides[activeSlide]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 42vw"
                />
              </m.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f24]/70 via-transparent to-violet-500/10" />

            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6">
              {sectors.map((sector, i) => (
                <m.div
                  key={sector.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                  className="border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-200/90">
                    {sector.label}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-white">
                    {sector.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    {sector.text}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          <m.div
            aria-hidden
            className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-500/30 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </m.div>
      </div>

      <div className="relative z-10 overflow-hidden border-t border-white/10 py-5">
        <div className="flex w-max animate-marquee gap-3">
          {[...disciplines, ...disciplines].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="shrink-0 border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
