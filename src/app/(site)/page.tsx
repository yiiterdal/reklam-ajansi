import Link from "next/link";
import ScrollWorkShowcase from "@/components/ScrollWorkShowcase";
import BrandsSection from "@/components/BrandsSection";
import ServicesMarquee, { ServicesIntro } from "@/components/ServicesMarquee";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="bg-white">
      <ScrollWorkShowcase />
      <section className="border-t border-gray-200 bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <ScrollReveal as="h2" className="font-[family-name:var(--font-display)] text-3xl font-bold text-black lg:text-4xl">
              Our Brands
            </ScrollReveal>
            <Link
              href="/brands"
              className="text-sm font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-60"
            >
              View all →
            </Link>
          </div>
        </div>
      </section>
      <BrandsSection
        showIntro={false}
        showTitle={false}
        limit={8}
        showMarquee={false}
        showComingSoon={false}
      />
      <ServicesMarquee />
      <ServicesIntro />
      <section className="bg-black px-6 py-20 text-white lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Studio Careers
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold lg:text-5xl">
              We&apos;re looking for the best
              <br />
              We&apos;re looking for you!
            </h2>
          </ScrollReveal>
          <Link
            href="/contact"
            className="mt-10 inline-block border border-white px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors hover:bg-white hover:text-black"
          >
            Career opportunities
          </Link>
        </div>
      </section>
    </main>
  );
}
