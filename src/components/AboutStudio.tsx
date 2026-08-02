"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { m } from "framer-motion";
import IridescentVortex, { INTRO_DURATION } from "@/components/IridescentVortex";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import Approach from "@/components/Approach";
import { workPoster } from "@/lib/workMedia";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const TITLE = [
  [
    { word: "Built", delay: "0.5s" },
    { word: "for", delay: "0.6s" },
  ],
  [
    { word: "brands", delay: "0.7s" },
    { word: "that", delay: "0.8s" },
    { word: "move.", delay: "0.9s" },
  ],
] as const;

const TAGLINE = [
  { text: "Strategy, design, film, and digital —", delay: "1s" },
  { text: "one system, felt in the world.", delay: "1.075s" },
] as const;

/** Portrait / editorial — tall stills */
const PORTRAITS = [
  {
    src: "/images/works/underscores.png",
    title: "underscores",
    subtitle: "Editorial portrait",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/works/body-wave.png",
    title: "Body Wave",
    subtitle: "Music events branding",
    aspect: "aspect-[720/900]",
  },
  {
    src: "/images/works/stamp-deer.png",
    title: "Folk Mark",
    subtitle: "Archive study",
    aspect: "aspect-[651/782]",
  },
] as const;

/** Dark cinematic / graphic loops */
const CINEMATIC = [
  {
    src: "/videos/works/work-1148x720.mp4",
    title: "Wide Cut",
    subtitle: "Campaign frame",
    aspect: "aspect-[1148/720]",
    span: "md:col-span-7",
  },
  {
    src: "/videos/works/work-v0-9.mp4",
    title: "Pulse Grid",
    subtitle: "Studio loop",
    aspect: "aspect-square",
    span: "md:col-span-5",
  },
] as const;

/** Light / still-life contrast */
const STILL_LIFE = {
  src: "/images/works/wild-rendered.png",
  title: "Wild rendered",
  subtitle: "Still life study",
} as const;

/**
 * About — homepage Topology energy + artistic media by tone/format.
 */
export default function AboutStudio() {
  const [play, setPlay] = useState(false);

  const playIntro = useCallback(() => {
    setPlay(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlay(true));
    });
  }, []);

  useEffect(() => {
    playIntro();
  }, [playIntro]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => {
      document.documentElement.style.overflow = prev;
    }, INTRO_DURATION * 1000);
    return () => {
      window.clearTimeout(id);
      document.documentElement.style.overflow = prev;
    };
  }, []);

  return (
    <div className="bg-[#1c1c1c] text-[#f2f2f2]">
      {/* Topology-style hero (viewport hold, no long scrub) */}
      <section
        className={`${manrope.className} relative h-[100svh] overflow-hidden bg-[#151515] text-white`}
        data-play={play ? "true" : "false"}
      >
        <div className="absolute inset-0">
          <IridescentVortex />
        </div>

        <style>{`
          .about-topo-word {
            display: inline-block;
            opacity: 0;
            transform: translateX(120px);
          }
          [data-play="true"] .about-topo-word {
            animation: about-topo-in 1s cubic-bezier(0.2, 0, 0.1, 1) forwards;
          }
          .about-topo-line {
            display: block;
            opacity: 0;
            transform: translateX(80px);
          }
          [data-play="true"] .about-topo-line {
            animation: about-topo-in 1s cubic-bezier(0.2, 0, 0.1, 1) forwards;
          }
          .about-topo-foot {
            opacity: 0;
            transform: translateY(40px);
          }
          [data-play="true"] .about-topo-foot {
            animation: about-topo-foot 1s cubic-bezier(0.2, 0, 0.1, 1) 1s forwards;
          }
          @keyframes about-topo-in {
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes about-topo-foot {
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
          <div className="mb-10 flex flex-wrap items-end">
            <div className="w-full lg:w-1/2">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-white/45">
                About Bearstow
              </p>
              <h1 className="m-0 text-[clamp(42px,8.5vw,120px)] font-light leading-[0.92] tracking-[-1.2px] text-white">
                {TITLE.map((line, li) => (
                  <span key={li}>
                    {li > 0 ? <br /> : null}
                    {line.map((item, wi) => (
                      <span key={item.word}>
                        {wi > 0 ? " " : null}
                        <span
                          className="about-topo-word"
                          style={{ animationDelay: item.delay }}
                        >
                          {item.word}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
            <div className="mt-8 flex w-full items-end lg:mt-0 lg:ml-[6%] lg:w-[34%]">
              <p className="m-0 max-w-[480px] text-[clamp(18px,1.8vw,22px)] font-light leading-snug tracking-[0.3px] text-white/90">
                {TAGLINE.map((line) => (
                  <span
                    key={line.text}
                    className="about-topo-line"
                    style={{ animationDelay: line.delay }}
                  >
                    {line.text}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="about-topo-foot relative flex flex-wrap items-center justify-between gap-4 pt-8 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/25">
            <p className="m-0 text-sm font-light uppercase tracking-[1.4px] text-white/80">
              Bearstow ©2026
            </p>
            <a
              href="#studio"
              className="inline-flex items-center gap-1.5 text-sm font-light uppercase tracking-[1.4px] text-white no-underline"
            >
              The studio
              <svg className="h-3 w-2 stroke-white" viewBox="0 0 8 12" fill="none" aria-hidden>
                <path d="M4 1v10m0 0L1 7.812M4 11l3-3.188" strokeWidth="1" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section
        id="studio"
        className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-[#f2f2f2] sm:text-3xl lg:text-[2.1rem]">
            We are a new-generation communications agency born in the digital
            age. We use every traditional and digital method to deliver
            integrated communications that move people.
          </h2>
        </div>
      </section>

      {/* Portraits — tall editorial stills, staggered */}
      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto mb-10 max-w-[1600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
            Portrait systems
          </p>
          <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Tall frames. Quiet tension.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-12 md:gap-5">
          {PORTRAITS.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl bg-[#2a2a2a] ${
                i === 0
                  ? "md:col-span-4"
                  : i === 1
                    ? "md:col-span-4 md:mt-16"
                    : "md:col-span-4 md:mt-8"
              }`}
            >
              <div className={`relative ${item.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/65">{item.subtitle}</p>
              </div>
            </m.article>
          ))}
        </div>
      </section>

      {/* Cinematic pair — landscape + square */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto mb-10 max-w-[1600px]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
            Motion studies
          </p>
          <h2 className="mt-3 max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
            Wide against dense.
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-12 md:gap-5">
          {CINEMATIC.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-[#111] ${item.span} ${
                i === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className={`relative ${item.aspect}`}>
                <SlowWorkVideo
                  src={item.src}
                  poster={workPoster(item.src)}
                  rate={0.4}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
              </div>
            </m.article>
          ))}
        </div>
      </section>

      {/* Still-life full bleed — light graphic against dark site */}
      <section className="relative">
        <div className="relative h-[70svh] min-h-[420px] overflow-hidden">
          <Image
            src={STILL_LIFE.src}
            alt={STILL_LIFE.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-black/30" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-8 lg:px-12 lg:pb-14">
            <div className="mx-auto max-w-[1600px]">
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                {STILL_LIFE.title}
              </p>
              <p className="mt-1 text-sm text-white/70">{STILL_LIFE.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <Approach />

      <section className="border-t border-white/10 bg-[#141414] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              Next
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when you are.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/15"
            >
              Our services
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
