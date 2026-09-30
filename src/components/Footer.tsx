import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import BearLogo from "@/components/BearLogo";
import { CAREERS_EMAIL, SITE_EMAIL } from "@/lib/site";

const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
];

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Web Privacy", href: "#" },
  { label: "Cookies", href: "#" },
];

const serif = "font-[family-name:var(--font-serif)]";
const display = "font-[family-name:var(--font-display)]";
const label = "font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40";

function SpinningBadge() {
  const text = "START A PROJECT \u2022 START A PROJECT \u2022 ";
  return (
    <Link
      href="/contact"
      aria-label="Start a project"
      className="group relative grid h-32 w-32 shrink-0 place-items-center sm:h-40 sm:w-40 lg:h-44 lg:w-44"
    >
      <svg viewBox="0 0 200 200" className="footer-spin absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="footer-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-cream/80" style={{ fontSize: 15.5, letterSpacing: 3.2, fontWeight: 600 }}>
          <textPath href="#footer-badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-ink transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 group-hover:bg-violet-300 sm:h-16 sm:w-16">
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-[#0d0714] text-cream">
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="footer-drift-a absolute -left-[10%] top-[5%] h-[34rem] w-[34rem] rounded-full bg-violet-600/35 blur-[130px]" />
        <div className="footer-drift-b absolute right-[-8%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="footer-drift-a absolute bottom-[-10%] left-[35%] h-[26rem] w-[40rem] rounded-full bg-indigo-500/20 blur-[140px] [animation-delay:-9s]" />
        <div className="footer-grain absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
        <div className="absolute inset-0 mx-auto grid max-w-[1600px] grid-cols-2 px-6 md:grid-cols-4 lg:px-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`border-l border-white/[0.05] ${i > 1 ? "hidden md:block" : ""} ${i === 3 ? "border-r" : ""}`} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Meta strip */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 py-6">
          <span className={label}>(Bearstow&reg;)</span>
          <span className={`${label} hidden md:inline`}>Brand &middot; Digital &middot; Content &middot; Motion</span>
          <span className={`${label} flex items-center gap-2 text-cream/60`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open for projects
          </span>
        </div>

        {/* Statement */}
        <div className="pt-16 sm:pt-24 lg:pt-28">
          <h2 className={`${display} text-[15vw] font-bold uppercase leading-[0.86] tracking-[-0.04em] sm:text-[12vw] lg:text-[9.6vw]`}>
            <span className="block">Let&apos;s make</span>
            <span className="block pl-[8vw] sm:pl-[14vw]">
              <span
                className={`${serif} bg-gradient-to-r from-violet-300 via-fuchsia-200 to-amber-100 bg-clip-text pr-[0.08em] text-[1.08em] font-normal normal-case italic tracking-[-0.02em] text-transparent`}
              >
                something
              </span>
            </span>
            <span className="mt-4 flex items-end justify-between gap-6 sm:mt-2">
              <SpinningBadge />
              <span className="block">felt.</span>
            </span>
          </h2>
        </div>

        {/* Index */}
        <div className="mt-20 grid gap-12 border-t border-white/10 pt-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 lg:gap-0">
          <div className="lg:pr-8">
            <p className={label}>(01) New business</p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className={`${serif} group mt-4 inline-flex items-baseline gap-2 text-3xl italic text-cream transition-colors hover:text-violet-200 sm:text-[2.1rem]`}
            >
              {SITE_EMAIL}
              <span className="not-italic transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

          <div className="lg:border-l lg:border-white/[0.07] lg:px-8">
            <p className={label}>(02) Careers</p>
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className={`${serif} group mt-4 inline-flex items-baseline gap-2 text-3xl italic text-cream/80 transition-colors hover:text-violet-200 sm:text-[2.1rem]`}
            >
              {CAREERS_EMAIL}
            </a>
          </div>

          <div className="lg:border-l lg:border-white/[0.07] lg:px-8">
            <p className={label}>(03) Index</p>
            <ul className="mt-4 space-y-1">
              {nav.map((link, i) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="group flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-cream/30">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`${display} text-xl font-semibold uppercase tracking-tight text-cream/75 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cream`}
                    >
                      <span className="group-hover:hidden">{link.label}</span>
                      <span className={`${serif} hidden text-[1.35em] font-normal normal-case italic tracking-normal text-violet-200 group-hover:inline`}>
                        {link.label}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-white/[0.07] lg:pl-8">
            <p className={label}>(04) Elsewhere</p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm text-cream/60">
              {social.map((link, i) => (
                <li key={link.label} className="flex items-center gap-3">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-cream hover:underline hover:decoration-violet-300 hover:underline-offset-4"
                  >
                    {link.label}
                  </a>
                  {i < social.length - 1 ? <span className="text-cream/20">/</span> : null}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <BearLogo variant="horizontal" size={34} className="brightness-0 invert opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Wordmark */}
      <div className="relative mt-16 select-none overflow-hidden lg:mt-24" aria-label="Bearstow">
        <p
          className={`${display} flex justify-center whitespace-nowrap text-[9.6vw] font-extrabold leading-[0.8] tracking-[-0.04em]`}
        >
          {"BEARSTOW".split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="footer-outline inline-block pb-[0.08em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[0.08em] hover:text-violet-300 hover:[-webkit-text-stroke-color:transparent]"
            >
              {ch}
            </span>
          ))}
        </p>
      </div>

      {/* Base */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 pt-6 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between lg:px-12 lg:pb-[calc(7rem+env(safe-area-inset-bottom,0px))]">
          <p className={label}>&copy; {year} Bearstow Agency</p>
          <ul className="flex gap-5">
            {legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`${label} transition-colors hover:text-cream`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
