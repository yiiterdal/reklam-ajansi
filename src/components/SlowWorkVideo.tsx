"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  className?: string;
  /** Default 0.5 — cinematic slow playback */
  rate?: number;
  poster?: string;
};

/**
 * Slow muted loop. Plays only while near/in viewport to cut decode cost.
 * Poster keeps cards readable before the first frame decodes.
 */
export default function SlowWorkVideo({
  src,
  className = "",
  rate = 0.5,
  poster,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    const applyRate = () => {
      if (Math.abs(v.playbackRate - rate) > 0.01) v.playbackRate = rate;
    };

    const play = () => {
      applyRate();
      void v.play().catch(() => {});
    };

    const pause = () => {
      v.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          if (v.readyState < 2) v.load();
          play();
        } else {
          pause();
        }
      },
      { rootMargin: "30% 0px", threshold: 0.01 },
    );
    io.observe(v);

    v.addEventListener("loadeddata", applyRate);
    v.addEventListener("ratechange", applyRate);
    v.addEventListener("playing", applyRate);

    return () => {
      io.disconnect();
      v.removeEventListener("loadeddata", applyRate);
      v.removeEventListener("ratechange", applyRate);
      v.removeEventListener("playing", applyRate);
      pause();
    };
  }, [src, rate]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      disablePictureInPicture
    />
  );
}
