"use client";

import { m } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      aria-hidden
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
        Scroll
      </span>
      <div className="relative h-10 w-5 rounded-full border border-white/30">
        <m.div
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/70"
        />
      </div>
    </m.div>
  );
}
