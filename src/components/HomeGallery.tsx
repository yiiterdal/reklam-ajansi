"use client";

import dynamic from "next/dynamic";

const CircleGallery = dynamic(() => import("@/components/CircleGallery"), {
  ssr: false,
  loading: () => <div className="min-h-[60vh] bg-white" aria-hidden />,
});

export default function HomeGallery() {
  return <CircleGallery />;
}
