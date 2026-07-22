"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useMotionValue, useSpring } from "framer-motion";

/** Real orb clips cut from the Dirt reference recording — circular + looping motion */
const ORBS = [
  { video: "/images/dirtverse/orb-v3.mp4", poster: "/images/dirtverse/orb-v3.jpg" },
  { video: "/images/dirtverse/orb-v6.mp4", poster: "/images/dirtverse/orb-v6.jpg" },
  { video: "/images/dirtverse/orb-v5.mp4", poster: "/images/dirtverse/orb-v5.jpg" },
  { video: "/images/dirtverse/orb-v1.mp4", poster: "/images/dirtverse/orb-v1.jpg" },
  { video: "/images/dirtverse/orb-v4.mp4", poster: "/images/dirtverse/orb-v4.jpg" },
  { video: "/images/dirtverse/orb-v8.mp4", poster: "/images/dirtverse/orb-v8.jpg" },
  { video: "/images/dirtverse/orb-v7.mp4", poster: "/images/dirtverse/orb-v7.jpg" },
  { video: "/images/dirtverse/orb-v2.mp4", poster: "/images/dirtverse/orb-v2.jpg" },
  { video: "/images/dirtverse/orb-v9.mp4", poster: "/images/dirtverse/orb-v9.jpg" },
  { video: "/images/dirtverse/orb-v10.mp4", poster: "/images/dirtverse/orb-v10.jpg" },
  { video: "/images/dirtverse/orb-v11.mp4", poster: "/images/dirtverse/orb-v11.jpg" },
  { video: "/images/dirtverse/orb-v12.mp4", poster: "/images/dirtverse/orb-v12.jpg" },
  { video: "/images/dirtverse/orb-v13.mp4", poster: "/images/dirtverse/orb-v13.jpg" },
] as const;

const WORK = [
  {
    title: "WldCntry",
    image: "/images/dirtverse/work-a.jpg",
    className: "md:col-span-7 aspect-[16/10]",
    serif: true,
  },
  {
    title: "",
    image: "/images/hero/liquid-violet.jpg",
    className: "md:col-span-5 aspect-square",
  },
  {
    title: "",
    image: "/images/dirtverse/work-c.jpg",
    className: "md:col-span-4 aspect-[4/5]",
  },
  {
    title: "",
    image: "/images/hero/neon-crowd.jpg",
    className: "md:col-span-3 aspect-square",
  },
  {
    title: "",
    image: "/images/hero/urban-night.jpg",
    className: "md:col-span-5 aspect-[16/10]",
  },
] as const;

const SERVICES = ["Brand", "Digital", "Content", "Motion", "Print"] as const;

const ARTICLES = [
  {
    title: "Building brands that move culture",
    body: "A conversation on strategy, creative systems, and what independent agencies get right.",
    image: "/images/hero/creative-desk.jpg",
  },
  {
    title: "New campaign systems for wellness",
    body: "How we turned a fitness platform into a clear, premium digital experience.",
    image: "/images/hero/studio-lights.jpg",
  },
  {
    title: "Bearstow after a year of building",
    body: "From stealth craft to public work — branding, design, film, and content under one roof.",
    image: "/images/manifesto/studio-meeting.jpg",
  },
] as const;

function VideoOrb({
  video,
  poster,
  size,
}: {
  video: string;
  poster: string;
  size: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.playbackRate = 0.85;
    const play = () => {
      el.play().catch(() => undefined);
    };
    play();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <m.div
      className="relative shrink-0 overflow-hidden rounded-full bg-[#f4f4f4]"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <video
        ref={ref}
        src={video}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover"
      />
      {/* soft sphere edge + gloss */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.25), inset -18px -22px 40px rgba(0,0,0,0.18), inset 14px 16px 28px rgba(255,255,255,0.22)",
        }}
      />
    </m.div>
  );
}

function SphereCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 55, damping: 24, mass: 1 });
  const dragging = useRef(false);
  const startX = useRef(0);
  const startVal = useRef(0);
  const setW = useRef(0);
  const [orbSize, setOrbSize] = useState(240);
  const [gap, setGap] = useState(16);

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      const s = Math.round(Math.min(300, Math.max(170, w * 0.2)));
      setOrbSize(s);
      setGap(Math.round(s * 0.07));
      const setEl = trackRef.current?.querySelector("[data-orb-set]") as HTMLElement | null;
      if (setEl) setW.current = setEl.offsetWidth;
    };
    measure();
    const t = window.setTimeout(measure, 250);
    addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(34, now - last);
      last = now;
      if (!dragging.current) {
        x.set(x.get() - dt * 0.048);
      }
      const w = setW.current;
      if (w > 0) {
        let v = x.get();
        while (v <= -w) x.set((v += w));
        while (v > 0) x.set((v -= w));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [x]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      startX.current = e.clientX;
      startVal.current = x.get();
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      x.set(startVal.current + (e.clientX - startX.current));
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - startX.current;
      x.set(x.get() + dx * 0.08);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [x]);

  return (
    <div
      ref={trackRef}
      className="relative cursor-grab overflow-hidden py-8 select-none active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
    >
      <m.div className="flex w-max will-change-transform" style={{ x: springX }}>
        {[0, 1, 2].map((setIdx) => (
          <div
            key={setIdx}
            data-orb-set={setIdx === 0 ? true : undefined}
            className="flex shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
          >
            {ORBS.map((orb) => (
              <VideoOrb
                key={`${setIdx}-${orb.video}`}
                video={orb.video}
                poster={orb.poster}
                size={orbSize}
              />
            ))}
          </div>
        ))}
      </m.div>
    </div>
  );
}

