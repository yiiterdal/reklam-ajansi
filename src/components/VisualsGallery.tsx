"use client";

import dynamic from "next/dynamic";
import type { WorkMedia } from "@/lib/workMedia";

const VisualsComposition = dynamic(
  () => import("@/components/VisualsComposition"),
  {
    ssr: false,
    loading: () => <div className="min-h-[100svh] bg-[#101010]" aria-hidden />,
  },
);

export default function VisualsGallery({ items }: { items: WorkMedia[] }) {
  return <VisualsComposition items={items} />;
}
