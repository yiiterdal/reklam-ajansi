import type { Metadata } from "next";
import ServicesStudio from "@/components/ServicesStudio";

export const metadata: Metadata = {
  title: "Services: Branding, Web Design, Content & Motion",
  description:
    "Brand strategy and identity, websites and UI, campaign content, motion design and print. Five crafts from one creative studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesStudio />
    </main>
  );
}
