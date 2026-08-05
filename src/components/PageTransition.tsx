"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Exact danieltriendl.com page CSSTransition (from their production bundle):
 * - enter: translate3d(100%,0,0) → 0
 * - exit:  translate3d(0,0,0) → translate3d(-50%,0,0), opacity 1 → 0.2
 * - ease:  cubic-bezier(0.74, 0, 0.07, 1)
 * - duration: 1.2s
 * - enter layer on top; exit z-index 3 under enter
 * - transform cleared when settled so About position:fixed works
 */
const DURATION = 1.2;
const EASE = [0.74, 0, 0.07, 1] as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-page-transitioning");
    const t = window.setTimeout(() => {
      root.classList.remove("is-page-transitioning");
      window.dispatchEvent(new CustomEvent("page-sheet-settled"));
    }, DURATION * 1000 + 40);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("is-page-transitioning");
    };
  }, [pathname]);

  return (
    <div className="relative grid min-h-svh overflow-x-clip [grid-template-areas:'stack']">
      <AnimatePresence mode="sync" initial={false}>
        <m.div
          key={pathname}
          initial={{ x: "100%", opacity: 1, zIndex: 4 }}
          animate={{
            x: "0%",
            opacity: 1,
            zIndex: 2,
            transition: { duration: DURATION, ease: EASE },
          }}
          exit={{
            x: "-50%",
            opacity: 0.2,
            zIndex: 3,
            transition: { duration: DURATION, ease: EASE },
          }}
          transformTemplate={({ x }, generated) => {
            const n = typeof x === "string" ? parseFloat(x) : Number(x);
            if (!Number.isFinite(n) || Math.abs(n) < 0.05) return "none";
            return generated;
          }}
          className="relative min-h-svh w-full bg-white [grid-area:stack]"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
