"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import type { WorkMedia } from "@/lib/workMedia";
import { workPoster } from "@/lib/workMedia";

type Props = {
  items: WorkMedia[];
  columns?: "bento" | "masonry";
  rate?: number;
};

const mediaClass =
  "absolute inset-0 h-full w-full scale-[1.01] object-cover transition duration-700 group-hover:scale-[1.05]";

export default function WorkVideoGrid({
  items,
  columns = "bento",
  rate = 0.45,
}: Props) {
  return (
    <div
      className={
        columns === "bento"
          ? "grid gap-3 md:grid-cols-12 md:gap-4"
          : "columns-1 gap-3 sm:columns-2 lg:columns-3"
      }
    >
      {items.map((item, i) => (
        <m.article
          key={`${item.src}-${item.title}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
          className={
            columns === "bento"
              ? `group relative overflow-hidden rounded-2xl bg-[#e8e8e8] ${item.span ?? "md:col-span-4"} ${item.aspect}`
              : `group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8e8e8] ${item.aspect}`
          }
        >
          {item.kind === "image" ? (
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={mediaClass}
            />
          ) : (
            <SlowWorkVideo
              src={item.src}
              poster={item.poster ?? workPoster(item.src)}
              rate={rate}
              className={mediaClass}
            />
          )}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white sm:text-xl">
              {item.title}
            </h3>
            {item.subtitle ? (
              <p className="mt-1 text-sm text-white/75">{item.subtitle}</p>
            ) : null}
          </div>
        </m.article>
      ))}
    </div>
  );
}

export function PageMediaHero({
  label,
  title,
  description,
  ctaHref,
  ctaLabel,
  videoSrc,
  poster,
}: {
  label: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  videoSrc?: string;
  poster?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-black/5">
      {videoSrc ? (
        <div className="absolute inset-0">
          <SlowWorkVideo
            src={videoSrc}
            poster={poster ?? workPoster(videoSrc)}
            rate={0.4}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        </div>
      ) : null}
      <div className="relative px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
            {label}
          </p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/55 sm:text-lg">
            {description}
          </p>
          {ctaHref && ctaLabel ? (
            <Link
              href={ctaHref}
              className="mt-8 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
