"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import HQImage from "@/components/HQImage";
import AboutIntro from "@/components/AboutIntro";

type Shot = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

/**
 * Faithful port of https://gregorcollienne.com/ overview mechanics:
 * - symmetric 5-col grid, equal cells, images centered in each cell
 * - center column skipped on every other row so the name reads through
 * - name UNDER images — covered only where photos overlap the center
 * - intro: photos start centered, then settle into grid slots
 * - name: perspective flip (rotateX -40deg + blur → clear), Gregor .c-gregor
 * - infinite scroll: clone originals whenever near bottom
 */
const SHOTS: Shot[] = [
  { src: "/images/about-extras/shot-bitcoin-heart.jpg", alt: "Bitcoin Heart", w: 698, h: 1061 },
  { src: "/images/about-extras/shot-collage-eye.jpg", alt: "Cascade Eye", w: 787, h: 1015 },
  { src: "/images/about-extras/shot-face-track.jpg", alt: "Face Track", w: 1280, h: 1280 },
  { src: "/images/about-extras/shot-glass-rings.jpg", alt: "Glass Rings", w: 1080, h: 1080 },
  { src: "/images/about-extras/shot-neon-portal.jpg", alt: "Neon Portal", w: 1080, h: 1080 },
  { src: "/images/about-extras/shot-offline-mac.jpg", alt: "Offline", w: 1268, h: 720 },
  { src: "/images/about-extras/shot-mountain-star.jpg", alt: "Mountain Star", w: 2400, h: 1350 },
  { src: "/images/studio/funky-disco.png", alt: "Funky Disco", w: 720, h: 900 },
  { src: "/images/studio/domus-spheres.png", alt: "Soft Stack", w: 720, h: 955 },
  { src: "/images/studio/miss-me-cat.png", alt: "Miss Me", w: 720, h: 900 },
  { src: "/images/studio/spiderman-ticket.png", alt: "Ticket Sketch", w: 720, h: 990 },
  { src: "/images/studio/santoriolo-menu.png", alt: "Santoriolo", w: 480, h: 849 },
  { src: "/images/works/body-wave.png", alt: "Body Wave", w: 720, h: 900 },
  { src: "/images/works/wild-rendered.png", alt: "Wild rendered", w: 1024, h: 801 },
  { src: "/images/works/underscores.png", alt: "underscores", w: 768, h: 1024 },
  { src: "/images/works/stamp-deer.png", alt: "Folk Mark", w: 651, h: 782 },
  { src: "/images/works/galaxy-traveler.png", alt: "Oddsey", w: 1024, h: 576 },
  { src: "/images/works-posters/work-1080-1.jpg", alt: "Add New", w: 1080, h: 608 },
  { src: "/images/works-posters/work-v0-1.jpg", alt: "Fauna", w: 900, h: 1120 },
  { src: "/images/works-posters/work-tatra-v0-1.jpg", alt: "Knicks", w: 1080, h: 1080 },
  { src: "/images/works-posters/work-v0-2.jpg", alt: "Year of the Horse", w: 1080, h: 1080 },
  { src: "/images/works-posters/work-1080-sq.jpg", alt: "Digital Age", w: 572, h: 812 },
  { src: "/images/works-posters/work-720x954.jpg", alt: "Pulse", w: 720, h: 954 },
  { src: "/images/works-posters/work-540x960.jpg", alt: "SabancıDX", w: 540, h: 960 },
  { src: "/images/works-posters/work-1148x720.jpg", alt: "Wide Cut", w: 1148, h: 720 },
  { src: "/images/works-posters/work-v0-8.jpg", alt: "Rewind Room", w: 760, h: 948 },
  { src: "/images/works-posters/work-1036x1108.jpg", alt: "Messi 10", w: 1036, h: 1108 },
  { src: "/images/works-posters/work-v0.jpg", alt: "Zen", w: 1080, h: 1080 },
  { src: "/images/works-posters/work-1280x720.jpg", alt: "Motion", w: 1280, h: 720 },
  { src: "/images/works-posters/work-1080-2.jpg", alt: "Trail Mark", w: 522, h: 736 },
  { src: "/images/works-posters/work-tatra-v0-6.jpg", alt: "Tatra House", w: 1280, h: 800 },
  { src: "/images/works-posters/work-v0-5.jpg", alt: "Wellness", w: 1200, h: 900 },
  { src: "/images/works-posters/work-480x678.jpg", alt: "Path Cut", w: 480, h: 678 },
  { src: "/images/works-posters/work-v0-7.jpg", alt: "Soft Core", w: 900, h: 900 },
  { src: "/images/works-posters/work-1080-sq-2.jpg", alt: "Square Signal", w: 1080, h: 1080 },
  { src: "/images/works-posters/work-0.jpg", alt: "Northline", w: 1280, h: 720 },
  { src: "/images/works-posters/work-tatra-v0.jpg", alt: "Tatra identity", w: 1080, h: 1080 },
  { src: "/images/works-posters/work-v0-3.jpg", alt: "Topo Signal", w: 840, h: 592 },
  { src: "/images/works-posters/work-540x540.jpg", alt: "Brand system", w: 540, h: 540 },
  { src: "/images/works-posters/work-1082x720.jpg", alt: "Print craft", w: 1082, h: 720 },
  { src: "/images/works-posters/work-v0-4.jpg", alt: "Studio note", w: 808, h: 568 },
  { src: "/images/works-posters/work-720x900.jpg", alt: "Editorial", w: 720, h: 900 },
  { src: "/images/works-posters/work-480x640.jpg", alt: "Pocket Story", w: 480, h: 640 },
  { src: "/images/works-posters/work-v0-9.jpg", alt: "Pulse Grid", w: 900, h: 900 },
  { src: "/images/works-posters/work-480x678-b.jpg", alt: "Path Cut B", w: 480, h: 678 },
  { src: "/images/works-posters/work-v0-6.jpg", alt: "Publish Play", w: 1080, h: 1080 },
];

