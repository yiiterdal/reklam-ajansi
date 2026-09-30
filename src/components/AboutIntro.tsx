"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import HQImage from "@/components/HQImage";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  {
    title: "Brand",
    body: "We find the one thing only you can say, then build the name, look and voice around it. Identity systems that hold their shape as the brand grows.",
    items: ["Brand strategy", "Naming", "Visual identity", "Tone of voice", "Guidelines"],
    image: "/images/works-posters/work-540x540.jpg",
  },
  {
    title: "Digital",
    body: "Websites and product surfaces designed and built in-house, so what you approve is exactly what goes live. Fast, clear and pleasant to use.",
    items: ["Websites", "E-commerce", "UI / UX design", "Landing pages", "Development"],
    image: "/images/works-posters/work-v0-6.jpg",
  },
  {
    title: "Content",
    body: "Campaign worlds and social content that feel authored, not filled. One idea, adapted for every channel your audience actually uses.",
    items: ["Campaign concepts", "Social media", "Art direction", "Photography", "Copywriting"],
    image: "/images/works/galaxy-traveler.png",
  },
  {
    title: "Motion",
    body: "Film, 3D and animation that carry the brand in real time, from a two-second logo sting to a full launch film.",
    items: ["Brand films", "3D & CGI", "Logo animation", "Social video", "Motion systems"],
    image: "/images/works-posters/work-1280x720.jpg",
  },
  {
    title: "Print",
    body: "Packaging, posters and physical pieces made with the same care as the screen: the right paper, the right ink, the right finish.",
    items: ["Packaging", "Posters", "Editorial", "Menus & collateral", "Signage"],
    image: "/images/works-posters/work-1082x720.jpg",
  },
] as const;

const STORY = [
  {
    step: "The start",
    body: "Bearstow began with a simple frustration: too much brand work looked the same. Safe logos, stock photos, campaigns nobody remembered a week later. We wanted to make things people would actually stop for.",
  },
  {
    step: "The studio",
    body: "So we built a studio where strategists, designers, animators and developers sit at the same table. No long chains of hand-offs, just one team that thinks and makes together.",
  },
  {
    step: "Today",
    body: "Today we work with startups finding their voice and established brands ready for a new chapter. Different sizes, same goal: work that is clear, bold and made to last.",
  },
] as const;

