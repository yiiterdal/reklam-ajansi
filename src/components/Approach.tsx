"use client";

import { m } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Strategy",
    description:
      "We uncover each brand's unique story and develop communication strategies that build genuine connections with your audience.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "From visual identity to digital experience, we build a consistent, memorable, and distinctive brand world.",
  },
  {
    number: "03",
    title: "Performance",
    description:
      "We pair creativity with measurable outcomes — optimizing campaigns with data-driven insight.",
  },
];

export default function Approach() {
  return (
    <section className="border-t border-white/10 bg-[#1c1c1c] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-px bg-white/10 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <m.article
              key={pillar.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#262626] p-8 lg:p-10"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white/25">
                {pillar.number}
              </span>
              <h3 className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold text-[#f2f2f2] lg:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 lg:text-base">
                {pillar.description}
              </p>
            </m.article>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
        >
          <Link
            href="/brands"
            className="text-sm font-semibold uppercase tracking-wider text-[#f2f2f2] hover:opacity-60"
          >
            Our brands →
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold uppercase tracking-wider text-white/55 hover:text-[#f2f2f2]"
          >
            Let&apos;s talk about your project →
          </Link>
        </m.div>
      </div>
    </section>
  );
}
