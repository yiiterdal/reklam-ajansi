import type { Metadata } from "next";
import BrandsStudio from "@/components/BrandsStudio";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Partners we build with — branding, strategy, web, and campaign worlds.",
};

export default function BrandsPage() {
  return (
    <main className="bg-white">
      <BrandsStudio />
    </main>
  );
}
