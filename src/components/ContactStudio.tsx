"use client";

import { m } from "framer-motion";
import ContactSection from "@/components/ContactSection";
import WorkMediaFill from "@/components/WorkMediaFill";
import type { WorkMedia } from "@/lib/workMedia";

const CONTACT_MEDIA: WorkMedia[] = [
  {
    kind: "image",
    src: "/images/studio/spiderman-ticket.png",
    title: "Ticket Sketch",
    aspect: "aspect-[720/990]",
  },
  {
    kind: "video",
    src: "/videos/works/work-v0-8.mp4",
    title: "Rewind Room",
    aspect: "aspect-[760/948]",
  },
  {
    kind: "image",
    src: "/images/studio/santoriolo-menu.png",
    title: "Santoriolo",
    aspect: "aspect-[480/849]",
  },
];

export default function ContactStudio() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[85svh] overflow-hidden bg-[#0e0e0e] text-white lg:min-h-[78svh]">
        <div className="absolute inset-0">
          <WorkMediaFill
            item={{
              kind: "video",
              src: "/videos/works/work-1080-sq.mp4",
              title: "Contact backdrop",
              aspect: "aspect-square",
            }}
            fit="cover"
            sizes="100vw"
            rate={0.4}
            className="opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
        </div>

        <div className="relative mx-auto flex min-h-[85svh] max-w-[1600px] flex-col justify-center px-5 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] pt-24 sm:justify-end sm:px-8 sm:pb-14 sm:pt-28 lg:min-h-[78svh] lg:px-12 lg:pb-20">
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

      {/* Editorial media strip above form */}
      <section className="px-5 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-12">
          {CONTACT_MEDIA.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 20 + i * 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl bg-[#ebe8e2] ${
                i === 0 ? "md:col-span-3" : i === 1 ? "md:col-span-6" : "md:col-span-3"
              } ${item.aspect}`}
            >
              <WorkMediaFill
                item={item}
                fit={item.kind === "image" ? "contain" : "cover"}
                sizes="(max-width: 768px) 100vw, 33vw"
                rate={0.42}
              />
            </m.article>
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
