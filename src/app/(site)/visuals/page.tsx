import type { Metadata } from "next";
import VisualsGallery from "@/components/VisualsGallery";
import { VISUALS_WORK } from "@/lib/workMedia";

export const metadata: Metadata = {
  title: "Visuals: Motion & Design Library",
  description:
    "Motion studies, brand textures and visual experiments from the Bearstow creative library.",
  alternates: { canonical: "/visuals" },
};

export default function VisualsPage() {
  return (
    <main className="bg-white">
      <VisualsGallery items={VISUALS_WORK} />
    </main>
  );
}
