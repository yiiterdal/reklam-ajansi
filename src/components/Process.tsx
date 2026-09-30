"use client";

import { m } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    number: "01",
    title: "Watch",
    kicker: "Research & discovery",
    description:
      "We map your audience, competitors and category before a single concept is written.",
  },
  {
    number: "02",
    title: "Gather",
    kicker: "Insight & positioning",
    description:
      "Consumer insight sits at the centre. We define the real problem and the position that sets you apart.",
  },
  {
    number: "03",
    title: "Shape",
    kicker: "Promise & messaging",
    description:
      "Brand promise, message architecture and the craft that makes it tangible, tailored to every audience.",
  },
  {
    number: "04",
    title: "Release",
    kicker: "Integrated campaign",
    description:
      "Key visuals, films, sites and social. One idea, carried consistently across every channel.",
  },
];

export default function Process() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-[#0d0714] px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/15 blur-[140px]"
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">(How we work)</p>
            <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              The den{" "}
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-100 bg-clip-text pr-[0.06em] font-[family-name:var(--font-serif)] font-normal italic tracking-normal text-transparent">
                method.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/55">
            Four steps, borrowed from the bear. Patient at the start, decisive at the end.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <m.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gradient-to-r from-violet-300/70 via-fuchsia-200/50 to-amber-100/40 lg:block"
          />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {phases.map((phase, i) => (
              <m.li
                key={phase.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.12 }}
                className="group relative"
              >
                <span className="relative hidden h-[15px] w-[15px] place-items-center lg:grid">
                  <span className="absolute h-full w-full rounded-full bg-violet-300/30 transition-transform duration-500 group-hover:scale-[1.8]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-violet-200" />
                </span>
                <p className="font-mono text-[11px] tracking-[0.2em] text-white/40 lg:mt-8">
                  {phase.number} · {phase.kicker}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 lg:text-5xl">
                  {phase.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60 sm:text-base">{phase.description}</p>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
