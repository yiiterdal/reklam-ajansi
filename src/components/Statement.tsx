"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { images } from "@/lib/images";

const statements = [
  {
    label: "Our belief",
    title: "Insight at the center, behavior change as the goal",
    body: "We develop communication strategies that place consumer insight at the heart of every decision. Making creative work is not enough for us — we believe we succeed when we shift audience behavior and deliver measurable value back to the brand.",
    image: images.decor.studio,
  },
  {
    label: "How we operate",
    title: "Talent, creativity, and integrity — together",
    body: "Our work is built on more than ideas alone. We combine creative excellence with ethical practice: acting fairly, communicating responsibly, and protecting the trust our clients place in us. That foundation is what lets us do ambitious work with confidence.",
    image: images.decor.team,
  },
  {
    label: "Beyond the brief",
    title: "Active members of the communities we serve",
    body: "We aim to be contributors, not bystanders — donating our time, talent, and creative energy to causes that matter. Diversity of thought, culture, and experience makes us stronger and helps us deliver more extraordinary solutions for every client.",
    image: images.decor.campaign,
  },
];

function StatementBlock({
  item,
  reversed,
}: {
  item: (typeof statements)[0];
  reversed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <m.div style={{ y }} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-ink/10" />
      </m.div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
          {item.label}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-snug text-ink lg:text-5xl">
          {item.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted lg:text-lg">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function Statement() {
  return (
    <section className="border-t border-cream-dark bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="space-y-28 lg:space-y-36">
          {statements.map((item, i) => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
            >
              <StatementBlock item={item} reversed={i % 2 === 1} />
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-28"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            Explore our services
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
