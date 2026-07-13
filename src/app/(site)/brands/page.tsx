import type { Metadata } from "next";
import BrandsVideoHero from "@/components/BrandsVideoHero";
import BrandsSection from "@/components/BrandsSection";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Branding, strategy, web design, digital marketing, and social media — brands we partner with.",
};

export default function BrandsPage() {
  return (
    <main className="bg-white">
      <BrandsVideoHero />
      <BrandsSection />
    </main>
  );
}
