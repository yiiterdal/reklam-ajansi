"use client";

import WaterRippleWordmark from "@/components/WaterRippleWordmark";

export default function WordmarkPreview() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-white">
      <WaterRippleWordmark
        src="/images/bearstow-glass-wordmark.png"
        alt="bearstow"
        fillViewport
        className="absolute inset-0 h-full w-full"
      />
    </main>
  );
}
