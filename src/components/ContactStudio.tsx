"use client";

import { m } from "framer-motion";
import ContactSection from "@/components/ContactSection";
import HQImage from "@/components/HQImage";
import WorkMediaFill from "@/components/WorkMediaFill";
import type { WorkMedia } from "@/lib/workMedia";

const CONTACT_MEDIA: WorkMedia[] = [
  {
    kind: "image",
    src: "/images/studio/spiderman-ticket.png",
    title: "Ticket Sketch",
    subtitle: "Found-object comic",
    aspect: "aspect-[720/990]",
  },
  {
    kind: "video",
    src: "/videos/works/work-v0-8.mp4",
    title: "Rewind Room",
    subtitle: "Music nights poster",
    aspect: "aspect-[760/948]",
  },
  {
    kind: "image",
    src: "/images/studio/santoriolo-menu.png",
    title: "Santoriolo",
    subtitle: "Menu system",
    aspect: "aspect-[480/849]",
  },
];

export default function ContactStudio() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[85svh] overflow-hidden bg-[#0e0e0e] text-white lg:min-h-[78svh]">
        <div className="absolute inset-0">
          <m.div
            className="absolute inset-x-0 -top-[16%] bottom-[16%] sm:inset-0"
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          >
            <HQImage
              src="/images/about-extras/shot-mountain-star.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </m.div>
          <div className="absolute inset-x-0 bottom-[10%] h-64 bg-gradient-to-t from-[#0e0e0e] from-25% to-transparent sm:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 sm:from-black/65 sm:via-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[85svh] max-w-[1600px] flex-col justify-end px-5 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] pt-24 sm:px-8 sm:pb-14 sm:pt-28 lg:min-h-[78svh] lg:px-12 lg:pb-20">
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
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4 lg:gap-5">
          {CONTACT_MEDIA.map((item, i) => (
            <m.article
              key={item.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#ebe8e2]"
            >
              <WorkMediaFill
                item={item}
                fit="cover"
                sizes="(max-width: 640px) 100vw, 33vw"
                rate={0.42}
                className="transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white sm:text-xl">
                  {item.title}
                </h3>
                {item.subtitle ? <p className="mt-1 text-sm text-white/75">{item.subtitle}</p> : null}
              </div>
            </m.article>
          ))}
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
