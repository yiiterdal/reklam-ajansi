"use client";

import HQImage from "@/components/HQImage";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { m } from "framer-motion";
import DirtOrbCarousel from "@/components/DirtOrbCarousel";
import RaggedCurveRoot from "@/components/RaggedCurveRoot";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import WorkMediaFill from "@/components/WorkMediaFill";
import WaterRippleWordmark from "@/components/WaterRippleWordmark";
import {
  HOME_ARTICLES,
  HOME_SERVICE_ITEMS,
  HOME_WORK,
  workPoster,
} from "@/lib/workMedia";
import { NEWS_POSTS } from "@/lib/news";

/**
 * Layout inspired by https://dirtverse.co/
 * Selected works / services / news use slow-motion project videos.
 */

export default function CircleGallery() {
  const [activeService, setActiveService] = useState(2);

  return (
    <div className="bg-white text-black">
      {/* —— Hero: Dirt-style 3D orb cylinder —— */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 pt-[max(1rem,env(safe-area-inset-top,0px))] sm:px-8 sm:pt-6 lg:px-12">
          <nav className="pointer-events-auto flex max-w-[70%] items-center gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-none sm:gap-2 [&::-webkit-scrollbar]:hidden">
            {[
              { label: "About", href: "/about", mobile: true },
              { label: "Work", href: "/", mobile: true },
              { label: "Services", href: "/services", mobile: false },
              { label: "News", href: "/news", mobile: false },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`shrink-0 rounded-full bg-[#ececec]/90 px-2.5 py-1.5 text-xs font-medium text-black/75 backdrop-blur-sm transition hover:bg-[#e0e0e0] sm:px-4 sm:py-2 sm:text-sm ${
                  l.mobile ? "" : "hidden sm:inline-flex"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:block sm:text-2xl">
            bearstow
          </p>
          <Link
            href="/contact"
            className="pointer-events-auto shrink-0 rounded-full bg-black px-3.5 py-1.5 text-xs font-medium text-white sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Contact
          </Link>
        </div>

        <DirtOrbCarousel />

        {/* dirtverse-style: light fade only, copy sits over the ring */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-12 sm:pb-10 sm:pt-20">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-5 sm:px-8 lg:px-12">
            <div>
              <p className="text-sm text-black/50 sm:text-[15px]">
                Welcome to the bearverse.
              </p>
              <p className="mt-1.5 max-w-sm font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-black sm:text-xl">
                A creative ecosystem for real world brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* —— Who we are —— */}
      <WhoWeAre />

      {/* Ragged Edge CurveEffect wraps media sections */}
      <RaggedCurveRoot distance={34} strength={1}>
        {/* —— Selected works —— */}
        <section
          id="work"
          className="scroll-mt-24 border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto mb-8 flex max-w-[1600px] items-end justify-between gap-4">
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

          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5">
            {HOME_WORK.map((item, i) => (
              <m.article
                key={item.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                data-ragged-media
                className="group relative overflow-hidden rounded-2xl bg-[#f0f0f0]"
              >
                <div className={`relative bg-[#ebe8e2] ${item.aspect}`}>
                  <WorkMediaFill
                    item={item}
                    fit="cover"
                    priority={i < 3}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] p-4 sm:p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/75 sm:text-sm">{item.subtitle}</p>
                </div>
              </m.article>
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
                  {item.kind === "image" ? (
                    <HQImage
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
        <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto mb-10 flex max-w-[1600px] items-end justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              In the news
            </p>
            <Link
              href="/news"
              className="rounded-full bg-[#ececec] px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-[#e0e0e0]"
            >
              All Articles
            </Link>
          </div>
          <div className="mx-auto grid max-w-[1600px] gap-8 md:grid-cols-3 md:gap-5">
            {HOME_ARTICLES.map((a, i) => (
              <m.article
                key={a.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <Link
                  href={`/news/${NEWS_POSTS.find((p) => p.media.src === a.src)?.slug ?? ""}`}
                  className="group block"
                >
                  <div
                    data-ragged-media
                    className={`relative mb-4 overflow-hidden rounded-2xl bg-[#f0f0f0] ${a.aspect}`}
                  >
                    <SlowWorkVideo
                      src={a.src}
                      poster={a.poster ?? workPoster(a.src)}
                      rate={0.45}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                    {a.subtitle}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight sm:text-xl">
                    {a.title}
                  </h3>
                </Link>
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
            Small studio. Built for brands that want to be felt.
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
    </div>
  );
}

const WHO_PILLARS = [
  {
    n: "01",
    title: "Who we are",
    body: "A small, senior team of strategists, designers, filmmakers and developers. No layers, no hand-offs: the people you meet are the people who make the work.",
  },
  {
    n: "02",
    title: "How we work",
    body: "Strategy, identity, digital, content and motion under one roof. One idea carried end to end, so the brand feels the same on a billboard as it does in a feed.",
  },
  {
    n: "03",
    title: "Why we exist",
    body: "Most brand work is forgettable. We started Bearstow to make things people actually notice, remember and want to share.",
  },
];

function WhoWeAre() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative overflow-hidden border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-violet-200/40 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/40 lg:col-span-2 lg:pt-4">
            <span className="h-px w-8 bg-black/25" />
            Who we are
          </p>
          <m.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] lg:col-span-10"
          >
            A new-generation communications agency for brands that want to be{" "}
            <span className="font-[family-name:var(--font-serif)] font-normal italic tracking-normal text-violet-600">
              felt
            </span>
            , not just seen.
          </m.h2>
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-3 lg:pl-[16.66%]"
        >
          <p className="text-lg text-black/60 sm:text-xl">
            <span className="font-[family-name:var(--font-display)] font-bold text-black">bear</span>
            <span className="mx-2 text-black/30">+</span>
            <span className="font-[family-name:var(--font-display)] font-bold text-black">stōw</span>
            <span className="ml-2 font-mono text-xs text-black/40">(Old English, &ldquo;a place&rdquo;)</span>
            <span className="mx-2 text-black/30">=</span>
            <span className="font-[family-name:var(--font-serif)] text-[1.15em] italic text-violet-600">the bear&apos;s den.</span>{" "}
            Where ideas are raised until they&apos;re ready.
          </p>
          <Link
            href="/about#who-is-bearstow"
            className="text-sm font-semibold text-black/50 underline-offset-4 transition hover:text-black hover:underline"
          >
            Read our story &rarr;
          </Link>
        </m.div>

        <div className="mt-16 grid gap-10 border-t border-black/10 pt-10 md:grid-cols-3 md:gap-8 lg:mt-24 lg:pl-[16.66%]">
          {WHO_PILLARS.map((p, i) => (
            <m.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
            >
              <p className="font-mono text-[11px] text-black/35">({p.n})</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-black/60">{p.body}</p>
            </m.div>
          ))}
        </div>

        <div className="mt-14 flex justify-end lg:mt-16">
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition hover:border-black hover:bg-black hover:text-white"
          >
            More about us
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
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
            Let&apos;s make something
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
