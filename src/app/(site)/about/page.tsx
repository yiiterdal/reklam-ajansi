import type { Metadata } from "next";
import AboutStudio from "@/components/AboutStudio";

export const metadata: Metadata = {
  title: "About Us: Our Story, Services & Approach",
  description:
    "Who is Bearstow? From Old English stōw, a place: the bear's den, where ideas are raised until they're ready. Our story, manifesto, five crafts and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStudio />
    </main>
  );
}
