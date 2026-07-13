"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import {
  m,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { brands } from "@/lib/brands";
import { visualForIndex } from "@/lib/visuals";

const campaigns = [
  "Sustainable Fashion Launch",
  "Digital Health Campaign",
  "Corporate Identity Refresh",
  "DTC Brand Launch",
  "Luxury E-commerce Experience",
  "Energy Brand Platform",
  "Product Launch Campaign",
  "Consumer Tech Experience",
  "Integrated Brand System",
  "Retail Activation",
  "Social-First Campaign",
  "Performance Marketing",
  "Brand Refresh",
  "Experiential Launch",
];

const showcaseItems = brands.slice(0, 14).map((brand, i) => ({
  brand: brand.name,
  campaign: campaigns[i % campaigns.length],
  slug: brand.slug,
}));

export default function ScrollWorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollDistanceMV = useMotionValue(0);
  const [sectionHeight, setSectionHeight] = useState("250vh");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform([scrollYProgress, scrollDistanceMV], ([progress, distance]) => {
    return -(progress as number) * (distance as number);
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      scrollDistanceMV.set(distance);
      setSectionHeight(distance > 0 ? `calc(100vh + ${distance}px)` : "100vh");
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);

    window.addEventListener("resize", measure);

    const images = trackRef.current?.querySelectorAll("img") ?? [];
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    const timer = window.setTimeout(measure, 100);
    const timer2 = window.setTimeout(measure, 500);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
      window.clearTimeout(timer2);
    };
  }, [scrollDistanceMV]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: sectionHeight }}
      aria-label="Featured work"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={viewportRef} className="relative flex h-full flex-col">
          <m.div
            style={{ opacity: introOpacity, y: introY }}
            className="pointer-events-none absolute top-24 left-6 z-10 max-w-sm px-1 lg:top-28 lg:left-10 lg:max-w-md"
          >
            <p className="text-sm leading-relaxed text-black/55 lg:text-base">
              People expect more of brands than ever before. We innovate at the
              intersections to bring forth the best possible growth solutions.
            </p>
          </m.div>

          <div className="flex min-h-0 flex-1 items-center pt-16 lg:pt-20">
            <m.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-4 px-6 will-change-transform lg:gap-5 lg:px-10"
            >
              {showcaseItems.map((item, i) => (
                <WorkCard key={item.slug} item={item} index={i} />
              ))}
              <EndCard />
            </m.div>
          </div>

          <div className="shrink-0 px-6 pb-8 lg:px-10 lg:pb-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/40">
                  Scroll
                </p>
                <m.div className="h-px flex-1 bg-black/10">
                  <m.div
                    className="h-full origin-left bg-black"
                    style={{ scaleX: scrollYProgress }}
                  />
                </m.div>
                <Link
                  href="/brands"
                  className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
                >
                  All work →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  item,
  index,
}: {
  item: (typeof showcaseItems)[0];
  index: number;
}) {
  return (
    <Link
      href={`/brands/${item.slug}`}
      className="group relative block h-[62vh] w-[72vw] max-h-[640px] max-w-[340px] shrink-0 overflow-hidden bg-neutral-100 sm:w-[300px] lg:h-[68vh] lg:w-[340px]"
    >
      <Image
        src={visualForIndex(index)}
        alt=""
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 72vw, 340px"
        priority={index < 4}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
          {item.brand}
        </p>
        <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-white lg:text-xl">
          {item.campaign}
        </h3>
      </div>
    </Link>
  );
}

function EndCard() {
  return (
    <div className="flex h-[62vh] w-[72vw] max-h-[640px] max-w-[280px] shrink-0 flex-col justify-center border border-black/15 bg-neutral-50 px-8 sm:w-[260px] lg:h-[68vh] lg:w-[300px]">
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black lg:text-3xl">
        More case studies coming soon
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex w-fit border border-black px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
      >
        Start a project
      </Link>
    </div>
  );
}
