"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, m } from "framer-motion";
import WorkMediaFill from "@/components/WorkMediaFill";
import { NEWS_CATEGORIES, NEWS_POSTS, type NewsCategory, type NewsPost } from "@/lib/news";
import { VISUALS_WORK } from "@/lib/workMedia";

const EASE = [0.22, 1, 0.36, 1] as const;
const serif = "font-[family-name:var(--font-serif)]";
const display = "font-[family-name:var(--font-display)]";

type Filter = "All" | NewsCategory;

function Meta({ post, light = false }: { post: NewsPost; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${
        light ? "text-white/60" : "text-black/45"
      }`}
    >
      <span className={light ? "text-white" : "text-black"}>{post.category}</span>
      <span aria-hidden>·</span>
      {post.date}
      <span aria-hidden>·</span>
      {post.readTime}
    </p>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Featured({ post }: { post: NewsPost }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.25 }}
    >
      <Link
        href={`/news/${post.slug}`}
        className="group relative block overflow-hidden rounded-[1.75rem] bg-[#0d0714] text-white"
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
          <m.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
            className="absolute inset-0"
          >
            <WorkMediaFill
              item={post.media}
              fit="cover"
              priority
              sizes="100vw"
              className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </m.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] backdrop-blur-md sm:left-8 sm:top-8">
            Latest story
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-12">
            <div className="max-w-3xl">
              <Meta post={post} light />
              <h2 className={`${display} mt-4 text-[clamp(2rem,4.6vw,4.25rem)] font-bold leading-[1] tracking-[-0.03em]`}>
                {post.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{post.excerpt}</p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-black">
              Read story
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition-transform duration-500 group-hover:rotate-45">
                <Arrow />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

function PostCard({ post, index, wide }: { post: NewsPost; index: number; wide: boolean }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      className={wide ? "lg:col-span-2" : ""}
    >
      <Link href={`/news/${post.slug}`} className="group block">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f0f0f0] ${wide ? "lg:aspect-[2.72/1]" : ""}`}
        >
          <WorkMediaFill
            item={post.media}
            fit="cover"
            sizes="(max-width:768px) 100vw, 33vw"
            className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 scale-75 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <Arrow />
          </span>
        </div>
        <div className="mt-5">
          <Meta post={post} />
          <h3
            className={`${display} mt-3 text-xl font-bold leading-snug tracking-tight transition-colors sm:text-2xl`}
          >
            <span className="bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {post.title}
            </span>
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-black/55">{post.excerpt}</p>
        </div>
      </Link>
    </m.article>
  );
}

function LibraryBand() {
  const thumbs = VISUALS_WORK.filter((v) => v.kind === "image").slice(0, 4);
  return (
    <section className="px-5 pb-24 sm:px-8 lg:px-12">
      <Link
        href="/visuals"
        className="group relative mx-auto flex max-w-[1600px] flex-col gap-10 overflow-hidden rounded-[1.75rem] bg-[#0d0714] p-6 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet-600/30 blur-[120px]"
        />
        <div className="relative max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">(From the library)</p>
          <p className={`${display} mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl`}>
            Stills, loops and{" "}
            <span className={`${serif} font-normal italic text-violet-200`}>experiments.</span>
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:text-white">
            Open the visual library <Arrow />
          </span>
        </div>
        <div className="relative flex items-end">
          {thumbs.map((t, i) => (
            <div
              key={t.src}
              className="relative -ml-8 h-36 w-28 overflow-hidden rounded-xl border-2 border-[#0d0714] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] first:ml-0 sm:h-48 sm:w-36"
              style={{ transform: `rotate(${(i - 1.5) * 5}deg)`, zIndex: i }}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <WorkMediaFill item={t} fit="cover" sizes="160px" />
              </div>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}

export default function NewsJournal() {
  const [filter, setFilter] = useState<Filter>("All");
  const [featured, ...rest] = NEWS_POSTS;
  const posts = filter === "All" ? rest : NEWS_POSTS.filter((p) => p.category === filter);
  const filters: Filter[] = ["All", ...NEWS_CATEGORIES];

  return (
    <div className="bg-white text-black">
      <section className="px-5 pb-12 pt-[max(6rem,14vh)] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-black/40"
            >
              (Journal) · Notes from the studio
            </m.p>
            <h1 className={`${display} mt-5 text-[clamp(3.2rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.045em]`}>
              <span className="block overflow-hidden pb-[0.04em]">
                <m.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.05 }}
                >
                  News from
                </m.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <m.span
                  className={`${serif} block font-normal italic tracking-[-0.01em] text-violet-500`}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                >
                  the den.
                </m.span>
              </span>
            </h1>
          </div>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="max-w-sm text-base leading-relaxed text-black/55 lg:pb-4"
          >
            Launches, process notes and the odd side project. What we're making, and what we learn while making it.
          </m.p>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Featured post={featured} />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${display} text-2xl font-bold tracking-tight sm:text-3xl`}>
              {filter === "All" ? "More stories" : filter}
              <sup className="ml-1.5 font-mono text-xs font-normal text-black/40">{posts.length}</sup>
            </p>
            <LayoutGroup id="news-filter">
              <div className="flex flex-wrap gap-1.5">
                {filters.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      filter === f ? "text-white" : "text-black/60 hover:text-black"
                    }`}
                    aria-pressed={filter === f}
                  >
                    {filter === f ? (
                      <m.span
                        layoutId="news-filter-pill"
                        className="absolute inset-0 rounded-full bg-black"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full bg-[#ececec] opacity-0 transition-opacity hover:opacity-100" />
                    )}
                    <span className="relative">{f}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>

          <m.div layout className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} wide={i === 0 && posts.length % 3 === 2} />
              ))}
            </AnimatePresence>
          </m.div>
        </div>
      </section>

      <LibraryBand />
    </div>
  );
}
