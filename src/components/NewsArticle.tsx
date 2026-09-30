"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import WorkMediaFill from "@/components/WorkMediaFill";
import { NEWS_POSTS } from "@/lib/news";

const EASE = [0.22, 1, 0.36, 1] as const;
const serif = "font-[family-name:var(--font-serif)]";
const display = "font-[family-name:var(--font-display)]";

export default function NewsArticle({ slug }: { slug: string }) {
  const index = NEWS_POSTS.findIndex((p) => p.slug === slug);
  const post = NEWS_POSTS[index];
  const next = NEWS_POSTS[(index + 1) % NEWS_POSTS.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const [lead, ...paragraphs] = post.body;

  return (
    <article className="text-black">
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-amber-300"
        style={{ scaleX: bar }}
      />

      <header className="px-5 pt-[max(6rem,14vh)] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 rounded-full bg-[#ececec] px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black hover:text-white"
            >
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden>
                ←
              </span>
              All news
            </Link>
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-black/45">
              <span className="text-black">{post.category}</span>
              <span aria-hidden>·</span>
              {post.date}
              <span aria-hidden>·</span>
              {post.readTime} read
            </p>
          </m.div>

          <h1
            className={`${display} mt-10 max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]`}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <m.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                {post.title}
              </m.span>
            </span>
          </h1>
        </div>
      </header>

      <div ref={heroRef} className="mt-12 px-5 sm:px-8 lg:mt-16 lg:px-12">
        <m.div
          initial={{ clipPath: "inset(12% 8% 12% 8% round 1.75rem)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 1.75rem)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] max-w-[1600px] overflow-hidden rounded-[1.75rem] bg-[#0d0714] sm:aspect-[16/9]"
        >
          <m.div style={{ y: mediaY }} className="absolute -inset-y-[10%] inset-x-0">
            <WorkMediaFill item={post.media} fit="cover" priority sizes="100vw" />
          </m.div>
        </m.div>
      </div>

      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40">(In short)</p>
              <p className="mt-4 text-sm leading-relaxed text-black/55">{post.excerpt}</p>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-5">
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE }}
              className={`${serif} text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.25] text-black/90`}
            >
              {lead}
            </m.p>
            {paragraphs.map((p, i) => (
              <m.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="mt-8 text-lg leading-[1.75] text-black/65"
              >
                {p}
              </m.p>
            ))}
          </div>
        </div>
      </div>

      <section className="px-5 pb-24 sm:px-8 lg:px-12">
        <Link
          href={`/news/${next.slug}`}
          className="group relative mx-auto block max-w-[1600px] overflow-hidden rounded-[1.75rem] bg-[#0d0714] text-white"
        >
          <div className="relative flex min-h-[320px] flex-col justify-end p-6 sm:min-h-[420px] sm:p-10 lg:p-14">
            <div className="absolute inset-0 opacity-50 transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-70">
              <WorkMediaFill item={next.media} fit="cover" sizes="100vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/55">(Next story)</p>
                <p className={`${display} mt-4 max-w-3xl text-[clamp(1.8rem,4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em]`}>
                  {next.title}
                </p>
              </div>
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
