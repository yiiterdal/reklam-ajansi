"use client";

import Link from "next/link";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import StudioMediaHero from "@/components/StudioMediaHero";
import BrandsSection from "@/components/BrandsSection";
import { workPoster } from "@/lib/workMedia";

const MOMENTS = [
  {
    src: "/videos/works/work-v0-1.mp4",
    title: "Fauna",
    subtitle: "Editorial systems",
  },
  {
    src: "/videos/works/work-tatra-v0-1.mp4",
    title: "Knicks 2026",
    subtitle: "Campaign worlds",
  },
  {
    src: "/videos/works/work-v0-2.mp4",
    title: "Year of the Horse",
    subtitle: "Cultural cuts",
  },
] as const;

export default function BrandsStudio() {
  return (
    <div className="bg-white">
      <StudioMediaHero
        label="Our brands"
        title="Partners we build with."
        description="Color, motion, and story — for the deeply invested, the restless start-ups, and the brands that want culture to move with them."
        ctaHref="/contact"
        ctaLabel="Become a partner"
        videoSrc="/videos/works/work-1080-1.mp4"
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto mb-10 max-w-[1600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
            Recent energy
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Work that carries the relationship.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-3">
          {MOMENTS.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative min-h-[360px] overflow-hidden rounded-2xl bg-[#111] ${
                i === 1 ? "md:mt-12" : i === 2 ? "md:mt-6" : ""
              }`}
            >
              <SlowWorkVideo
                src={item.src}
                poster={workPoster(item.src)}
                rate={0.42}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
              </div>
            </m.article>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[1600px]">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-black/55 underline-offset-4 hover:text-black hover:underline"
          >
            See all work
          </Link>
        </div>
      </section>

      <BrandsSection showIntro={false} showMarquee />
    </div>
  );
}
