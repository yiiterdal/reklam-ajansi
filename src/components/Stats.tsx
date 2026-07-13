"use client";

import { m } from "framer-motion";

const highlights = [
  { value: "500+", label: "digital projects and campaigns" },
  { value: "20+", label: "national and international awards" },
  { value: "15+", label: "industries of expertise" },
  { value: "Integrated", label: "ATL, BTL, and digital under one team" },
];

export default function Stats() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-[0.45fr_1fr] lg:gap-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              By the numbers
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:text-4xl">
              Results-driven at our core
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">
              We partner with national and international brands — delivering work
              that earns attention and changes behavior on every project.
            </p>
          </m.div>

          <div className="grid gap-10 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <m.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-t border-gray-200 pt-8"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-black lg:text-5xl">
                  {item.value}
                </p>
                <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-gray-600">
                  {item.label}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
