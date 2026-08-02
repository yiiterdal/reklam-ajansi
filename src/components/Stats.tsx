"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import RevealText from "@/components/RevealText";

type StatItem =
  | { kind: "number"; value: number; suffix: string; label: string }
  | { kind: "text"; value: string; label: string };

const highlights: StatItem[] = [
  { kind: "number", value: 500, suffix: "+", label: "digital projects and campaigns" },
  { kind: "number", value: 20, suffix: "+", label: "national and international awards" },
  { kind: "number", value: 15, suffix: "+", label: "industries of expertise" },
  { kind: "text", value: "Integrated", label: "ATL, BTL, and digital under one team" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplay(target);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-flow border-t border-gray-200 bg-gray-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-[0.45fr_1fr] lg:gap-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              By the numbers
            </p>
            <RevealText
              as="h2"
              text="Results-driven at our core"
              className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:text-4xl"
            />
            <p className="mt-5 text-sm leading-relaxed text-gray-600 lg:text-base">
              We partner with national and international brands — delivering work
              that earns attention and changes behavior on every project.
            </p>
          </m.div>

          <div className="grid gap-10 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <m.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-gray-200 pt-8"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold tabular-nums text-black lg:text-5xl">
                  {item.kind === "number" ? (
                    <Counter target={item.value} suffix={item.suffix} />
                  ) : (
                    item.value
                  )}
                </p>
                <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-gray-600">
                  {item.label}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
