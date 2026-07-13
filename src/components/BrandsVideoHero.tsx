"use client";

import { m } from "framer-motion";
import AnimatedVisual from "@/components/AnimatedVisual";

export default function BrandsVideoHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black pt-[72px]">
      <div className="relative mx-auto aspect-[16/9] max-h-[85vh] min-h-[280px] w-full max-w-[1920px]">
        <AnimatedVisual
          src="/images/fluid-teal-gold.png"
          index={0}
          priority
          sizes="100vw"
          className="absolute inset-0"
        />

        <m.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 30%, rgba(45,212,191,0.35), transparent 50%)",
              "radial-gradient(ellipse at 80% 60%, rgba(251,146,60,0.35), transparent 50%)",
              "radial-gradient(ellipse at 40% 70%, rgba(167,139,250,0.3), transparent 50%)",
              "radial-gradient(ellipse at 20% 30%, rgba(45,212,191,0.35), transparent 50%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        <div className="absolute inset-0 flex items-end px-6 pb-10 lg:px-10 lg:pb-16">
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-xl font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            Color, motion, and story —
            <span className="text-teal-200"> for every brand.</span>
          </m.p>
        </div>
      </div>
    </section>
  );
}
