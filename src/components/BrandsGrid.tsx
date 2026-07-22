"use client";

import Link from "next/link";
import { m } from "framer-motion";
import type { Brand } from "@/lib/brands";
import { visualForIndex } from "@/lib/visuals";
import AnimatedVisual from "@/components/AnimatedVisual";
import TiltCard from "@/components/TiltCard";

type BrandsGridProps = {
  brands: Brand[];
};

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
      {brands.map((brand, i) => (
        <m.article
          key={brand.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
          className="group relative"
        >
          <Link href={`/brands/${brand.slug}`} className="block">
            <TiltCard className="relative aspect-[29/18]">
              <div className="relative h-full w-full overflow-hidden rounded-sm bg-gray-100">
                <AnimatedVisual
                  src={visualForIndex(i)}
                  alt=""
                  index={i}
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </TiltCard>
            <div className="px-1 pt-5 sm:px-2">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-wide text-black transition-colors group-hover:text-accent lg:text-2xl">
                {brand.name}
              </h3>
              <ul className="mt-3 space-y-0.5">
                {brand.services.map((service) => (
                  <li key={service} className="text-sm text-gray-600">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </m.article>
      ))}
    </div>
  );
}
