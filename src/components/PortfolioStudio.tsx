"use client";

import Link from "next/link";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import StudioMediaHero from "@/components/StudioMediaHero";
import type { WorkMedia } from "@/lib/workMedia";
import { workPoster } from "@/lib/workMedia";

type Props = {
  items: WorkMedia[];
};

/**
 * Work page — hero lead + staggered layered archive (not a flat dump).
 */
export default function PortfolioStudio({ items }: Props) {
  const [lead, second, ...rest] = items;

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
        <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
              Studio archive
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
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

        {second ? (
          <m.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto mb-5 max-w-[1600px] overflow-hidden rounded-2xl bg-[#ececec]"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <SlowWorkVideo
                src={second.src}
                poster={second.poster ?? workPoster(second.src)}
                rate={0.42}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  {second.title}
                </h3>
                {second.subtitle ? (
                  <p className="mt-1 text-sm text-white/75">{second.subtitle}</p>
                ) : null}
              </div>
            </div>
          </m.article>
        ) : null}

        <div className="mx-auto grid max-w-[1600px] gap-3 md:grid-cols-12 md:gap-4">
          {rest.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
              className={`group relative overflow-hidden rounded-2xl bg-[#ececec] ${
                item.span ?? "md:col-span-4"
              } ${item.aspect} ${
                i % 5 === 1
                  ? "md:mt-8"
                  : i % 5 === 3
                    ? "md:-mt-6 md:z-[1]"
                    : ""
              }`}
            >
              <SlowWorkVideo
                src={item.src}
                poster={item.poster ?? workPoster(item.src)}
                rate={0.45}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
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
      </section>
    </div>
  );
}
