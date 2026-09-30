import type { Metadata } from "next";
import BrandsStudio from "@/components/BrandsStudio";

export const metadata: Metadata = {
  title: "Our Brands: Clients & Partners",
  description:
    "Brands we build with: branding, strategy, websites and campaign work for clients across industries.",
  alternates: { canonical: "/brands" },
};

export default function BrandsPage() {
  return (
    <main className="bg-white">
      <BrandsStudio />
    </main>
  );
}
