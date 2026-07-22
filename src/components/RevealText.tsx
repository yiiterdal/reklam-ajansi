"use client";

import { m, type Variants } from "framer-motion";
import type { ElementType } from "react";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** "view" reveals when scrolled into view; "mount" reveals immediately (for above-the-fold text). */
  trigger?: "view" | "mount";
};

const wordVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

export default function RevealText({
  text,
  as: Component = "div",
  className = "",
  wordClassName = "",
  delay = 0,
  trigger = "view",
}: RevealTextProps) {
  const words = text.split(" ");
  const viewProps =
    trigger === "view"
      ? {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-10% 0px" },
        }
      : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block overflow-hidden pb-[0.15em] align-bottom ${wordClassName}`}
        >
          <m.span
            className="inline-block will-change-transform"
            variants={wordVariants}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.045,
            }}
            {...viewProps}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </m.span>
        </span>
      ))}
    </Component>
  );
}
