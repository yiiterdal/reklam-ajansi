"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <m.div
        className="rounded-full blur-3xl"
        animate={{
          width: hovering ? 260 : 170,
          height: hovering ? 260 : 170,
          opacity: hovering ? 0.32 : 0.16,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(192,38,211,0.3) 45%, transparent 70%)",
        }}
      />
    </m.div>
  );
}