const PRINCIPLES = [
  {
    title: "Insight first",
    body: "Before we design anything, we find the real problem: the audience, the category and the one thing only you can say.",
    image: "/images/about-extras/shot-collage-eye.jpg",
  },
  {
    title: "One idea, every surface",
    body: "A strong idea should work on a billboard, a phone screen and a box. We build systems, not one-offs.",
    image: "/images/about-extras/shot-glass-rings.jpg",
  },
  {
    title: "Made by the people you meet",
    body: "The team that pitches the work is the team that makes it. No hand-offs, no diluted ideas.",
    image: "/images/about-extras/shot-face-track.jpg",
  },
  {
    title: "Built to last",
    body: "Trends fade. We aim for work that still feels right years after launch.",
    image: "/images/about-extras/shot-mountain-star.jpg",
  },
] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-white/45" : "text-black/40"
      }`}
    >
      <span className={`h-px w-8 ${dark ? "bg-white/30" : "bg-black/25"}`} aria-hidden />
      {children}
    </p>
  );
}

function MaskWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <m.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.08 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </m.span>
        </span>
      ))}
    </h1>
  );
}

function ScaleVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 20]);

  return (
    <div ref={ref} className="px-3 sm:px-6 lg:px-8">
      <m.div
        style={{ scale, borderRadius: radius }}
        className="relative mx-auto aspect-[4/5] w-full max-w-[1600px] overflow-hidden bg-black sm:aspect-[21/9]"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/works/work-0.mp4"
          poster="/images/works-posters/work-0.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <p className="absolute bottom-5 left-5 right-5 max-w-xl font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white sm:bottom-8 sm:left-8 sm:text-3xl">
          Strategy, design and motion under one roof.
        </p>
      </m.div>
    </div>
  );
}

function ServicesList() {
  return (
    <div className="relative mt-12 border-t border-black/10">
      {SERVICES.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.04}>
          <div
            className="group grid gap-3 border-b border-black/10 py-8 transition-colors duration-300 sm:grid-cols-[5rem_16rem_1fr] sm:items-baseline sm:gap-6 sm:py-10 lg:hover:bg-black/[0.025]"
          >
            <span className="font-mono text-sm text-black/35">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight transition-transform duration-500 ease-out sm:text-4xl lg:group-hover:translate-x-3">
              {s.title}
            </h3>
            <div className="max-w-2xl">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-black/5 sm:hidden">
                <HQImage src={s.image} alt={s.title} fill sizes="92vw" className="object-cover" />
              </div>
              <p className="text-base leading-relaxed text-black/65 sm:text-lg">{s.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[13px] text-black/60 transition-colors group-hover:border-black/20"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function AboutIntro() {
  return (
    <div className="relative z-[1] bg-[#f5f3f0] pb-[4vh] text-[#0c0c0c]">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12">
        <Reveal>
          <Eyebrow>About Bearstow</Eyebrow>
        </Reveal>
        <MaskWords
          text="A new-generation communications agency."
          className="mt-6 max-w-6xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,7.4vw,6.6rem)] font-bold leading-[0.95] tracking-[-0.035em]"
        />
        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[1fr_1fr_auto] lg:items-end lg:gap-14">
          <Reveal delay={0.35}>
            <p className="text-lg leading-relaxed text-black/75 sm:text-xl">
              Bearstow is an independent studio working where strategy, design and
              motion meet. We help brands find what makes them different, then turn
              it into identities, campaigns and digital experiences people actually
              remember.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="text-lg leading-relaxed text-black/75 sm:text-xl">
              We keep the team small and the standards high. From the first insight
              to the last frame of a film, every project is shaped by the people who
              make the work, so the idea stays sharp all the way to launch.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <Link
              href="/contact"
              className="group inline-flex h-28 w-28 items-center justify-center rounded-full bg-[#0c0c0c] text-center text-sm font-medium leading-tight text-white transition-transform duration-500 hover:scale-105"
            >
              <span>
                Work
                <br />
                with us
                <span className="mt-1 block transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <ScaleVideo />

      {/* Story */}
      <section className="mx-auto mt-24 grid max-w-[1400px] gap-12 px-5 sm:mt-28 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              We started because we were bored of{" "}
              <span className="text-transparent [-webkit-text-stroke:1.5px_#0c0c0c]">forgettable</span>{" "}
              work.
            </h2>
          </Reveal>
        </div>
        <div className="space-y-4">
          {STORY.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <article className="rounded-3xl border border-black/[0.07] bg-white/70 p-7 shadow-[0_1px_0_rgba(0,0,0,0.03)] sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                    {s.step}
                  </p>
                  <span className="font-[family-name:var(--font-display)] text-6xl font-bold leading-none text-black/[0.07] sm:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-black/75 sm:text-xl">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto mt-28 max-w-[1400px] px-5 sm:mt-36 sm:px-8 lg:px-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-6xl">
              Five crafts.
              <br />
              One studio language.
            </h2>
          </div>
          <Link
            href="/services"
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            All services →
          </Link>
        </Reveal>
        <ServicesList />
      </section>

      {/* Principles */}
      <section className="mt-28 px-3 sm:mt-36 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-[#0c0c0c] px-6 py-16 text-white sm:px-12 sm:py-24 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-[140px]"
          />

          <Reveal className="relative">
            <Eyebrow dark>How we work</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-6xl">
              Clear thinking,
              <br />
              <span className="text-white/45">careful making.</span>
            </h2>
          </Reveal>
          <div className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-white/25">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <HQImage
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 22vw"
                      className="object-cover saturate-[0.35] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-semibold text-black">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/65">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-[1400px] px-5 sm:mt-36 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow>Next step</Eyebrow>
          <Link href="/contact" className="group mt-6 block">
            <span className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.035em]">
              Have a brand
              <br />
              to build?{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">
                →
              </span>
            </span>
          </Link>
          <a
            href="mailto:hello@bearstow.com"
            className="mt-8 inline-block text-lg text-black/60 underline-offset-4 transition hover:text-black hover:underline"
          >
            hello@bearstow.com
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-24">
            <Eyebrow>Selected frames</Eyebrow>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
