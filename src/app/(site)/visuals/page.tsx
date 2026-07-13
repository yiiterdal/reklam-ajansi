import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Visuals",
  description: "Brand textures and visual references from the Studio creative library.",
};

export default function VisualsPage() {
  return (
    <main>
      <PageHero
        label="Visual library"
        title="Our visual world"
        description="Textures, colors, and references that shape our creative direction."
        image={images.decor.watercolor}
      />
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
