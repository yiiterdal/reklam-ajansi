"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <m.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </m.div>
    </div>
  );
}
