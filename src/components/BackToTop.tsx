"use client";

export default function BackToTop({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group inline-flex items-center gap-2 text-sm text-cream/55 transition-colors hover:text-cream ${className}`}
    >
      Back to top
      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-white/40 group-hover:bg-white group-hover:text-ink">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
