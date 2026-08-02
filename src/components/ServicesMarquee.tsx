"use client";

import Link from "next/link";
import { m } from "framer-motion";

const tags = [
  "#E-COMMERCE",
  "#STRATEGY",
  "#BRANDING",
  "#DESIGN",
  "#SOCIAL MEDIA",
  "#DIGITAL MARKETING",
  "#WEB DESIGN",
];

export default function ServicesMarquee() {
  const loop = [...tags, ...tags];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#1c1c1c] py-8">
      <div className="animate-marquee flex w-max gap-8 px-4">
        {loop.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="shrink-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[#f2f2f2] lg:text-base"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ServicesIntro() {
  return (
    <section className="bg-[#1c1c1c] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[#f2f2f2] lg:text-4xl">
            What We Do
          </h2>
        </m.div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-[#f2f2f2] lg:text-3xl">
              Branding & Strategy
              <br />
              Development
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              Our methodology is built on identifying the elements that respond
              to consumer behavior and needs — forming the foundation of an
              actionable strategy.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-[#f2f2f2] lg:text-3xl">
              Digital Marketing &
              <br />
              E-commerce Management
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white/55">
              We increase your brand visibility across digital channels, manage
              your e-commerce infrastructure, and accelerate growth through
              performance-driven campaigns.
            </p>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#f2f2f2] transition-opacity hover:opacity-60"
          >
            Get to know us
            <span>→</span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
