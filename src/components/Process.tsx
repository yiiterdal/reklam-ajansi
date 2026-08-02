"use client";

import { m } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Research & Discovery",
    description:
      "We map your audience, competitors, and category dynamics — building a clear picture before a single concept is written.",
  },
  {
    number: "02",
    title: "Insight & Positioning",
    description:
      "Consumer insight sits at the center. We define the communication problem, the need, and the positioning that sets your brand apart.",
  },
  {
    number: "03",
    title: "Brand Promise & Messaging",
    description:
      "We articulate your brand promise, USP, and message architecture — tailored to each audience segment.",
  },
  {
    number: "04",
    title: "Integrated Campaign",
    description:
      "From key visual and TVC scripts to landing pages and social content — we adapt the idea consistently across ATL, BTL, and digital.",
  },
];

export default function Process() {
  return (
    <section className="border-t border-gray-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            How we work
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:text-4xl">
            From insight to integrated campaign
          </h2>
        </m.div>

        <div className="mt-14 space-y-px bg-gray-200 lg:mt-16">
          {phases.map((phase, i) => (
            <m.article
              key={phase.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid gap-6 bg-white p-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12 lg:p-10"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-gray-300">
                {phase.number}
              </span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black lg:text-2xl">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 lg:text-base">
                  {phase.description}
                </p>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
