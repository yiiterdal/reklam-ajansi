"use client";

import { m } from "framer-motion";
import RevealText from "@/components/RevealText";

const awards = [
  "Cannes Lions",
  "Eurobest",
  "Crystal Apple",
  "Mixx Awards",
  "Felis",
  "Creative Circle",
];

export default function AwardsProof() {
  const loop = [...awards, ...awards, ...awards];

  return (
    <section className="overflow-hidden border-b border-gray-200 bg-ink py-16 text-cream lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="relative flex h-28 w-28 items-center justify-center lg:h-36 lg:w-36">
              <m.div
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-300 via-violet-500 to-fuchsia-600 opacity-95 shadow-[0_0_60px_rgba(139,92,246,0.5)]"
              />
              <svg viewBox="0 0 64 64" className="relative h-16 w-16 lg:h-20 lg:w-20" aria-hidden>
                <path
                  d="M32 6 L38 22 L54 22 L42 32 L46 48 L32 38 L18 48 L22 32 L10 22 L26 22 Z"
                  fill="#1a0f24"
                />
              </svg>
            </div>
            <p className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold text-violet-300 lg:text-6xl">
              20+
            </p>
            <RevealText
              as="p"
              text="International creative awards"
              className="mt-2 max-w-xs text-sm uppercase tracking-[0.2em] text-cream/60"
            />
          </m.div>

          <div>
            <RevealText
              as="h2"
              text="Work that wins attention — and juries."
              className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug lg:text-4xl"
            />
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/70 lg:text-base">
              From Cannes to local industry shows, our campaigns are built on
              insight-first thinking and craft that performs in the room and in
              market.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-t border-cream/10 pt-10 lg:mt-16">
        <div className="animate-marquee flex w-max items-center gap-12 lg:gap-20">
          {loop.map((award, i) => (
            <span
              key={`${award}-${i}`}
              className="flex shrink-0 items-center gap-12 lg:gap-20"
            >
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-[0.25em] text-cream/80 lg:text-xl">
                {award}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
