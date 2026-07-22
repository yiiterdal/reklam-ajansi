"use client";

import { m } from "framer-motion";
import AnimatedVisual from "@/components/AnimatedVisual";

/** Full-bleed hero under the fixed transparent header — no black gap. */
export default function BrandsVideoHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1a0f24]">
      <div className="relative min-h-[min(85vh,760px)] w-full lg:min-h-[min(90vh,860px)]">
        <AnimatedVisual
          src="/images/abstract-fluid-1.png"
          index={0}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />

        <m.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 30%, rgba(139,92,246,0.42), transparent 50%)",
              "radial-gradient(ellipse at 80% 60%, rgba(192,38,211,0.35), transparent 50%)",
              "radial-gradient(ellipse at 40% 70%, rgba(168,85,247,0.35), transparent 50%)",
              "radial-gradient(ellipse at 20% 30%, rgba(139,92,246,0.42), transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

        <div className="absolute inset-0 flex items-end px-6 pb-10 pt-24 lg:px-10 lg:pb-16 lg:pt-28">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-xl font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            Color, motion, and story —
            <span className="text-violet-200"> for every brand.</span>
          </m.p>
        </div>
      </div>
    </section>
  );
}
