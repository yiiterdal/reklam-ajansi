"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { images } from "@/lib/images";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-32 lg:min-h-screen lg:pt-40">
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-6 pb-28 lg:min-h-[80vh] lg:px-10 lg:pb-36">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-cream"
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-cream/70">
            Full-service creative & digital agency
          </p>
          <h1
            id="impact"
            className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] tracking-tight"
          >
            Insight-led
            <br />
            <span className="italic">creative impact</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-cream/85 lg:text-lg">
            You can have a great product — but without a strong insight, you only
            earn applause, not sales. We place consumer understanding at the
            center of brand strategy, building work that changes audience
            behavior.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white"
          >
            Start a project
          </Link>
        </m.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
