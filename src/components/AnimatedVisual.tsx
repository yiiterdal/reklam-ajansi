"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { gradientForIndex } from "@/lib/visuals";

type AnimatedVisualProps = {
  src: string;
  alt?: string;
  index?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function AnimatedVisual({
  src,
  alt = "",
  index = 0,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, 50vw",
}: AnimatedVisualProps) {
  const gradient = gradientForIndex(index);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <m.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.12, 1], x: ["0%", "-2%", "0%"], y: ["0%", "1.5%", "0%"] }}
        transition={{ duration: 18 + (index % 5), repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={sizes}
        />
      </m.div>

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} mix-blend-soft-light`}
      />

      <m.div
        className="pointer-events-none absolute -inset-1 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(255,180,120,0.35), transparent 45%), radial-gradient(circle at 70% 60%, rgba(80,200,180,0.3), transparent 40%)",
        }}
        animate={{ opacity: [0.35, 0.7, 0.35], rotate: [0, 8, 0] }}
        transition={{ duration: 10 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="animate-shimmer pointer-events-none absolute inset-0" />
    </div>
  );
}
