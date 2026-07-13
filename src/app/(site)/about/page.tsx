import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import Approach from "@/components/Approach";
import Stats from "@/components/Stats";
import Diversity from "@/components/Diversity";

export const metadata: Metadata = {
  title: "About",
  description:
    "A new-generation communications agency — integrated communications, strategy, and creative solutions.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <HomeHero />
      <section className="border-t border-gray-200 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-black sm:text-3xl lg:text-[2rem]">
            We are a new-generation communications agency born in the digital age.
            <br className="hidden sm:block" />
            We use every traditional and digital communication method
            <br className="hidden sm:block" />
            to deliver integrated communications.
          </h2>
        </div>
      </section>
      <Approach />
      <Stats />
      <Diversity />
    </main>
  );
}
