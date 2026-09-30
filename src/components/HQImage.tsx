import type { ImageProps } from "next/image";
import Image from "next/image";

/**
 * Site-wide image. next.config serves originals unoptimized, so the file
 * on disk is exactly what the browser gets.
 */
export default function HQImage({ quality = 100, ...props }: ImageProps) {
  return <Image quality={quality} {...props} />;
}
