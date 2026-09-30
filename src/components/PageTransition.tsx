"use client";

import { m } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import HQImage from "@/components/HQImage";

/**
 * Curtain transition: internal link clicks are intercepted, a dark panel wipes up
 * over the old page, the route changes underneath, then the panel lifts off to
 * reveal the new page. The page itself is never transformed, so position:fixed
 * content (About grid name, toggles) keeps working.
 */
type Phase = "idle" | "cover" | "hold" | "reveal";

const EASE = [0.76, 0, 0.24, 1] as const;
const COVER_S = 0.6;
const REVEAL_S = 0.75;
const ROUTE_TIMEOUT_MS = 12000;

const LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/services": "Services",
  "/portfolio": "Work",
  "/brands": "Brands",
  "/visuals": "Visuals",
  "/news": "News",
};

type Backdrop = { src: string; position?: string };

// 2880x1800, built by scripts/make-transition-backdrops.ps1 (crop is baked in).
const DEFAULT_BACKDROP: Backdrop = { src: "/images/transitions/about.jpg" };

const BACKDROPS: Record<string, Backdrop> = {
  "/": { src: "/images/transitions/home.jpg" },
  "/about": DEFAULT_BACKDROP,
  "/contact": { src: "/images/transitions/contact.jpg", position: "45% 50%" },
  "/services": { src: "/images/transitions/services-studio.jpg", position: "60% 50%" },
  "/portfolio": { src: "/images/transitions/work.jpg", position: "30% 50%" },
  "/brands": { src: "/images/transitions/brands.jpg" },
  "/visuals": { src: "/images/transitions/visuals.jpg" },
  "/news": { src: "/images/transitions/visuals.jpg" },
};

function routeKey(path: string, table: Record<string, unknown>) {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (clean in table) return clean;
  const first = "/" + (clean.split("/")[1] ?? "");
  return first in table ? first : null;
}

function labelFor(path: string) {
  const key = routeKey(path, LABELS);
  return key ? LABELS[key] : "Bearstow";
}

function backdropFor(path: string) {
  const key = routeKey(path, BACKDROPS);
  return key ? BACKDROPS[key] : DEFAULT_BACKDROP;
}

const panelVariants = {
  idle: { y: "100%", transition: { duration: 0 } },
  cover: { y: "0%", transition: { duration: COVER_S, ease: EASE } },
  hold: { y: "0%", transition: { duration: 0 } },
  reveal: { y: "-100%", transition: { duration: REVEAL_S, ease: EASE } },
};

const backdropVariants = {
  idle: { y: "-35%", scale: 1.15, transition: { duration: 0 } },
  cover: { y: "0%", scale: 1.05, transition: { duration: COVER_S + 0.1, ease: EASE } },
  hold: { y: "0%", scale: 1.05 },
  reveal: { y: "35%", scale: 1.15, transition: { duration: REVEAL_S, ease: EASE } },
};

const labelVariants = {
  idle: { y: "110%", opacity: 0, transition: { duration: 0 } },
  cover: { y: "0%", opacity: 1, transition: { duration: 0.55, ease: EASE, delay: 0.2 } },
  hold: { y: "0%", opacity: 1 },
  reveal: { y: "-60%", opacity: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const [backdrop, setBackdrop] = useState<Backdrop>(DEFAULT_BACKDROP);
  const phaseRef = useRef<Phase>("idle");
  const targetRef = useRef<string | null>(null);
  phaseRef.current = phase;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto|tel):/i.test(href)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      e.stopPropagation();
      if (phaseRef.current !== "idle") return;
      targetRef.current = url.pathname + url.search + url.hash;
      setLabel(labelFor(url.pathname));
      setBackdrop(backdropFor(url.pathname));
      document.documentElement.classList.add("is-page-transitioning");
      setPhase("cover");
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const preload = () => {
      const srcs = new Set([DEFAULT_BACKDROP.src, ...Object.values(BACKDROPS).map((b) => b.src)]);
      srcs.forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(preload);
      return;
    }
    const t = window.setTimeout(preload, 2500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "hold") return;
    const t = window.setTimeout(() => setPhase("reveal"), ROUTE_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const anchor = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    if (anchor) anchor.scrollIntoView({ behavior: "auto", block: "start" });
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (phaseRef.current !== "hold" && phaseRef.current !== "cover") return;
    let raf = 0;
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(() => setPhase("reveal"));
    }, 160);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== "reveal") return;
    document.documentElement.classList.remove("is-page-transitioning");
    window.dispatchEvent(new CustomEvent("page-sheet-settled"));
  }, [phase]);

  const onPanelDone = () => {
    if (phaseRef.current === "cover") {
      setPhase("hold");
      const target = targetRef.current;
      targetRef.current = null;
      if (target) router.push(target, { scroll: true });
    } else if (phaseRef.current === "reveal") {
      setPhase("idle");
    }
  };

  return (
    <>
      <div className="relative min-h-svh w-full overflow-x-clip bg-white">{children}</div>

      <m.div
        aria-hidden
        initial="idle"
        animate={phase}
        variants={panelVariants}
        onAnimationComplete={onPanelDone}
        className={`fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#0c0c0c] text-white ${
          phase === "idle" ? "pointer-events-none invisible" : ""
        }`}
      >
        <m.div initial="idle" animate={phase} variants={backdropVariants} className="absolute inset-0">
          <HQImage
            key={backdrop.src}
            src={backdrop.src}
            alt=""
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: backdrop.position ?? "50% 50%" }}
          />
        </m.div>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="relative overflow-hidden px-6 py-2">
          <m.p
            initial="idle"
            animate={phase}
            variants={labelVariants}
            className="m-0 font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-[-0.04em]"
          >
            {label}
          </m.p>
        </div>
        <p className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-1/2 m-0 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
          Bearstow
        </p>
      </m.div>
    </>
  );
}
