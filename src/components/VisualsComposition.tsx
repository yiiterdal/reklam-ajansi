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

function byTitle(items: WorkMedia[], title: string) {
  return items.find((i) => i.title === title);
}

/**
 * Studio-wall /visuals — named roles, layered depths, no random grid.
 */
export default function VisualsComposition({ items }: Props) {
  const bodyWave = byTitle(items, "Body Wave");
  const stamp = byTitle(items, "Folk Mark");
  const wild = byTitle(items, "Wild rendered");
  const underscores = byTitle(items, "underscores");
  const rewind = byTitle(items, "Rewind Room");
  const wide = byTitle(items, "Wide Cut");
  const soft = byTitle(items, "Soft Core");
  const square = byTitle(items, "Square Signal");
  const pulse = byTitle(items, "Pulse Grid");

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="bg-white text-black">
      {/* Hero: Body Wave full-bleed + floating stills */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] overflow-hidden bg-[#0e0e0e] text-white"
      >
        {bodyWave ? (
          <m.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
            <div className="absolute inset-0">
              <MediaFill item={bodyWave} priority />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          </m.div>
        ) : null}

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 lg:pt-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
              Visual library
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.92] tracking-tight">
              Look
              <br />
              closer.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Stills and loops staged in depth — paced like a studio wall, not a dump.
            </p>
          </div>

          <div className="relative mt-16 h-[42vw] min-h-[220px] max-h-[420px] w-full sm:mt-10">
            {wild ? (
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 z-[1] w-[58%] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:w-[46%]"
              >
                <div className="relative aspect-[5/4]">
                  <MediaFill item={wild} />
                </div>
              </m.div>
            ) : null}
            {underscores ? (
              <m.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-[8%] left-[42%] z-[2] w-[34%] overflow-hidden sm:left-[38%] sm:w-[26%]"
              >
                <div className="relative aspect-[3/4]">
                  <MediaFill item={underscores} />
                </div>
              </m.div>
            ) : null}
            {stamp ? (
              <m.div
                initial={{ opacity: 0, y: 56, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 2.5 }}
                transition={{ duration: 0.95, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 right-0 z-[3] w-[40%] overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.5)] sm:w-[30%]"
              >
                <div className="relative aspect-[651/782]">
                  <MediaFill item={stamp} />
                </div>
              </m.div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Depth strip: Rewind large + Soft Core overlapping */}
      {(rewind || soft) && (
        <section className="relative overflow-hidden bg-[#f4f4f4] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto mb-12 max-w-[1600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
              Poster craft
            </p>
            <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Night energy, print precision.
            </h2>
          </div>

          <div className="relative mx-auto max-w-[1600px]">
            <div className="grid items-end gap-6 md:grid-cols-12 md:gap-0">
              {rewind ? (
                <m.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-7 md:pr-8"
                >
                  <div className={`relative overflow-hidden ${rewind.aspect}`}>
                    <MediaFill item={rewind} />
                  </div>
                  <div className="mt-4">
                    <Caption item={rewind} />
                  </div>
                </m.article>
              ) : null}
              {soft ? (
                <m.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-5 md:-ml-10 md:mb-16 md:z-[1] lg:-ml-16"
                >
                  <div
                    className={`relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.12)] ${soft.aspect}`}
                  >
                    <MediaFill item={soft} />
                  </div>
                  <div className="mt-4">
                    <Caption item={soft} />
                  </div>
                </m.article>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Wide Cut — full-bleed motion moment */}
      {wide ? (
        <section className="relative">
          <div className="relative h-[62svh] min-h-[380px] overflow-hidden sm:h-[78svh]">
            <MediaFill item={wide} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
              <div className="mx-auto max-w-[1600px]">
                <Caption item={wide} tone="light" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Dark stack: staggered loops */}
      {(square || pulse) && (
        <section className="bg-[#111] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto mb-12 max-w-[1600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
              Loop studies
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
              Slow enough to feel the craft.
            </h2>
          </div>
          <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-2 md:gap-8">
            {square ? (
              <m.article
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:translate-y-8"
              >
                <div className={`relative overflow-hidden ${square.aspect}`}>
                  <MediaFill item={square} />
                </div>
                <div className="mt-4">
                  <Caption item={square} tone="light" />
                </div>
              </m.article>
            ) : null}
            {pulse ? (
              <m.article
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="md:-translate-y-4"
              >
                <div className={`relative overflow-hidden ${pulse.aspect}`}>
                  <MediaFill item={pulse} />
                </div>
                <div className="mt-4">
                  <Caption item={pulse} tone="light" />
                </div>
              </m.article>
            ) : null}
          </div>
        </section>
      )}

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
