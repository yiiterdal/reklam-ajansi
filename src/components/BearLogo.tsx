"use client";

import HQImage from "@/components/HQImage";

const variants = {
  icon: { src: "/images/brand/icon.png", ratio: 1 },
  horizontal: { src: "/images/brand/logo-wordmark.png", ratio: 1380 / 531 },
  stacked: { src: "/images/brand/logo-stacked.png", ratio: 777 / 900 },
  emblem: { src: "/images/brand/logo-emblem.png", ratio: 900 / 828 },
  monogram: { src: "/images/brand/logo-monogram.png", ratio: 780 / 900 },
} as const;

export type BearLogoVariant = keyof typeof variants;

type BearLogoProps = {
  /** Height in px (width follows each mark’s aspect ratio). */
  size?: number;
  variant?: BearLogoVariant;
  className?: string;
  priority?: boolean;
};

/** Official Bearstow marks from the brand identity sheet. */
export default function BearLogo({
  size = 40,
  variant = "icon",
  className = "",
  priority = false,
}: BearLogoProps) {
  const { src, ratio } = variants[variant];
  const width = Math.round(size * ratio);

  return (
    <HQImage
      src={src}
      alt="Bearstow"
      width={width}
      height={size}
      priority={priority}
      className={`shrink-0 object-contain ${className}`}
      sizes={`${width}px`}
    />
  );
}
