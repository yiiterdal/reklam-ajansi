"use client";

import { useEffect, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

type DesignOpenIntroProps = {
  onDone: () => void;
};

/**
 * Plays the exact opening from the reference video (first ~2.8s),
 * then fades into the live page. Closest match to "videodaki gibi".
 */
export default function DesignOpenIntro({ onDone }: DesignOpenIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setVisible(false);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        v.currentTime = 0;
        await v.play();
      } catch {
        // Autoplay blocked — skip to live page
        finish();
      }
    };

    tryPlay();

    const onTime = () => {
      // Cut as the recording reaches the clean white site state
      if (v.currentTime >= 2.55) finish();
    };
    const onEnd = () => finish();

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);

    // Hard fallback
    const timer = window.setTimeout(finish, 3200);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <m.div
          key="design-open"
          className="fixed inset-0 z-[80] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            ref={videoRef}
            src="/videos/design-open.mp4"
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            aria-hidden
          />

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 right-8 z-10 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition hover:bg-black/60"
          >
            Skip
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
