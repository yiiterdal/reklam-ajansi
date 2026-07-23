"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import StudioMediaHero from "@/components/StudioMediaHero";
import Approach from "@/components/Approach";
import { workPoster } from "@/lib/workMedia";

const LAYERS = [
  {
    kind: "image" as const,
    src: "/images/works/underscores.png",
    title: "Portrait systems",
    aspect: "aspect-[3/4]",
    className: "md:col-span-4 md:mt-20",
  },
  {
    kind: "video" as const,
    src: "/videos/works/work-v0-9.mp4",
    title: "Signal studies",
    aspect: "aspect-square",
    className: "md:col-span-5",
  },
  {
    kind: "image" as const,
    src: "/images/works/wild-rendered.png",
    title: "Still life craft",
    aspect: "aspect-[5/4]",
    className: "md:col-span-3 md:mt-10",
  },
];

/**
 * About — large work media + studio story.
 * Note: visuals listed here are also staged on /visuals / home;
 * pages share mood intentionally for a unified studio feel.
 */
export default function AboutStudio() {
  return (
    <div className="bg-white">
      <StudioMediaHero
        label="About Bearstow"
        title="A studio for brands that want culture to notice."
        description="Strategy, design, film, and digital — built as one system so the work feels sharp in the world, not just in the deck."
        ctaHref="/portfolio"
        ctaLabel="See the work"
        videoSrc="/videos/works/work-1148x720.mp4"
      />

      <section className="border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl lg:text-[2.1rem]">
            We are a new-generation communications agency born in the digital
            age. We use every traditional and digital method to deliver
            integrated communications that move people.
          </h2>
        </div>
      </section>

      {/* Layered media wall */}
      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto mb-10 max-w-[1600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/35">
            In the room
          </p>
          <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Craft you can feel up close.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-12 md:gap-5">
          {LAYERS.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl bg-[#ececec] ${item.className}`}
            >
              <div className={`relative ${item.aspect}`}>
                {item.kind === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <SlowWorkVideo
                    src={item.src}
                    poster={workPoster(item.src)}
                    rate={0.42}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {item.title}
                </p>
              </div>
            </m.article>
          ))}
        </div>
      </section>

      <Approach />

      <section className="border-t border-black/5 bg-[#f7f7f7] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              Next
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when you are.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-medium text-black/75 transition hover:bg-[#e0e0e0]"
            >
              Our services
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
