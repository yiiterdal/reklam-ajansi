"use client";

import VisualsComposition from "@/components/VisualsComposition";
import type { WorkMedia } from "@/lib/workMedia";

export default function VisualsGallery({ items }: { items: WorkMedia[] }) {
  return <VisualsComposition items={items} />;
}
