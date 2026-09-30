"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import HQImage from "@/components/HQImage";
const EASE = [0.22, 1, 0.36, 1] as const;
const serif = "font-[family-name:var(--font-serif)]";
const display = "font-[family-name:var(--font-display)]";
const accent = `${serif} bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-100 bg-clip-text pr-[0.06em] font-normal italic tracking-normal text-transparent`;

const ENTRIES = [
  {
    word: "bear",
    phonetic: "/beə/",
    kind: "noun",
    body: "Strong, patient, unhurried. Watches, gathers, and moves only when it matters.",
  },
  {
    word: "stōw",
    phonetic: "/stəʊ/",
    kind: "Old English, noun",
    body: "A place. Somewhere people gather, somewhere worth coming back to.",
  },
] as const;

const STORY =
  "Bears don't rush. They watch, they gather, they wait for the right moment, and when they finally move, everyone notices. That's how we treat ideas. We take them into the den, strip away the obvious, and only let them out when they're strong enough to be *felt.*";

const MANIFESTO: { before: string; word: string; after: string; note: string; glow: string }[] = [
  {
    before: "Quiet in the den.",
    word: "Loud",
    after: "in the world.",
    note: "Research, strategy and a little silence first. Then work that's impossible to ignore.",
    glow: "left-[-10%] top-[10%] bg-violet-600/35",
  },
  {
    before: "We don't decorate brands. We give them a",
    word: "pulse.",
    after: "",
    note: "Design isn't make-up. It's the heartbeat that makes a brand move, speak and behave.",
    glow: "right-[-10%] top-[20%] bg-fuchsia-500/30",
  },
  {
    before: "Every pixel earns its",
    word: "place.",
    after: "",
    note: "Nothing decorative, nothing by default. If it doesn't serve the idea, it goes.",
    glow: "left-[25%] bottom-[-15%] bg-indigo-500/35",
  },
  {
    before: "If it could belong to anyone, it isn't",
    word: "finished.",
    after: "",
    note: "Generic is the enemy. We keep going until the work could only ever be yours.",
    glow: "right-[5%] bottom-[-10%] bg-amber-400/20",
  },
];

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const isAccent = children.startsWith("*");
  const text = children.replace(/\*/g, "");
  return (
    <m.span style={{ opacity }} className={isAccent ? accent : undefined}>
      {text}{" "}
    </m.span>
  );
}