export default function DirtverseSection() {
  return (
    <div className="bg-white text-black">
      <section className="relative min-h-[100svh] overflow-hidden px-4 pb-12 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <nav className="hidden items-center gap-2 sm:flex">
            {["About", "Work", "News"].map((label) => (
              <Link
                key={label}
                href={label === "About" ? "/about" : label === "Work" ? "/brands" : "/visuals"}
                className="rounded-full bg-[#ececec] px-4 py-2 text-sm font-medium text-black/80 transition hover:bg-[#e2e2e2]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:absolute sm:left-1/2 sm:-translate-x-1/2">
            bearstow
          </p>
          <Link
            href="/contact"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            Contact
          </Link>
        </div>

        {/* Primary: live video orbs from Dirt recording */}
        <div className="mx-auto mt-8 w-full max-w-[1600px] lg:mt-14">
          <SphereCarousel />
        </div>

        {/* Backup full row video ambience under — if needed comment out */}
        {/* <div className="mx-auto mt-2 hidden max-w-[1600px] overflow-hidden rounded-[2rem] opacity-0">
          <video src="/images/dirtverse/orb-row-hq.mp4" muted loop autoPlay playsInline className="w-full" />
        </div> */}

        <div className="mx-auto mt-6 max-w-7xl sm:mt-12">
          <p className="text-sm text-black/45">Welcome to the bearverse.</p>
          <p className="mt-2 max-w-md font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">
            A creative ecosystem for real world brands.
          </p>
        </div>
      </section>

      <section className="border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
            Selected Works
          </p>
          <Link href="/brands" className="text-sm font-medium text-black/60 underline-offset-4 hover:underline">
            See All Work
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-12 md:gap-4">
          {WORK.map((item, i) => (
            <m.article
              key={item.image + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl bg-[#f0f0f0] ${item.className}`}
            >
              <Image src={item.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              {item.title && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-3xl text-white drop-shadow sm:text-5xl ${
                      item.serif ? "font-serif italic" : "font-[family-name:var(--font-display)] font-bold"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              )}
            </m.article>
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40 lg:col-span-3">
            Services
          </p>
          <div className="lg:col-span-4">
            <ul className="space-y-1">
              {SERVICES.map((s, i) => (
                <li
                  key={s}
                  className={`font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl ${
                    i === 0 ? "text-black" : "text-black/25"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-8 inline-block rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-medium text-black/70"
            >
              See More
            </Link>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl lg:col-span-5">
            <Image src="/images/hero/paint-splash.jpg" alt="" fill className="object-cover" sizes="40vw" />
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">News</p>
          <Link href="/about" className="rounded-full bg-[#ececec] px-4 py-2 text-sm font-medium text-black/70">
            All Articles
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <m.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
            >
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0f0f0]">
                <Image src={a.image} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-snug tracking-tight">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/50">{a.body}</p>
            </m.article>
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">Contact</p>
          <a
            href="mailto:hello@bearstow.com"
            className="mt-4 block font-[family-name:var(--font-display)] text-[clamp(1.8rem,6vw,4rem)] font-bold tracking-tight"
          >
            hello@bearstow.com
          </a>
          <p className="mt-4 max-w-lg text-lg font-semibold tracking-tight sm:text-xl">
            Grounded in Istanbul. Built for the world.
          </p>
        </div>
      </section>

      <section className="overflow-hidden px-5 pb-16 pt-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p
            className="select-none text-center font-[family-name:var(--font-display)] text-[clamp(4rem,18vw,14rem)] font-bold leading-none tracking-[-0.06em]"
            style={{
              background:
                "linear-gradient(135deg, rgba(180,180,200,0.45), rgba(255,255,255,0.9) 40%, rgba(160,180,255,0.35) 70%, rgba(255,120,180,0.25))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,0,0,0.08)",
            }}
          >
            bearstow
          </p>
        </div>
      </section>
    </div>
  );
}
