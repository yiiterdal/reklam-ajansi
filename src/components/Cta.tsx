import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";

export default function Cta() {
  return (
    <section className="border-t border-cream-dark bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="animate-fade-up relative overflow-hidden border border-cream-dark bg-cream px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            aria-hidden
          >
            <Image
              src={images.decor.grainLavender}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
              loading="lazy"
            />
          </div>

          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-muted">
              We welcome new projects
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-snug text-ink lg:text-5xl">
              Are you building an
              <span className="italic"> ambitious brand?</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted lg:text-lg">
              Tell us about your goals. We&apos;ll explore how insight-led creative
              can help you grow.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-accent"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
