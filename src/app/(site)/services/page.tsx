import type { Metadata } from "next";
import ServicesMarquee, { ServicesIntro } from "@/components/ServicesMarquee";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, strategy, web design, digital marketing, e-commerce, and social media management.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white pt-28 lg:pt-36">
      <section className="px-6 pb-12 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Our services
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold text-black lg:text-5xl">
            What We Do
          </h1>
        </div>
      </section>
      <ServicesMarquee />
      <ServicesIntro />
      <Process />
    </main>
  );
}
