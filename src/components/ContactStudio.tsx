"use client";

import Image from "next/image";
import { m } from "framer-motion";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import ContactSection from "@/components/ContactSection";
import { workPoster } from "@/lib/workMedia";

export default function ContactStudio() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[70svh] overflow-hidden bg-[#0e0e0e] text-white lg:min-h-[78svh]">
        <div className="absolute inset-0">
          <SlowWorkVideo
            src="/videos/works/work-1080-sq.mp4"
            poster={workPoster("/videos/works/work-1080-sq.mp4")}
            rate={0.4}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:min-h-[78svh] lg:px-12 lg:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
            Contact
          </p>
          <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.98] tracking-tight">
            Get in touch.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            New project, partnership, or something half-formed — we are happy to
            help shape it.
          </p>
        </div>
      </section>

      {/* Side visual strip above form */}
      <section className="px-5 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-12">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-4 md:aspect-auto md:min-h-[420px]"
          >
            <Image
              src="/images/works/body-wave.png"
              alt="Body Wave"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative aspect-video overflow-hidden rounded-2xl md:col-span-8 md:aspect-auto md:min-h-[420px]"
          >
            <SlowWorkVideo
              src="/videos/works/work-v0-8.mp4"
              poster={workPoster("/videos/works/work-v0-8.mp4")}
              rate={0.42}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </m.div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
