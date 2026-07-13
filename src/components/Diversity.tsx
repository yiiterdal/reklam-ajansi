"use client";

import Link from "next/link";
import { m } from "framer-motion";

const principles = [
  {
    title: "Diversity fuels creativity",
    description:
      "Different perspectives produce the strongest ideas. We consciously support diversity across our team and bring fresh viewpoints to every project.",
  },
  {
    title: "Trust through communication",
    description:
      "Our reputation depends on the trust clients place in us. We represent brands faithfully, protect confidentiality, and always strive to do what is right.",
  },
  {
    title: "Community & environment",
    description:
      "We look beyond the daily brief — contributing to communities we care about and working smart to reduce our environmental footprint.",
  },
];

export default function Diversity() {
  return (
    <section className="border-t border-gray-200 bg-black py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Our values
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold lg:text-5xl">
            Built on integrity,
            <br />
            strengthened by diversity
          </h2>
        </m.div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-10">
          {principles.map((item, i) => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-white/15 pt-8"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold lg:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 lg:text-base">
                {item.description}
              </p>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <Link
            href="/contact"
            className="text-sm font-semibold uppercase tracking-wider text-white hover:opacity-70"
          >
            Work with us →
          </Link>
        </m.div>
      </div>
    </section>
  );
}
