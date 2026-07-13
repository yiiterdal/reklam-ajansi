"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { galleryItems } from "@/lib/gallery";

const layoutClasses = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "lg:row-span-2",
  "",
  "lg:col-span-2",
  "",
  "lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "",
  "",
];

export default function GalleryGrid() {
  return (
    <div className="grid auto-rows-[180px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[200px]">
      {galleryItems.map((item, i) => (
        <m.figure
          key={item.src}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          className={`group relative min-h-[180px] overflow-hidden border border-cream-dark ${layoutClasses[i] ?? ""}`}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
          <figcaption className="absolute bottom-0 left-0 right-0 translate-y-full bg-ink/75 px-4 py-3 text-sm text-cream transition-transform duration-300 group-hover:translate-y-0">
            {item.title}
          </figcaption>
        </m.figure>
      ))}
    </div>
  );
}
