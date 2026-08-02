import type { Metadata } from "next";
import VisualsGallery from "@/components/VisualsGallery";
import { VISUALS_WORK } from "@/lib/workMedia";

export const metadata: Metadata = {
  title: "Visuals",
  description:
    "Motion references and brand textures from the Bearstow creative library.",
};

export default function VisualsPage() {
  return (
    <main className="bg-white">
      <VisualsGallery items={VISUALS_WORK} />
    </main>
  );
}
