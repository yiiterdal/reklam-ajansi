"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";
import RevealText from "@/components/RevealText";

type PageHeroProps = {
  label: string;
  title: string;
  description?: string;
  image?: string;
};

export default function PageHero({ label, title, description, image }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  if (image) {
    return (
      <section
        ref={ref}
        className="relative min-h-[70vh] overflow-hidden pt-32 lg:min-h-[75vh] lg:pt-40"
      >
        <m.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY }}
          className="absolute inset-0 scale-110"
        >
          <Image src={image} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
        </m.div>

        <div className="relative mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-end px-6 pb-20 lg:min-h-[60vh] lg:px-10 lg:pb-28">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-cream"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cream/70">
              {label}
            </p>
            <RevealText
              as="h1"
              text={title}
              trigger="mount"
              delay={0.1}
              className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight lg:text-6xl"
            />
            {description ? (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 lg:text-lg">
                {description}
              </p>
            ) : null}
          </m.div>
        </div>

        <ScrollIndicator />
      </section>
    );
  }

  return (
    <section className="border-b border-cream-dark bg-cream pt-32 pb-14 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
            {label}
          </p>
          <RevealText
            as="h1"
            text={title}
            trigger="mount"
            delay={0.1}
            className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-ink lg:text-6xl"
          />
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted lg:text-lg">
              {description}
            </p>
          ) : null}
        </m.div>
      </div>
    </section>
  );
}
