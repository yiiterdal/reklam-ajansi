"use client";

import Link from "next/link";
import { m } from "framer-motion";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

export default function CareersCta() {
  return (
    <section className="relative overflow-hidden border-t border-gray-200 bg-black px-6 py-20 text-white lg:px-10 lg:py-28">
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.35), transparent 55%)",
            "radial-gradient(circle at 80% 70%, rgba(192,38,211,0.28), transparent 55%)",
            "radial-gradient(circle at 30% 80%, rgba(168,85,247,0.3), transparent 55%)",
            "radial-gradient(circle at 20% 30%, rgba(139,92,246,0.35), transparent 55%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl text-center">
        <m.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
        >
          Bearstow Careers
        </m.p>
        <RevealText
          as="h2"
          text="We're looking for the best"
          className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold lg:text-5xl"
        />
        <RevealText
          as="h2"
          text="We're looking for you!"
          delay={0.12}
          className="font-[family-name:var(--font-display)] text-3xl font-bold lg:text-5xl"
        />
        <MagneticButton className="mt-10">
          <Link
            href="/contact"
            className="inline-block border border-white px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-white hover:text-black"
          >
            Career opportunities
          </Link>
        </MagneticButton>
      </div>
    </section>
  );
}
