"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import StudioMediaHero from "@/components/StudioMediaHero";
import Process from "@/components/Process";
import WorkMediaFill from "@/components/WorkMediaFill";
import { HOME_SERVICE_ITEMS } from "@/lib/workMedia";

const EASE = [0.22, 1, 0.36, 1] as const;
const serif = "font-[family-name:var(--font-serif)]";
const display = "font-[family-name:var(--font-display)]";

const DETAIL = [
  {
    body: "Identity systems, verbal platforms and guidelines that hold under pressure.",
    deliverables: ["Strategy", "Naming", "Identity systems", "Verbal identity", "Guidelines"],
  },
  {
    body: "Product surfaces, web experiences and publish-ready interface craft.",
    deliverables: ["Websites", "UI / UX", "E-commerce", "Design systems", "Prototyping"],
  },
  {
    body: "Campaign worlds, editorial drops and social that feels authored, not filled.",
    deliverables: ["Campaigns", "Art direction", "Social", "Editorial", "Photography"],
  },
  {
    body: "Film, loops and identity motion that carry the brand in real time.",
    deliverables: ["Brand films", "Logo motion", "Loops", "3D", "Title design"],
  },
  {
    body: "Physical pieces with the same care as the screen: ink, stock, finish.",
    deliverables: ["Packaging", "Posters", "Publications", "Signage", "Merch"],
  },
] as const;

function Deliverables({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((d, i) => (
        <m.li
          key={d}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.04 }}
          className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-black/65"
        >
          {d}
        </m.li>
      ))}
    </ul>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const item = HOME_SERVICE_ITEMS[active];

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">(Capabilities)</p>
            <h2 className={`${display} mt-4 max-w-2xl text-[clamp(2.2rem,5vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.035em]`}>
              Five crafts. <span className={`${serif} font-normal italic text-violet-500`}>One language.</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-black/55">
            Every discipline shares the same den, the same people and the same standards. Pick one, or let them work together.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <ol className="border-t border-black/10 lg:col-span-7">
            {HOME_SERVICE_ITEMS.map((s, i) => {
              const on = i === active;
              const detail = DETAIL[i];
              return (
                <li key={s.src} className="border-b border-black/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-3 py-6 text-left sm:grid-cols-[4.5rem_1fr_auto] sm:py-8"
                  >
                    <span
                      className={`font-mono text-xs tracking-[0.18em] transition-colors duration-500 ${
                        on ? "text-violet-500" : "text-black/30"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`${display} text-[clamp(2.25rem,6vw,5rem)] font-bold leading-none tracking-[-0.04em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        on ? "translate-x-0 text-black" : "text-black/25 group-hover:text-black/50"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 sm:h-12 sm:w-12 ${
                        on ? "rotate-45 border-black bg-black text-white" : "border-black/15 text-black/40"
                      }`}
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {on ? (
                      <m.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[3.75rem] sm:pl-[5.625rem]">
                          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-[#111] lg:hidden">
                            <WorkMediaFill item={s} fit="cover" sizes="100vw" rate={0.42} />
                          </div>
                          <p className="max-w-lg text-base leading-relaxed text-black/60 sm:text-lg">{detail.body}</p>
                          <div className="mt-5">
                            <Deliverables items={detail.deliverables} />
                          </div>
                        </div>
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#0d0714]">
                <AnimatePresence initial={false}>
                  <m.div
                    key={item.src}
                    initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <WorkMediaFill item={item} fit="cover" sizes="40vw" rate={0.42} />
                  </m.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white">
                  <AnimatePresence mode="wait" initial={false}>
                    <m.p
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={`${serif} text-4xl italic`}
                    >
                      {item.subtitle}
                    </m.p>
                  </AnimatePresence>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-white/70">
                    {String(active + 1).padStart(2, "0")} / {String(HOME_SERVICE_ITEMS.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="group mt-5 flex items-center justify-between rounded-full bg-[#f1f1f1] py-2 pl-6 pr-2 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Start a {item.title.toLowerCase()} project
                <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesStudio() {
  return (
    <div className="bg-white">
      <StudioMediaHero
        label="Our services"
        title="Craft across every surface."
        description="From brand systems to motion, each discipline shows up as work you can feel. Pick a craft below and see how we build."
        ctaHref="/contact"
        ctaLabel="Start a project"
        imageSrc="/images/transitions/services-studio.jpg"
      />
      <Capabilities />
      <Process />
    </div>
  );
}
