import type { Metadata } from "next";
import Link from "next/link";
import ServicesMarquee, { ServicesIntro } from "@/components/ServicesMarquee";
import Process from "@/components/Process";
import { PageMediaHero } from "@/components/WorkVideoGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, strategy, web design, digital marketing, e-commerce, and social media management.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <PageMediaHero
        label="Our services"
        title="What we do"
        description="From brand systems to motion — each craft shows up as work you can feel. See live panels on the home page; process lives here."
        ctaHref="/portfolio"
        ctaLabel="See the work"
      />

      <section className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
          >
            Talk to us
          </Link>
        </div>
      </section>

      <ServicesMarquee />
      <ServicesIntro />
      <Process />
    </main>
  );
}
