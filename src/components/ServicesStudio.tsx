"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import StudioMediaHero from "@/components/StudioMediaHero";
import Process from "@/components/Process";
import { HOME_SERVICE_ITEMS, workPoster } from "@/lib/workMedia";

const DETAIL = [
  {
    title: "Brand",
    body: "Identity systems, verbal platforms, and guidelines that hold under pressure.",
  },
  {
    title: "Digital",
    body: "Product surfaces, web experiences, and publish-ready interface craft.",
  },
  {
    title: "Content",
    body: "Campaign worlds, editorial drops, and social that feels authored — not filled.",
  },
  {
    title: "Motion",
    body: "Film, loops, and identity motion that carry the brand in real time.",
  },
  {
    title: "Print",
    body: "Physical pieces with the same care as the screen — ink, stock, finish.",
  },
] as const;

export default function ServicesStudio() {
  return (
    <div className="bg-white">
      <StudioMediaHero
        label="Our services"
        title="Craft across every surface."
        description="From brand systems to motion — each discipline shows up as work you can feel. Hover the panels, then dig into how we build."
        ctaHref="/portfolio"
        ctaLabel="See the work"
        videoSrc="/videos/works/work-v0-6.mp4"
      />

      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto mb-10 max-w-[1600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
            Capabilities
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Five crafts. One studio language.
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICE_ITEMS.map((item, i) => {
            const detail = DETAIL[i];
            return (
              <m.article
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group relative min-h-[340px] overflow-hidden rounded-2xl bg-[#111] sm:min-h-[400px] ${
                  i === 0 ? "md:col-span-2 lg:col-span-2 lg:min-h-[480px]" : ""
                }`}
              >
                {item.kind === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <SlowWorkVideo
                    src={item.src}
                    poster={item.poster ?? workPoster(item.src)}
                    rate={0.42}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
                    {item.title}
                  </p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                    {detail?.body}
                  </p>
                </div>
              </m.article>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-[1600px]">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
          >
            Talk to us
          </Link>
        </div>
      </section>

      <Process />
    </div>
  );
}
