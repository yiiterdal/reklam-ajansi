"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Our Brands", href: "/brands" },
  { label: "Careers", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const transparentHeaderRoutes = ["/", "/brands"];

export default function Header() {
  const pathname = usePathname();
  const onTransparentHero = transparentHeaderRoutes.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = onTransparentHero ? scrolled : true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-gray-200 bg-white/95 text-black backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight lg:text-2xl"
        >
          Studio
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? solid
                      ? "text-black"
                      : "text-white"
                    : solid
                      ? "text-gray-600 hover:text-black"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="text-xs font-medium text-gray-400">TR</span>
          <span className="text-xs font-semibold text-black">EN</span>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-6 transition-transform ${solid ? "bg-black" : "bg-white"} ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity ${solid ? "bg-black" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-transform ${solid ? "bg-black" : "bg-white"} ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gray-200 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`py-2 text-2xl font-[family-name:var(--font-display)] font-medium ${
                    pathname === link.href ? "text-black" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 border-t border-gray-100 pt-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-lg text-gray-600"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex gap-4">
                <span className="text-sm font-medium text-gray-400">TR</span>
                <span className="text-sm font-semibold text-black">EN</span>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
