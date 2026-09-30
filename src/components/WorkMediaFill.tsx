"use client";

import HQImage from "@/components/HQImage";
import SlowWorkVideo from "@/components/SlowWorkVideo";
import type { WorkMedia } from "@/lib/workMedia";
import { workPoster } from "@/lib/workMedia";

type Props = {
  item: WorkMedia;
  className?: string;
  priority?: boolean;
  /** Poster prints: contain = full artwork, cover = crop to fill */
  fit?: "contain" | "cover";
  sizes?: string;
  rate?: number;
};

/**
 * Renders a WorkMedia entry at native ratio (parent must set aspect).
 * Stills use max quality; videos use SlowWorkVideo.
 */
export default function WorkMediaFill({
  item,
  className = "",
  priority = false,
  fit = "contain",
  sizes = "(max-width: 768px) 100vw, 50vw",
  rate = 0.45,
}: Props) {
  if (item.kind === "image") {
    return (
      <HQImage
        src={item.src}
        alt={item.title}
        fill
        priority={priority}
        quality={100}
        sizes={sizes}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }

  return (
    <SlowWorkVideo
      src={item.src}
      poster={item.poster ?? workPoster(item.src)}
      rate={rate}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
