"use client";

import HQImage from "@/components/HQImage";
import Link from "next/link";
import { m } from "framer-motion";
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

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
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
        <m.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <SlowWorkVideo
            src={videoSrc}
            poster={poster ?? workPoster(videoSrc)}
            rate={0.4}
            className="h-full w-full object-cover"
          />
        </m.div>
      ) : imageSrc ? (
        <m.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <HQImage
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </m.div>
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

      <m.div
        initial="hidden"
        animate="shown"
        variants={{ shown: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
        className="relative mx-auto flex min-h-[88svh] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20"
      >
        <m.p
          variants={rise}
          className={`text-xs font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-white/50" : "text-black/40"
          }`}
        >
          {label}
        </m.p>
        <h1 className="mt-5 max-w-4xl overflow-hidden pb-[0.06em] font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-tight">
          <m.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%", transition: { duration: 1, ease: EASE } } }}
          >
            {title}
          </m.span>
        </h1>
        <m.p
          variants={rise}
          className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/70" : "text-black/55"
          }`}
        >
          {description}
        </m.p>
        {ctaHref && ctaLabel ? (
          <m.div variants={rise}>
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
          </m.div>
        ) : null}
      </m.div>
    </section>
  );
}