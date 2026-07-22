import type { Metadata } from "next";
import Link from "next/link";
import Approach from "@/components/Approach";
import Stats from "@/components/Stats";
import Diversity from "@/components/Diversity";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bearstow is a new-generation communications agency — strategy, design, and motion for real-world brands.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="relative min-h-[78svh] overflow-hidden bg-[#111]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#2a2a2a_0%,#111_55%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#111]/40" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
            About Bearstow
          </p>
          <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-white">
            A creative studio for brands that want culture to notice.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Strategy, design, film, and digital — built as one system so the
            work feels sharp in the world, not just in the deck.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-85"
            >
              See the work
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-white/35 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/70"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl lg:text-[2rem]">
            We are a new-generation communications agency born in the digital age.
            We use every traditional and digital method to deliver integrated
            communications that move people.
          </h2>
        </div>
      </section>

      <Approach />
      <Stats />
      <Diversity />

      <section className="border-t border-black/5 bg-[#f7f7f7] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
              Next
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when you are.
            </h2>
            <p className="mt-4 max-w-md text-base text-black/55">
              Brand launch, campaign world, or ongoing content system — tell us
              what you are building.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-[#ececec] px-5 py-2.5 text-sm font-medium text-black/75 transition hover:bg-[#e0e0e0]"
            >
              Our services
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