type Cell = { kind: "shot"; shot: Shot } | { kind: "skip" };

/** Desktop: 5-col with center skips. Mobile: dense 2-col, no empty name windows. */
function buildCells(shots: Shot[], cols: 2 | 5): Cell[] {
  const cells: Cell[] = [];
  let si = 0;
  let i = 0;
  while (si < shots.length) {
    if (cols === 5) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const skipCenter = col === 2 && row % 2 === 0;
      if (skipCenter) {
        cells.push({ kind: "skip" });
      } else {
        cells.push({ kind: "shot", shot: shots[si++] });
      }
    } else {
      cells.push({ kind: "shot", shot: shots[si++] });
    }
    i += 1;
  }
  while (cells.length % cols !== 0) cells.push({ kind: "skip" });
  return cells;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CUBIC = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function AboutStudio() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"grid" | "list">("grid");
  const [settled, setSettled] = useState(false);
  const [cols, setCols] = useState<2 | 5>(5);
  const cells = useMemo(() => buildCells(SHOTS, cols), [cols]);
  const extending = useRef(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryInView, setGalleryInView] = useState(false);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setGalleryInView(entry.isIntersecting),
      { rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setCols(mq.matches ? 2 : 5);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    if (mode !== "grid") {
      setSettled(true);
      return;
    }
    setSettled(false);
    let cancelled = false;
    let started = false;
    let raf = 0;

    const runIntro = () => {
      if (cancelled || started) return;
      const root = gridRef.current;
      if (!root) return;
      started = true;

      const items = Array.from(
        root.querySelectorAll<HTMLElement>(".gc-item[data-shot='1']"),
      );
      const zOrder = shuffle(items.map((_, i) => i + 2));
      const mobile = window.matchMedia("(max-width: 768px)").matches;

      // Mobile: skip the center-pile intro — settle straight into the 2-col grid
      if (mobile) {
        items.forEach((item, t) => {
          item.style.setProperty("--z-index", String(zOrder[t]));
          const media = item.querySelector<HTMLElement>(".gc-media");
          if (!media) return;
          media.style.setProperty("--ox", "0px");
          media.style.setProperty("--oy", "0px");
          media.classList.add("is-settled");
        });
        setSettled(true);
        return;
      }

      const delays = shuffle(items.map((_, i) => i + 1));

      items.forEach((item, t) => {
        const media = item.querySelector<HTMLElement>(".gc-media");
        if (!media) return;
        const r = item.getBoundingClientRect();
        const tx = (window.innerWidth - r.width) / 2 - r.left;
        const ty = (window.innerHeight - r.height) / 2 - r.top;
        const dur = (0.6 * Math.random() + 0.8).toFixed(2);
        item.style.setProperty("--z-index", String(zOrder[t]));
        media.style.setProperty("--ox", `${tx}px`);
        media.style.setProperty("--oy", `${ty}px`);
        media.style.setProperty("--delay", String(delays[t]));
        media.style.setProperty("--duration", `${dur}s`);
      });

      // Match Gregor: has--loaded → short beat → has--finished (name + settle)
      raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setSettled(true);
        });
      });
    };

    const transitioning =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("is-page-transitioning");

    // Intro runs once the grid scrolls into view (the text intro sits above it)
    let visible = false;
    let sheetDone = !transitioning;
    const tryRun = () => {
      if (visible && sheetDone) runIntro();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          tryRun();
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    if (gridRef.current) io.observe(gridRef.current);

    const onSettled = () => {
      sheetDone = true;
      tryRun();
    };
    window.addEventListener("page-sheet-settled", onSettled);
    const fallback = window.setTimeout(onSettled, transitioning ? 720 : 40);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("page-sheet-settled", onSettled);
      io.disconnect();
    };
  }, [mode, cells]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f5f3f0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // True infinite scroll — Gregor clones originals whenever within 500px of end
  useEffect(() => {
    if (mode !== "grid") return;

    const onScroll = () => {
      const el = gridRef.current;
      if (!el || extending.current) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const near =
        el.offsetTop + el.scrollHeight - (scrollY + window.innerHeight) <= 500;
      if (!near) return;

      extending.current = true;
      const originals = Array.from(
        el.querySelectorAll<HTMLElement>(".gc-item[data-original='1']"),
      );
      originals.forEach((node) => {
        const clone = node.cloneNode(true) as HTMLElement;
        clone.removeAttribute("data-original");
        if (clone.getAttribute("data-shot") === "1") {
          clone.style.setProperty(
            "--z-index",
            String(2 + Math.floor(Math.random() * 40)),
          );
          const media = clone.querySelector<HTMLElement>(".gc-media");
          if (media) {
            media.style.setProperty("--ox", "0px");
            media.style.setProperty("--oy", "0px");
            media.classList.add("is-settled");
          }
        }
        el.appendChild(clone);
      });
      // Allow another append after layout grows
      requestAnimationFrame(() => {
        extending.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  const nameNode = (
    <div
      className={`gc-name ${settled ? "is-ready" : ""}`}
      aria-hidden
    >
      <div className="gc-name__inner font-[family-name:var(--font-display)]">
        Bearstow
      </div>
    </div>
  );

  return (
    <div
      className={`gc-about relative min-h-svh bg-[#f5f3f0] text-[#0c0c0c] ${
        settled ? "is-ready" : ""
      } ${cols === 2 ? "is-mobile" : ""}`}
    >
      <style>{`
        .gc-about {
          --gc-offset: 0px;
          --gc-col-gap: 3.5vw;
          --gc-row-gap: 9vh;
          --gc-pad-x: 4vw;
          --gc-cubic: ${CUBIC};
        }
        /* —— Mobile layout (class toggled; beats desktop rules) —— */
        .gc-about.is-mobile {
          --gc-offset: 0;
          --gc-col-gap: 0.65rem;
          --gc-row-gap: 0.65rem;
        }
        .gc-about.is-mobile .gc-name {
          display: none;
        }
        .gc-about.is-mobile .gc-grid {
          width: 100%;
          left: 0;
          top: 0;
          grid-template-columns: repeat(2, 1fr);
          padding: 3.25rem 0.85rem calc(6.5rem + env(safe-area-inset-bottom, 0px));
          column-gap: var(--gc-col-gap);
          row-gap: var(--gc-row-gap);
        }
        .gc-about.is-mobile .gc-item {
          height: auto;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 10px;
          background: #ebe7e1;
          transform: none !important;
        }
        .gc-about.is-mobile .gc-media {
          inset: 0;
          width: 100% !important;
          height: 100% !important;
          top: 0 !important;
          left: 0 !important;
          transform: none !important;
        }
        .gc-about.is-mobile .gc-media > span,
        .gc-about.is-mobile .gc-media img,
        .gc-about.is-mobile .gc-media .gc-shot {
          inset: 0 !important;
          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          transform: none !important;
          object-fit: cover !important;
          position: absolute !important;
        }

        /* Gregor .c-gregor — UNDER photos (z-index 1), visible through center gaps */
        .gc-about .gc-name {
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 1;
          transform: translateX(-50%) translateY(-50%);
          perspective: 1000px;
          pointer-events: none;
          opacity: 0;
          max-width: 65%;
          width: max-content;
          text-align: center;
        }
        .gc-about .gc-name__inner {
          display: block;
          transform-style: preserve-3d;
          transform-origin: center center;
          transform: translateY(50%) rotateX(-40deg);
          backface-visibility: hidden;
          opacity: 0;
          filter: blur(12px);
          font-size: clamp(36px, 5.5vw, 82px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0c0c0c;
        }
        .gc-about.is-ready .gc-name {
          opacity: 1;
        }
        .gc-about.is-ready .gc-name__inner {
          transform: none;
          opacity: 1;
          filter: blur(0);
          transition: all 0.79s ${CUBIC} 0.6s;
        }

        .gc-grid {
          overflow: hidden;
          width: 100%;
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: var(--gc-col-gap);
          row-gap: var(--gc-row-gap);
          padding: 6vh var(--gc-pad-x) calc(var(--gc-row-gap) + 24vh);
        }

        .gc-item {
          position: relative;
          z-index: var(--z-index, 2);
          height: 30vh;
        }

        .gc-media {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(calc(var(--ox, 0px) - 50%), calc(var(--oy, 0px) - 50%));
          transition: transform var(--duration, 1s) ${CUBIC};
          transition-delay: calc(var(--delay, 1) * 0.01s);
          pointer-events: none;
        }
        .gc-about.is-ready .gc-media,
        .gc-media.is-settled {
          transform: translate(-50%, -50%);
        }
        .gc-media img,
        .gc-media > span,
        .gc-media .gc-shot {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          max-width: none;
          max-height: none;
          transform: none !important;
          object-fit: contain;
          object-position: center;
          pointer-events: auto;
        }

        .gc-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8vh;
          padding: 12vh 8vw calc(16vh + 5.5rem + env(safe-area-inset-bottom, 0px));
        }
        @media (max-width: 768px) {
          .gc-list {
            gap: 5vh;
            padding: 10vh 5vw calc(5.5rem + env(safe-area-inset-bottom, 0px) + 4vh);
          }
        }
        .gc-list figure {
          max-width: min(72vw, 820px);
          width: 100%;
        }
        .gc-list img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      {nameNode}

      <main className="relative z-[2]">
        <AboutIntro />
        <div ref={galleryRef}>
        {mode === "grid" ? (
          <div ref={gridRef} className="gc-grid">
            {cells.map((cell, i) =>
              cell.kind === "skip" ? (
                <div
                  key={`skip-${i}`}
                  className="gc-item"
                  data-original="1"
                  aria-hidden
                />
              ) : (
                <div
                  key={`shot-${cell.shot.src}-${i}`}
                  className="gc-item"
                  data-shot="1"
                  data-original="1"
                >
                  <div className="gc-media">
                    <HQImage
                      src={cell.shot.src}
                      alt={cell.shot.alt}
                      fill
                      sizes="(max-width: 768px) 48vw, 18vw"
                      priority={i < 8}
                      decoding="async"
                      className="gc-shot"
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="gc-list">
            {SHOTS.map((shot) => (
              <figure key={shot.src}>
                <HQImage
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.w}
                  height={shot.h}
                  sizes="(max-width: 768px) 92vw, min(72vw, 820px)"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        )}
        </div>
      </main>

      <div
        className={`fixed left-4 z-[60] flex gap-4 text-sm text-black/45 transition-opacity duration-300 top-[max(1rem,env(safe-area-inset-top,0px))] sm:left-8 sm:top-7 ${
          galleryInView ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMode("grid")}
          className={mode === "grid" ? "text-black" : "hover:text-black"}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => setMode("list")}
          className={mode === "list" ? "text-black" : "hover:text-black"}
        >
          List
        </button>
      </div>
    </div>
  );
}
