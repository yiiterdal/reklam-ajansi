"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { m } from "framer-motion";
import DirtOrbCarousel from "@/components/DirtOrbCarousel";
import RaggedCurveRoot from "@/components/RaggedCurveRoot";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import WaterRippleWordmark from "@/components/WaterRippleWordmark";
import {
  HOME_ARTICLES,
  HOME_SERVICE_ITEMS,
  HOME_WORK,
  workPoster,
} from "@/lib/workMedia";

/**
 * Layout inspired by https://dirtverse.co/
 * Selected works / services / news use slow-motion project videos.
 */

const VIDEO_CLASS =
  "absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]";

export default function CircleGallery() {
  const [activeService, setActiveService] = useState(2);

  return (
    <div className="bg-[#1c1c1c] text-[#f2f2f2]">
      {/* —— Hero: Dirt-style 3D orb cylinder (global Header handles nav) —— */}
      <section className="relative overflow-hidden">
        <DirtOrbCarousel />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-8 pt-16 sm:pb-10 sm:pt-20">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
            <div>
              <p className="text-sm text-white/50 sm:text-[15px]">
                Welcome to the bearverse.
              </p>
              <p className="mt-1.5 max-w-sm font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white sm:text-xl">
                A creative ecosystem for real world brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* —— About line —— */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40 lg:col-span-2">
            About
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.15] tracking-tight lg:col-span-10">
            Bearstow is a creative studio building for the deeply invested, the restless
            start-ups and the brands that want culture to move with them.
          </h2>
        </div>
      </section>

      {/* Ragged Edge CurveEffect wraps media sections */}
      <RaggedCurveRoot distance={34} strength={1}>
        {/* —— Selected works —— */}
        <section
          id="work"
          className="scroll-mt-24 border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              Selected works
            </p>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-white/55 underline-offset-4 transition hover:text-white hover:underline"
            >
              See All Work
            </Link>
          </div>

          {/* Layered editorial spread — hero pair + overlapping row */}
          {(() => {
            const [lead, side, ...rest] = HOME_WORK;
            return (
              <div className="mx-auto max-w-[1600px]">
                <div className="grid gap-3 md:grid-cols-12 md:gap-4 lg:gap-5">
                  {lead ? (
                    <m.article
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      data-ragged-media
                      className="group relative overflow-hidden rounded-2xl bg-[#2a2a2a] md:col-span-8 md:min-h-[52vh] lg:min-h-[58vh]"
                    >
                      <div className="relative aspect-video md:absolute md:inset-0 md:aspect-auto">
                        <SlowWorkVideo
                          src={lead.src}
                          poster={lead.poster ?? workPoster(lead.src)}
                          rate={0.45}
                          className={VIDEO_CLASS}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] p-5 sm:p-7 lg:p-9">
                        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                          {lead.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/75 sm:text-base">
                          {lead.subtitle}
                        </p>
                      </div>
                    </m.article>
                  ) : null}

                  {side ? (
                    <m.article
                      initial={{ opacity: 0, y: 36 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      data-ragged-media
                      className="group relative overflow-hidden rounded-2xl bg-[#2a2a2a] md:col-span-4 md:mt-16 lg:mt-24"
                    >
                      <div className={`relative ${side.aspect}`}>
                        <SlowWorkVideo
                          src={side.src}
                          poster={side.poster ?? workPoster(side.src)}
                          rate={0.45}
                          className={VIDEO_CLASS}
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] p-5 sm:p-6">
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                          {side.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/75">{side.subtitle}</p>
                      </div>
                    </m.article>
                  ) : null}
                </div>

                {rest.length > 0 ? (
                  <div className="relative mt-3 grid gap-3 sm:mt-4 md:mt-5 md:grid-cols-12 md:gap-4 lg:gap-5">
                    {rest.map((item, i) => (
                      <m.article
                        key={item.src}
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.65,
                          delay: i * 0.07,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        data-ragged-media
                        className={`group relative overflow-hidden rounded-2xl bg-[#2a2a2a] md:col-span-4 ${
                          i === 1
                            ? "md:-mt-10 md:z-[1] lg:-mt-16"
                            : i === 2
                              ? "md:mt-8 lg:mt-12"
                              : "md:mt-2"
                        }`}
                      >
                        <div className={`relative ${item.aspect}`}>
                          <SlowWorkVideo
                            src={item.src}
                            poster={item.poster ?? workPoster(item.src)}
                            rate={0.45}
                            className={VIDEO_CLASS}
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] p-5 sm:p-6">
                          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-white/75">
                            {item.subtitle}
                          </p>
                        </div>
                      </m.article>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })()}
        </section>

        {/* —— Services: all five media panels visible, hover expands —— */}
        <section className="border-t border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              Services
            </p>
            <Link
              href="/services"
              className="rounded-full bg-[#2a2a2a] px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-[#333]"
            >
              See More
            </Link>
          </div>

          <div
            className="mx-auto grid max-w-[1600px] grid-cols-2 gap-2 sm:gap-3 md:flex md:h-[min(78vh,820px)]"
            onMouseLeave={() => setActiveService(2)}
          >
            {HOME_SERVICE_ITEMS.map((item, i) => {
              const active = activeService === i;
              const s = item.title;
              return (
                <button
                  key={item.src}
                  type="button"
                  data-ragged-media
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                  className={`group relative min-h-[220px] min-w-0 overflow-hidden rounded-2xl bg-[#2a2a2a] text-left transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-0 ${
                    i === 4 ? "col-span-2 md:col-span-1" : ""
                  }`}
                  style={{ flexGrow: active ? 3.2 : 1, flexBasis: 0 }}
                  aria-pressed={active}
                >
                  {item.kind === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.subtitle ?? item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 40vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <SlowWorkVideo
                      src={item.src}
                      poster={item.poster ?? workPoster(item.src)}
                      rate={0.45}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                  <div
                    className={`pointer-events-none absolute inset-0 z-[6] transition duration-500 ${
                      active
                        ? "bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                        : "bg-black/35 md:bg-black/40"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] p-4 sm:p-6 lg:p-8">
                    {/* Mobile: always horizontal label */}
                    <p
                      className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white md:hidden ${
                        active ? "sm:text-3xl" : ""
                      }`}
                    >
                      {s}
                    </p>
                    {/* Desktop: vertical when collapsed, large horizontal when expanded */}
                    <p
                      className={`hidden font-[family-name:var(--font-display)] font-bold tracking-tight text-white transition-all duration-500 md:block ${
                        active ? "text-4xl lg:text-5xl" : "text-xl lg:text-2xl"
                      }`}
                      style={
                        active
                          ? undefined
                          : ({
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                            } as const)
                      }
                    >
                      {s}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* —— News —— */}
        <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
              In the news
            </p>
            <Link
              href="/about"
              className="rounded-full bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-white/70"
            >
              All Articles
            </Link>
          </div>
          <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-12 md:gap-5">
            {HOME_ARTICLES.map((a, i) => (
              <m.article
                key={a.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className={
                  i === 0
                    ? "md:col-span-5"
                    : i === 1
                      ? "md:col-span-4 md:mt-14"
                      : "md:col-span-3 md:mt-6"
                }
              >
                <div
                  data-ragged-media
                  className={`relative mb-4 overflow-hidden rounded-2xl bg-[#2a2a2a] ${a.aspect}`}
                >
                  <SlowWorkVideo
                    src={a.src}
                    poster={a.poster ?? workPoster(a.src)}
                    rate={0.45}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  {a.subtitle}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight sm:text-xl">
                  {a.title}
                </h3>
              </m.article>
            ))}
          </div>
        </section>
      </RaggedCurveRoot>

      {/* —— Closing: dirtverse end-of-page (Bearstow) —— */}
      <EnquiryClose />

      {/* —— Contact —— */}
      <section className="border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl"
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-white/50">
            contact
          </p>
          <a
            href="mailto:hello@bearstow.com"
            className="mt-5 block font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,4.5rem)] font-bold leading-none tracking-tight transition hover:opacity-55"
          >
            hello@bearstow.com
          </a>
          <p className="mt-6 max-w-xl text-lg font-semibold tracking-tight sm:text-xl">
            Grounded in Istanbul. Built for the world.
          </p>
        </m.div>
      </section>

      {/* —— Glass wordmark: dirtverse-scale (oversized letters, cropped sides) —— */}
      <section
        id="wordmark"
        className="relative h-[100dvh] w-full overflow-hidden bg-[#1c1c1c]"
      >
        <WaterRippleWordmark
          src="/images/bearstow-glass-wordmark.png"
          alt="bearstow"
          fillViewport
          className="absolute inset-0 h-full w-full"
        />
      </section>

      {/* —— Footer (dirtverse layout) —— */}
      <footer className="border-t border-white/10 px-5 pb-10 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[13px] text-white/45">©2026 Bearstow</p>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase text-white/45">Follow</p>
            <ul className="mt-3 space-y-1.5">
              {["Instagram", "Tiktok", "Pinterest"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-[13px] text-white/80 transition hover:opacity-50">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase text-white/45">Contact</p>
            <a
              href="mailto:hello@bearstow.com"
              className="mt-3 block text-[13px] text-white/80 transition hover:opacity-50"
            >
              hello@bearstow.com
            </a>
            <p className="mt-6 font-mono text-[13px] uppercase text-white/45">Legal</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link href="/about" className="text-[13px] text-white/80 hover:opacity-50">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-white/80 hover:opacity-50">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EnquiryClose() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  };

  const field =
    "w-full rounded-lg border-0 bg-[#2a2a2a] px-3 py-[11px] text-sm font-medium text-white outline-none placeholder:text-white/40 focus:ring-1 focus:ring-white/15";

  return (
    <section
      id="enquiry"
      className="scroll-mt-24 border-t border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-white/50">
            It starts at the edge
          </p>
          <p className="mt-8 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.6vw,2.05rem)] font-bold leading-[1.3] tracking-tight text-white">
            You&apos;re onto something, and you need work people can&apos;t ignore.
            Built like a swiss army knife, we&apos;ve spent over 30 collective years
            getting this good at what we do. If you&apos;re all in on what you&apos;re
            building, we are too.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-white/50">
            Make an enquiry
          </p>

          {sent ? (
            <p className="mt-8 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              Thanks — we&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Full name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Your e-mail</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Your e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                </label>
              </div>
              <label className="block">
                <span className="sr-only">Your message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} min-h-[120px] resize-y`}
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2a2a2a] px-3 py-[11px] text-sm font-semibold text-white transition hover:bg-[#333]"
              >
                Submit
              </button>
            </form>
          )}
        </m.div>
      </div>
    </section>
  );
}
