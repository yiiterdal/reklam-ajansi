"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import type { WorkMedia } from "@/lib/workMedia";
import { workPoster } from "@/lib/workMedia";

type Props = {
  items: WorkMedia[];
};

function MediaFill({
  item,
  className = "",
  priority = false,
}: {
  item: WorkMedia;
  className?: string;
  priority?: boolean;
}) {
  if (item.kind === "image") {
    return (
      <Image
        src={item.src}
        alt={item.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 70vw"
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <SlowWorkVideo
      src={item.src}
      poster={item.poster ?? workPoster(item.src)}
      rate={0.42}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}

function Caption({
  item,
  tone = "dark",
}: {
  item: WorkMedia;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div>
      <p
        className={`font-[family-name:var(--font-display)] text-lg font-bold tracking-tight sm:text-xl ${
          light ? "text-white" : "text-black"
        }`}
      >
        {item.title}
      </p>
      {item.subtitle ? (
        <p className={`mt-1 text-sm ${light ? "text-white/70" : "text-black/45"}`}>
          {item.subtitle}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Editorial /visuals composition — asymmetric spreads, runway strip,
 * overlapping stills. Each asset appears once.
 */
export default function VisualsComposition({ items }: Props) {
  const stills = items.filter((i) => i.kind === "image");
  const motion = items.filter((i) => i.kind !== "image");

  // Fixed roles so nothing repeats on the page
  const bodyWave = stills[0];
  const galaxy = stills[1];
  const stamp = stills[2];
  const wild = stills[3];
  const underscores = stills[4];

  const runway = motion.slice(0, 5);
  const pairA = motion[5];
  const pairB = motion[6];
  const darkStack = motion.slice(7, 10);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div className="bg-white text-black">
      {/* Hero — one composition */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden bg-[#101010] text-white"
      >
        {galaxy ? (
          <m.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
            <div className="absolute inset-0">
              <MediaFill item={galaxy} priority className="opacity-50" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-[#101010]/40" />
          </m.div>
        ) : null}

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
              Visual library
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.92] tracking-tight">
              Look
              <br />
              closer.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Stills and loops staged like a studio wall — paced, not dumped.
            </p>
          </div>

          <div className="mt-16 grid items-end gap-4 sm:grid-cols-12 sm:gap-5">
            {wild ? (
              <m.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden sm:col-span-5"
              >
                <MediaFill item={wild} />
              </m.div>
            ) : null}
            {underscores ? (
              <m.div
                initial={{ opacity: 0, y: 44 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="relative ml-auto aspect-[3/4] w-[70%] overflow-hidden sm:col-span-3 sm:ml-0 sm:w-full sm:-translate-y-10"
              >
                <MediaFill item={underscores} />
              </m.div>
            ) : null}
            {stamp ? (
              <m.div
                initial={{ opacity: 0, y: 52, rotate: 4 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[651/782] w-[55%] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:col-span-4 sm:w-full sm:translate-y-4"
              >
                <MediaFill item={stamp} />
              </m.div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Body Wave — full-bleed brand moment */}
      {bodyWave ? (
        <section className="relative">
          <div className="relative h-[72svh] min-h-[440px] overflow-hidden sm:h-[88svh]">
            <MediaFill item={bodyWave} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
              <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6">
                <Caption item={bodyWave} tone="light" />
                <p className="hidden max-w-xs text-right text-sm leading-relaxed text-white/55 md:block">
                  Systems that survive the stage, the feed, and the quiet pause after.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Motion runway */}
      {runway.length > 0 ? (
        <section className="border-y border-black/5 bg-[#f3f3f3] py-16 lg:py-20">
          <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
                Motion runway
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
                Drag the tempo.
              </h2>
            </div>
            <p className="hidden text-sm text-black/40 sm:block">Swipe →</p>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 sm:px-8 lg:px-12">
            {runway.map((item, i) => (
              <m.article
                key={item.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 5) * 0.04 }}
                className="group relative w-[78vw] max-w-md shrink-0 snap-center sm:w-[44vw] lg:w-[30vw]"
              >
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <MediaFill
                    item={item}
                    className="transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <Caption item={item} />
                  <span className="font-mono text-[10px] text-black/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </m.article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Offset pair */}
      {(pairA || pairB) && (
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto mb-10 max-w-[1600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
              Pairing
            </p>
            <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Wide against tall.
            </h2>
          </div>
          <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-12">
            {pairA ? (
              <m.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-7"
              >
                <div className={`relative overflow-hidden ${pairA.aspect}`}>
                  <MediaFill item={pairA} />
                </div>
                <div className="mt-4">
                  <Caption item={pairA} />
                </div>
              </m.article>
            ) : null}
            {pairB ? (
              <m.article
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="md:col-span-5 md:pt-20"
              >
                <div className={`relative overflow-hidden ${pairB.aspect}`}>
                  <MediaFill item={pairB} />
                </div>
                <div className="mt-4">
                  <Caption item={pairB} />
                </div>
              </m.article>
            ) : null}
          </div>
        </section>
      )}

      {/* Dark staggered stack */}
      {darkStack.length > 0 ? (
        <section className="bg-[#111] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto mb-12 max-w-[1600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Loop studies
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
              Slow enough to feel the craft.
            </h2>
          </div>
          <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-3">
            {darkStack.map((item, i) => (
              <m.article
                key={item.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={
                  i === 1 ? "md:translate-y-14" : i === 2 ? "md:-translate-y-8" : ""
                }
              >
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <MediaFill item={item} />
                </div>
                <div className="mt-4">
                  <Caption item={item} tone="light" />
                </div>
              </m.article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
              Next
            </p>
            <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Want this energy on your brand?
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-medium text-black/70 transition hover:bg-[#e0e0e0]"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
