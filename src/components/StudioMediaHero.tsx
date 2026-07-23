"use client";

import Image from "next/image";
import Link from "next/link";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import { workPoster } from "@/lib/workMedia";

type Props = {
  label: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** Full-bleed video (preferred for work energy) */
  videoSrc?: string;
  /** Full-bleed still */
  imageSrc?: string;
  poster?: string;
  tone?: "dark" | "light";
};

/**
 * Large editorial page hero — media first, type on top.
 */
export default function StudioMediaHero({
  label,
  title,
  description,
  ctaHref,
  ctaLabel,
  videoSrc,
  imageSrc,
  poster,
  tone = "dark",
}: Props) {
  const dark = tone === "dark";

  return (
    <section
      className={`relative min-h-[88svh] overflow-hidden ${
        dark ? "bg-[#0e0e0e] text-white" : "bg-[#f3f3f3] text-black"
      }`}
    >
      {videoSrc ? (
        <div className="absolute inset-0">
          <SlowWorkVideo
            src={videoSrc}
            poster={poster ?? workPoster(videoSrc)}
            rate={0.4}
            className="h-full w-full object-cover"
          />
        </div>
      ) : imageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-gradient-to-r from-black/80 via-black/45 to-black/20"
            : "bg-gradient-to-r from-white via-white/88 to-white/40"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-gradient-to-t from-black/75 via-transparent to-black/30"
            : "bg-gradient-to-t from-white via-transparent to-white/50"
        }`}
      />

      <div className="relative mx-auto flex min-h-[88svh] max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-white/50" : "text-black/40"
          }`}
        >
          {label}
        </p>
        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-tight">
          {title}
        </h1>
        <p
          className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/70" : "text-black/55"
          }`}
        >
          {description}
        </p>
        {ctaHref && ctaLabel ? (
          <Link
            href={ctaHref}
            className={`mt-9 inline-flex w-fit rounded-full px-5 py-2.5 text-sm font-medium transition ${
              dark
                ? "bg-white text-black hover:opacity-90"
                : "bg-black text-white hover:opacity-80"
            }`}
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
