import type { Metadata } from "next";
import WorkVideoGrid, { PageMediaHero } from "@/components/WorkVideoGrid";
import { PORTFOLIO_WORK } from "@/lib/workMedia";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected motion, brand films, and campaign loops from Bearstow — including Tatra House and recent studio work.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <PageMediaHero
        label="Selected work"
        title="Work that moves."
        description="Brand films, identity loops, and social cuts — built for real-world brands that want culture to notice."
        ctaHref="/contact"
        ctaLabel="Start a project"
      />
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto mb-8 max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
            Studio archive
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <WorkVideoGrid items={PORTFOLIO_WORK} />
        </div>
      </section>
    </main>
  );
}