function ScrollStory() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = STORY.split(" ");

  if (reduce) {
    return (
      <p className={`${display} text-[clamp(1.55rem,3.3vw,3rem)] font-semibold leading-[1.18] tracking-[-0.02em]`}>
        {words.map((w, i) => (
          <span key={i} className={w.startsWith("*") ? accent : undefined}>
            {w.replace(/\*/g, "")}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p
      ref={ref}
      aria-label={STORY.replace(/\*/g, "")}
      className={`${display} text-[clamp(1.55rem,3.3vw,3rem)] font-semibold leading-[1.18] tracking-[-0.02em]`}
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function DenBear({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [1.1, 0.96]);
  return (
    <m.div
      style={{ scale }}
      className="relative aspect-square w-full [mask-image:radial-gradient(closest-side,black_58%,transparent_100%)]"
    >
      <HQImage
        src="/images/brand/den-bear.jpg"
        alt=""
        fill
        sizes="(max-width: 640px) 90vw, 800px"
        className="object-cover"
      />
    </m.div>
  );
}

function Annotation({ index, entry }: { index: string; entry: (typeof ENTRIES)[number] }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
      className="relative max-w-[19rem] border-l border-white/15 pl-5"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
        ({index}) {entry.word} <span className="text-white/25">{entry.phonetic}</span>
      </p>
      <p className={`${serif} mt-1 text-base italic text-violet-200/80`}>{entry.kind}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/65">{entry.body}</p>
    </m.div>
  );
}

function NameComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["-5%", "4%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["5%", "-4%"]);
  const giant = `${display} block text-[clamp(5.5rem,20vw,19rem)] font-bold uppercase leading-[0.8] tracking-[-0.05em]`;

  return (
    <div ref={ref} className="relative">
      <div className="relative z-10 flex items-end justify-between gap-8">
        <m.span style={{ x: leftX }} className={`${giant} relative isolate`}>
          Bear
          {/* hides behind the word; only the eyes peek out under the baseline */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-full -z-10 w-[112%] -translate-x-1/2 -translate-y-[40%]"
          >
            <DenBear progress={scrollYProgress} />
          </span>
        </m.span>
        <div className="hidden pb-4 sm:block">
          <Annotation index="01" entry={ENTRIES[0]} />
        </div>
      </div>

      <div className="relative z-10 mt-16 flex items-end justify-between gap-8 sm:mt-14 lg:mt-16">
        <div className="hidden pb-4 sm:block">
          <Annotation index="02" entry={ENTRIES[1]} />
        </div>
        <m.span
          style={{ x: rightX }}
          className={`${serif} ml-auto block self-end bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-100 bg-clip-text pb-[0.12em] pr-[0.1em] text-[clamp(7rem,25vw,24rem)] italic leading-[0.72] tracking-[-0.02em] text-transparent drop-shadow-[0_10px_40px_rgba(139,92,246,0.35)]`}
        >
          st&#333;w
        </m.span>
      </div>

      <div className="mt-12 grid gap-8 sm:hidden">
        <Annotation index="01" entry={ENTRIES[0]} />
        <Annotation index="02" entry={ENTRIES[1]} />
      </div>
    </div>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = MANIFESTO.length;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(p * total))));
  });

  return (
    <div ref={ref} className="relative mt-20 h-[400svh] lg:mt-28">
      <div className="sticky top-0 -mx-6 flex h-svh flex-col justify-between overflow-hidden px-6 pb-[max(7.5rem,15vh)] pt-[max(5rem,10vh)] sm:-mx-12 sm:px-12 lg:-mx-16 lg:px-16">
        {MANIFESTO.map((line, i) => (
          <div
            key={line.word}
            aria-hidden
            className={`pointer-events-none absolute h-[30rem] w-[30rem] rounded-full blur-[140px] transition-opacity duration-1000 ${line.glow} ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="relative flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">(Manifesto)</p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/35">
            <span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div className="relative grid flex-1 items-center">
          {MANIFESTO.map((line, i) => {
            const state = i === active ? "on" : i < active ? "past" : "next";
            return (
              <m.div
                key={line.word}
                initial={false}
                animate={state}
                variants={{
                  on: { opacity: 1, y: 0, filter: "blur(0px)" },
                  past: { opacity: 0, y: -60, filter: "blur(8px)" },
                  next: { opacity: 0, y: 60, filter: "blur(8px)" },
                }}
                transition={{ duration: 0.8, ease: EASE }}
                className={`relative col-start-1 row-start-1 ${i === active ? "" : "pointer-events-none"}`}
                aria-hidden={i !== active}
              >
                <span
                  aria-hidden
                  className={`${serif} pointer-events-none absolute -top-[0.35em] right-0 select-none text-[clamp(10rem,30vw,28rem)] italic leading-none text-white/[0.04]`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`${display} relative max-w-6xl text-[clamp(2.3rem,6.4vw,6.25rem)] font-bold leading-[0.98] tracking-[-0.035em]`}
                >
                  {line.before}{" "}
                  <span className={`${accent} text-[1.1em]`}>{line.word}</span>
                  {line.after ? ` ${line.after}` : null}
                </p>
                <p className="relative mt-8 flex max-w-xl items-start gap-4 text-base leading-relaxed text-white/60 sm:mt-10 sm:text-lg">
                  <span className="mt-[0.7em] h-px w-10 shrink-0 bg-white/30" aria-hidden />
                  {line.note}
                </p>
              </m.div>
            );
          })}
        </div>

        <div className="relative grid grid-cols-4 gap-2 sm:gap-3">
          {MANIFESTO.map((line, i) => (
            <div key={line.word}>
              <div className="h-px w-full overflow-hidden bg-white/15">
                <div
                  className={`h-full bg-gradient-to-r from-violet-300 to-fuchsia-200 transition-[width] duration-700 ${
                    i <= active ? "w-full" : "w-0"
                  }`}
                />
              </div>
              <p
                className={`mt-3 hidden truncate font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 sm:block ${
                  i === active ? "text-white/80" : "text-white/30"
                }`}
              >
                {String(i + 1).padStart(2, "0")} &middot; {line.word.replace(".", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BearstowStory() {
  return (
    <section id="who-is-bearstow" className="mt-24 px-3 sm:mt-32 sm:px-6 lg:px-8">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-clip rounded-[2rem] bg-[#0d0714] px-6 py-16 text-white sm:px-12 sm:py-24 lg:px-16 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="footer-drift-a absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-600/25 blur-[140px]" />
          <div className="footer-drift-b absolute -left-32 top-[45%] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/15 blur-[130px]" />
          <div className="footer-grain absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
        </div>

        {/* Name */}
        <div>
          <div className="flex items-center justify-between gap-6">
            <m.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45"
            >
              <span className="h-px w-8 bg-white/30" aria-hidden />
              Who is Bearstow?
            </m.p>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 sm:block">
              Est. 2024 &middot; The den
            </span>
          </div>

          <div>
            <h2 className={`${display} mt-8 max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.035em]`}>
              <span className="block overflow-hidden pb-[0.06em]">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  Every name
                </m.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                >
                  hides a <span className={accent}>story.</span>
                </m.span>
              </span>
            </h2>

          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <NameComposition />
        </div>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`${display} mt-16 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 border-t border-white/10 pt-12 text-center text-3xl font-bold tracking-tight sm:mt-24 sm:text-5xl lg:text-6xl`}
        >
          <span className="text-white/35">=</span>
          <span>Bearstow,</span>
          <span className={`${accent} text-[1.12em]`}>the bear&apos;s den.</span>
        </m.p>

        {/* Story */}
        <div className="mt-28 grid gap-8 lg:mt-40 lg:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35 lg:col-span-2 lg:pt-3">
            (The den)
          </p>
          <div className="lg:col-span-10">
            <ScrollStory />
          </div>
        </div>

        <Manifesto />

        {/* Close */}
        <div className="mt-20 flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end lg:mt-28">
          <p className={`${serif} text-[clamp(2.4rem,6vw,5.5rem)] italic leading-none text-white/90`}>
            Felt, not just seen.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 rounded-full border border-white/20 py-3 pl-6 pr-3 text-sm font-semibold transition hover:border-white hover:bg-white hover:text-[#0d0714]"
          >
            Come to the den
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0d0714] transition-transform duration-500 group-hover:rotate-45 group-hover:bg-violet-300">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
