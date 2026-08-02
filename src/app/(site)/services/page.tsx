import type { Metadata } from "next";
import ServicesStudio from "@/components/ServicesStudio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, digital, content, motion, and print — craft across every surface.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#1c1c1c]">
      <ServicesStudio />
    </main>
  );
}
