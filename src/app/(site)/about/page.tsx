import type { Metadata } from "next";
import AboutStudio from "@/components/AboutStudio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bearstow is a new-generation communications agency — strategy, design, and motion for real-world brands.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStudio />
    </main>
  );
}
