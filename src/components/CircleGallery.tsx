"use client";

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
    <div className="bg-white text-black">
      {/* —— Hero: Dirt-style 3D orb cylinder —— */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 lg:px-12">
          <nav className="pointer-events-auto flex items-center gap-2">
            {[
              { label: "About", href: "/about" },
              { label: "Work", href: "/portfolio" },
              { label: "Services", href: "/services" },
              { label: "News", href: "/visuals" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-full bg-[#ececec]/90 px-3.5 py-2 text-sm font-medium text-black/75 backdrop-blur-sm transition hover:bg-[#e0e0e0] sm:px-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="absolute left-1/2 -translate-x-1/2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">
            bearstow
          </p>
          <Link
            href="/contact"
            className="pointer-events-auto rounded-full bg-black px-4 py-2 text-sm font-medium text-white sm:px-5 sm:py-2.5"
          >
            Contact
          </Link>
        </div>

        <DirtOrbCarousel />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white via-white/80 to-transparent pb-10 pt-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="text-sm text-black/45 sm:text-base">Welcome to the bearverse.</p>
            <p className="mt-2 max-w-md font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">
              A creative ecosystem for real world brands.
            </p>
          </div>
        </div>
      </section>

      {/* —— About line —— */}
      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40 lg:col-span-2">
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
          className="scroll-mt-24 border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              Selected works
            </p>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-black/55 underline-offset-4 transition hover:text-black hover:underline"
            >
              See All Work
            </Link>
          </div>

          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-12 md:gap-4">
            {HOME_WORK.map((item) => (
              <article
                key={item.src}
                data-ragged-media
                className={`group relative overflow-hidden rounded-2xl bg-[#f0f0f0] ${item.span ?? "md:col-span-4"} ${item.aspect}`}
              >
                <SlowWorkVideo
                  src={item.src}
                  poster={item.poster ?? workPoster(item.src)}
                  rate={0.45}
                  className={VIDEO_CLASS}
                />
                <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] p-5 sm:p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* —— Services: all five media panels visible, hover expands —— */}
        <section className="border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              Services
            </p>
            <Link
              href="/services"
              className="rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-medium text-black/70 transition hover:bg-[#e0e0e0]"
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
                  className={`group relative min-h-[220px] min-w-0 overflow-hidden rounded-2xl bg-[#f0f0f0] text-left transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-0 ${
                    i === 4 ? "col-span-2 md:col-span-1" : ""
                  }`}
                  style={{ flexGrow: active ? 3.2 : 1, flexBasis: 0 }}
                  aria-pressed={active}
                >
                  <SlowWorkVideo
                    src={item.src}
                    poster={item.poster ?? workPoster(item.src)}
                    rate={0.45}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
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
        <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              In the news
            </p>
            <Link
              href="/about"
              className="rounded-full bg-[#ececec] px-4 py-2 text-sm font-medium text-black/70"
            >
              All Articles
            </Link>
          </div>
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
            {HOME_ARTICLES.map((a, i) => (
              <m.article
                key={a.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <div
                  data-ragged-media
                  className={`relative mb-4 overflow-hidden rounded-2xl bg-[#f0f0f0] ${a.aspect}`}
                >
                  <SlowWorkVideo
                    src={a.src}
                    poster={a.poster ?? workPoster(a.src)}
                    rate={0.45}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  {a.subtitle}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight">
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
      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl"
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-black/50">
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
        className="relative h-[100dvh] w-full overflow-hidden bg-white"
      >
        <WaterRippleWordmark
          src="/images/bearstow-glass-wordmark.png"
          alt="bearstow"
          fillViewport
          className="absolute inset-0 h-full w-full"
        />
      </section>

      {/* —— Footer (dirtverse layout) —— */}
      <footer className="border-t border-black/5 px-5 pb-10 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[13px] text-black/45">©2026 Bearstow</p>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase text-black/45">Follow</p>
            <ul className="mt-3 space-y-1.5">
              {["Instagram", "Tiktok", "Pinterest"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-[13px] text-black/80 transition hover:opacity-50">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase text-black/45">Contact</p>
            <a
              href="mailto:hello@bearstow.com"
              className="mt-3 block text-[13px] text-black/80 transition hover:opacity-50"
            >
              hello@bearstow.com
            </a>
            <p className="mt-6 font-mono text-[13px] uppercase text-black/45">Legal</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <Link href="/about" className="text-[13px] text-black/80 hover:opacity-50">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[13px] text-black/80 hover:opacity-50">
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
    "w-full rounded-lg border-0 bg-[#f7f7f7] px-3 py-[11px] text-sm font-medium text-black outline-none placeholder:text-black/40 focus:ring-1 focus:ring-black/10";

  return (
    <section
      id="enquiry"
      className="scroll-mt-24 border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-20">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-black/50">
            It starts at the edge
          </p>
          <p className="mt-8 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.6vw,2.05rem)] font-bold leading-[1.3] tracking-tight text-black">
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
          <p className="font-mono text-[13px] uppercase tracking-[0.02em] text-black/50">
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
                className="w-full rounded-lg bg-[#f7f7f7] px-3 py-[11px] text-sm font-semibold text-black transition hover:bg-[#efefef]"
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
