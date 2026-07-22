"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { images } from "@/lib/images";

const projects = [
  {
    name: "Northline",
    category: "Brand Identity",
    description:
      "Full brand strategy and visual identity for a sustainable fashion label — positioning, key visual system, brand book, and launch campaign across digital and retail channels.",
    image: images.decor.studio,
  },
  {
    name: "Pulse Health",
    category: "Digital Campaign",
    description:
      "Insight-led digital campaign for a health-tech startup — audience research, message architecture, social content, and performance media driving 3× engagement in a competitive category.",
    image: images.decor.campaign,
  },
  {
    name: "Field & Co.",
    category: "Launch Campaign",
    description:
      "End-to-end launch across ATL, BTL, and digital for a DTC food brand — from brand promise and key visual to outdoor, packaging, and paid social across three markets.",
    image: images.decor.lifestyle,
  },
];

export default function Portfolio() {
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="space-y-8 lg:space-y-12">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;

            return (
              <m.a
                key={project.name}
                href="#"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group grid overflow-hidden border border-cream-dark bg-cream transition-colors hover:border-ink/20 lg:grid-cols-2 ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                </div>
                <div className="flex flex-col justify-between p-8 lg:p-12">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      {project.category}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-ink lg:text-5xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted lg:text-base">
                      {project.description}
                    </p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-accent">
                    View case study
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </m.a>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Start a project with us
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
