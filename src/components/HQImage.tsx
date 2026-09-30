import type { ImageProps } from "next/image";
import Image from "next/image";

/**
 * Site-wide image: quality 100 + AVIF/WebP (via next.config).
 * On-screen sharpness matches source; bytes drop via responsive `sizes`.
 */
export default function HQImage({ quality = 100, ...props }: ImageProps) {
  return <Image quality={quality} {...props} />;
}
