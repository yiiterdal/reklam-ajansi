import type { Metadata } from "next";
import AboutStudio from "@/components/AboutStudio";

export const metadata: Metadata = {
  title: "About Us: Our Story, Services & Approach",
  description:
    "Meet Bearstow, an independent creative studio where strategy, design and motion meet. Our story, our five crafts and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStudio />
    </main>
  );
}
