"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { images } from "@/lib/images";

const { decor } = images;

type ImageItem = {
  type: "image";
  src: string;
  label: string;
  caption: string;
};

type TextItem = {
  type: "text";
  variant: "quote" | "stat" | "phrase";
  headline: string;
  body?: string;
};

type StripItem = ImageItem | TextItem;

const rowOne: StripItem[] = [
  {
    type: "text",
    variant: "quote",
    headline: "Insight before execution",
    body: "A great product without insight earns applause — not sales.",
  },
  { type: "image", src: decor.studio, label: "Studio", caption: "Creative direction" },
  { type: "text", variant: "stat", headline: "500+", body: "digital projects delivered" },
  { type: "image", src: decor.lifestyle, label: "Campaign", caption: "Brand storytelling" },
  { type: "text", variant: "phrase", headline: "Research · Insight · Campaign" },
  { type: "image", src: decor.product, label: "Product", caption: "Launch visuals" },
];

const rowTwo: StripItem[] = [
  { type: "image", src: decor.urban, label: "Urban", caption: "Out-of-home" },
  {
    type: "text",
    variant: "quote",
    headline: "Talent, creativity & integrity",
    body: "How we work matters as much as what we make.",
  },
  { type: "image", src: decor.campaign, label: "Film", caption: "Campaign stills" },
  { type: "text", variant: "stat", headline: "20+", body: "creative & digital awards" },
  { type: "image", src: decor.portrait, label: "People", caption: "Talent & culture" },
  { type: "text", variant: "phrase", headline: "Purpose over noise" },
];

const principles = [
  {
    title: "Insight-led",
    text: "We place consumer understanding at the center of every brief — defining the problem before we design the solution.",
  },
  {
    title: "Channel-integrated",
    text: "One idea, adapted consistently across ATL, BTL, and digital — from key visual and film scripts to social content and media plans.",
  },
  {
    title: "Integrity-first",
    text: "We act ethically, communicate responsibly, and protect the trust our clients place in us.",
  },
];

function TextCard({ item }: { item: TextItem }) {
  if (item.variant === "stat") {
    return (
      <div className="flex h-44 w-56 shrink-0 flex-col justify-center border border-cream-dark bg-cream-dark/50 px-6 sm:h-52 sm:w-64">
        <p className="font-[family-name:var(--font-display)] text-5xl text-accent sm:text-6xl">
          {item.headline}
        </p>
        <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
      </div>
    );
  }

  if (item.variant === "phrase") {
    return (
      <div className="flex h-44 w-72 shrink-0 items-center border border-accent/20 bg-accent/5 px-8 sm:h-52 sm:w-80">
        <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-ink sm:text-3xl">
          {item.headline}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-44 w-72 shrink-0 flex-col justify-center border border-cream-dark bg-cream-dark/40 px-8 sm:h-52 sm:w-80">
      <p className="font-[family-name:var(--font-display)] text-2xl italic leading-snug text-ink sm:text-3xl">
        &ldquo;{item.headline}&rdquo;
      </p>
      {item.body ? (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
      ) : null}
    </div>
  );
}

function ImageCard({ item }: { item: ImageItem }) {
  return (
    <div className="group relative h-44 w-56 shrink-0 overflow-hidden border border-cream-dark sm:h-52 sm:w-64">
      <Image
        src={item.src}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="256px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/70">
          {item.label}
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-lg text-cream">
          {item.caption}
        </p>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: StripItem[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {loop.map((item, i) =>
          item.type === "image" ? (
            <ImageCard key={`${item.src}-${i}`} item={item} />
          ) : (
            <TextCard key={`${item.headline}-${i}`} item={item} />
          ),
        )}
      </div>
    </div>
  );
}

export default function ImageMarquee() {
  return (
    <section className="overflow-hidden border-y border-cream-dark bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
              Creative direction
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-snug text-ink lg:text-5xl">
              One visual language
              <span className="italic"> across every touchpoint</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted lg:text-lg">
              Deep greens, soft textures, and editorial restraint — our visual
              library stays consistent from identity to campaign.
            </p>
            <Link
              href="/visuals"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink"
            >
              Explore the visual library
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative aspect-[4/5] overflow-hidden border border-cream-dark"
          >
            <Image
              src={decor.studio}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 space-y-4 lg:mt-20"
      >
        <MarqueeRow items={rowOne} />
        <MarqueeRow items={rowTwo} reverse />
      </m.div>

      <div className="mx-auto mt-20 max-w-7xl px-6 lg:mt-28 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
          How we think
        </p>
        <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {principles.map((item, i) => (
            <m.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="border-t border-cream-dark pt-8"
            >
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink lg:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted lg:text-base">
                {item.text}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
