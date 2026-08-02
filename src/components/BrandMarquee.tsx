"use client";

import { visuals } from "@/lib/visuals";
import AnimatedVisual from "@/components/AnimatedVisual";

export default function BrandMarquee() {
  const row = [...visuals, ...visuals];

  return (
    <section className="overflow-hidden border-t border-white/10 bg-[#141414] py-10 lg:py-14">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max gap-4 px-2">
          {row.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-36 w-56 shrink-0 overflow-hidden rounded-sm bg-[#2a2a2a] sm:h-44 sm:w-72"
            >
              <AnimatedVisual src={src} index={i} sizes="288px" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-hidden">
        <div className="animate-marquee-reverse flex w-max gap-4 px-2">
          {[...row].reverse().map((src, i) => (
            <div
              key={`rev-${src}-${i}`}
              className="relative h-28 w-44 shrink-0 overflow-hidden rounded-sm bg-[#2a2a2a] sm:h-36 sm:w-56"
            >
              <AnimatedVisual src={src} index={i + 3} sizes="224px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
