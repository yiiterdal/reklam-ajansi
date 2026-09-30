"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import StudioMediaHero from "@/components/StudioMediaHero";
import WorkMediaFill from "@/components/WorkMediaFill";
import type { WorkMedia } from "@/lib/workMedia";

type Props = {
  items: WorkMedia[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

function aspectRatio(aspect: string): number {
  if (aspect === "aspect-square") return 1;
  if (aspect === "aspect-video") return 16 / 9;
  const match = aspect.match(/aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/);
  return match ? Number(match[1]) / Number(match[2]) : 1;
}

function ArchiveCard({
  item,
  number,
  className,
  sizes,
  large = false,
  y,
}: {
  item: WorkMedia;
  number: number;
  className: string;
  sizes: string;
  large?: boolean;
  y?: MotionValue<number>;
}) {
  const card = (
    <m.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl bg-[#111] ${className}`}
    >
      <m.div
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        <WorkMediaFill
          item={item}
          fit="cover"
          sizes={sizes}
          className="transition duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
      </m.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/25 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <span className="rounded-full bg-white/15 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-white backdrop-blur-md">
          {String(number).padStart(2, "0")}
        </span>
        <span className="grid h-10 w-10 translate-y-2 scale-75 place-items-center rounded-full bg-white text-black opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
        {item.subtitle ? (
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-white/85 ${
              large ? "" : "hidden sm:block"
            }`}
          >
            {item.subtitle}
          </p>
        ) : null}
        <h3
          className={`mt-1.5 font-[family-name:var(--font-display)] font-bold leading-[1.05] tracking-tight text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 ${
            large ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
          }`}
        >
          {item.title}
        </h3>
      </div>
    </m.article>
  );

  return y ? <m.div style={{ y }}>{card}</m.div> : card;
}

/**
 * Work page — hero lead, then a rhythmic archive: big/portrait pairs framing
 * a parallax portrait row and a closing square row.
 */
export default function PortfolioStudio({ items }: Props) {
  const [lead, ...archive] = items;
  const squares = archive.filter((item) => aspectRatio(item.aspect) >= 0.9);
  const portraits = archive.filter((item) => aspectRatio(item.aspect) < 0.9);

  const [bigA, bigB, ...squareRow] = squares;
  const [tallA, ...portraitRest] = portraits;
  const tallB = portraitRest.pop();
  const portraitRow = portraitRest;

  const order = [bigA, tallA, ...portraitRow, tallB, bigB, ...squareRow].filter(Boolean) as WorkMedia[];
  const numberOf = (item: WorkMedia) => order.indexOf(item) + 1;

  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const drift = reduce ? 0 : 56;
  const yUp = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-drift * 0.4, drift * 0.4]);

  const bigSizes = "(max-width: 768px) 100vw, 58vw";
  const tallSizes = "(max-width: 768px) 100vw, 42vw";

  return (
    <div className="bg-white">
      <StudioMediaHero
        label="Selected work"
        title="Work that moves."
        description="Brand films, identity loops, and social cuts — built for real-world brands that want culture to notice."
        ctaHref="/contact"
        ctaLabel="Start a project"
        videoSrc={lead?.src ?? "/videos/works/work-0.mp4"}
        poster={lead?.poster}
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between gap-4 lg:mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
              Studio archive · {String(order.length).padStart(2, "0")} pieces
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-5xl">
              Depth over density.
            </h2>
          </div>
          <Link
            href="/visuals"
            className="hidden text-sm font-medium text-black/50 underline-offset-4 hover:text-black hover:underline sm:inline"
          >
            Visual library
          </Link>
        </div>

        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 md:gap-4">
          {bigA ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
              <ArchiveCard item={bigA} number={numberOf(bigA)} large sizes={bigSizes} className="aspect-square md:col-span-7" />
              {tallA ? (
                <ArchiveCard
                  item={tallA}
                  number={numberOf(tallA)}
                  large
                  sizes={tallSizes}
                  className="aspect-[3/4] md:col-span-5 md:aspect-auto"
                />
              ) : null}
            </div>
          ) : null}

          {portraitRow.length > 0 ? (
            <div ref={rowRef} className="grid grid-cols-2 gap-3 py-2 md:grid-cols-4 md:gap-4 md:py-10">
              {portraitRow.map((item, i) => (
                <ArchiveCard
                  key={item.src}
                  item={item}
                  number={numberOf(item)}
                  y={i % 2 === 0 ? yUp : yDown}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="aspect-[3/4]"
                />
              ))}
            </div>
          ) : null}

          {bigB ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
              {tallB ? (
                <ArchiveCard
                  item={tallB}
                  number={numberOf(tallB)}
                  large
                  sizes={tallSizes}
                  className="order-2 aspect-[3/4] md:order-none md:col-span-5 md:aspect-auto"
                />
              ) : null}
              <ArchiveCard item={bigB} number={numberOf(bigB)} large sizes={bigSizes} className="aspect-square md:col-span-7" />
            </div>
          ) : null}

          {squareRow.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {squareRow.map((item, i) => (
                <ArchiveCard
                  key={item.src}
                  item={item}
                  number={numberOf(item)}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className={`aspect-square ${i === 0 && squareRow.length % 2 === 1 ? "col-span-2 md:col-span-1" : ""}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
