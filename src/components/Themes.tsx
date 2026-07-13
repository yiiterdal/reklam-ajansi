"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { images } from "@/lib/images";
import InvestCorner from "@/components/InvestCorner";

const services = [
  {
    number: "01",
    title: "Brand & Identity",
    description:
      "Brand strategy, positioning, USP, and message architecture — plus key visual systems, brand books, manifestos, and corporate identity across all touchpoints.",
    image: images.themes.brand,
  },
  {
    number: "02",
    title: "Digital & Social",
    description:
      "Web design & development, SEO, landing pages, email formats, social media management, Google Ads, remarketing, and conversion-focused digital campaigns.",
    image: images.themes.digital,
  },
  {
    number: "03",
    title: "Campaign & Media",
    description:
      "ATL film scripts, radio spots, outdoor adaptations, BTL brochures and POP, event & exhibition design, and integrated media planning across all channels.",
    image: images.themes.growth,
  },
];

export default function Themes() {
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl lg:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
            What we deliver
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted lg:text-lg">
            End-to-end creative solutions — from brand strategy and campaign
            concept to adaptation across ATL, BTL, and digital channels.
          </p>
        </m.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <m.article
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex min-h-[26rem] flex-col overflow-hidden bg-ink text-cream"
            >
              <div className="relative z-10 flex flex-1 flex-col justify-between p-8 lg:p-10">
                <span className="font-[family-name:var(--font-display)] text-4xl text-cream/80">
                  {service.number}
                </span>
                <div className="max-w-[15rem]">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover opacity-45 transition-opacity duration-500 group-hover:opacity-60"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
              </div>

              <InvestCorner />
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
