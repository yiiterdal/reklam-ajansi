"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { images } from "@/lib/images";
import RevealText from "@/components/RevealText";

const collage = [
  { src: images.decor.studio, className: "top-0 right-0 z-10 w-[72%] aspect-[4/5]" },
  { src: images.decor.team, className: "bottom-0 left-0 z-20 w-[55%] aspect-square" },
  { src: images.decor.campaign, className: "bottom-8 right-8 z-30 w-[38%] aspect-[3/4] hidden sm:block" },
];

export default function HomeIntro() {
  return (
    <section className="overflow-hidden border-t border-cream-dark bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <m.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Independent creative agency
          </p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-snug text-ink lg:text-5xl">
            <RevealText as="span" text="From idea to reality" className="block" />
            <RevealText as="span" text="in the digital world" className="block italic" delay={0.1} />
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted lg:text-lg">
            Far from clichés — clear, engaging, and built to perform. Across 500+
            projects, we&apos;ve helped brands grow through e-commerce, social,
            web, and video — with one consistent visual language.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted lg:text-lg">
            Our success comes from talent and creativity, but also from the way
            we work — with integrity, respect, and a genuine commitment to our
            clients and their audiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
            >
              About us
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/visuals"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-ink"
            >
              Visual library
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none lg:pl-6"
        >
          {collage.map((item, i) => (
            <m.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className={`absolute overflow-hidden border border-cream-dark shadow-lg shadow-ink/10 ${item.className}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
