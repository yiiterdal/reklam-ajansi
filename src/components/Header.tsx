"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup, m } from "framer-motion";

const HOME_REVEAL_PX = 120;

const TABS = [
  { id: "work", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function activeTab(pathname: string): TabId {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  // `/`, `/portfolio`, and other studio pages map to Home
  return "work";
}

/**
 * Floating bottom pill — 3 tabs with sliding active indicator
 * (reference: Daniel Triendl style from user video).
 */
export default function Header() {
  const pathname = usePathname();
  const active = activeTab(pathname);
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > HOME_REVEAL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const hidden = isHome && !scrolled;

  return (
    <header
      aria-hidden={hidden || undefined}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-4 sm:pb-[calc(1.75rem+env(safe-area-inset-bottom,0px))] ${
        hidden ? "invisible translate-y-[140%] opacity-0" : "visible translate-y-0 opacity-100"
      }`}
    >
      <LayoutGroup id="primary-tabs">
        <nav
          aria-label="Primary"
          className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center rounded-full bg-[#e8e8e8]/92 p-[4px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-[5px]"
        >
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="relative isolate rounded-full px-4 py-2.5 text-[14px] font-medium tracking-[-0.01em] sm:px-7 sm:py-3 sm:text-[16px]"
              >
                {isActive ? (
                  <m.span
                    layoutId="bottom-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 38,
                      mass: 0.55,
                    }}
                  />
                ) : null}
                <span
                  className={`relative transition-colors duration-200 ${
                    isActive ? "text-black" : "text-black/40 hover:text-black/65"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>
    </header>
  );
}

export { TABS, activeTab };
