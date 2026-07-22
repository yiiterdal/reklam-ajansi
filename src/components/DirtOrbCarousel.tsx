"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * dirtverse.co Section Carousel — true CSS 3D ring:
 * perspective 800 · radius 800 · ball ~533 · mouse tilt ±5°/±3° · drag · bob
 */

const ORBS = [
  {
    label: "Dirt Brand",
    src: "/images/dirtverse/orbs-webm/world1-dirt-logo.webm",
    poster: "/images/dirtverse/orbs-webm/poster1.png",
  },
  {
    label: "Organic Flower",
    src: "/images/dirtverse/orbs-webm/world4-flower.webm",
    poster: "/images/dirtverse/orbs-webm/poster2.png",
  },
  {
    label: "Liquid Gradient",
    src: "/images/dirtverse/orbs-webm/world2-liquid.webm",
    poster: "/images/dirtverse/orbs-webm/poster3.png",
  },
  {
    label: "Plant Lilac",
    src: "/images/dirtverse/orbs-webm/world5-plant.webm",
    poster: "/images/dirtverse/orbs-webm/poster4.png",
  },
  {
    label: "Microorganism",
    src: "/images/dirtverse/orbs-webm/world3-microorganism.webm",
    poster: "/images/dirtverse/orbs-webm/poster5.png",
  },
] as const;

const ITEMS = [...ORBS, ...ORBS];
const ANGLE_STEP = 360 / ITEMS.length;

/** Live dirtverse desktop values (from SSR / Framer component). */
const DIRT = {
  radius: 800,
  perspective: 800,
  ballSize: 800,
  dragSensitivity: 0.5,
  tiltX: 5,
  tiltY: 3,
} as const;

type Layout = {
  radius: number;
  perspective: number;
  ball: number;
};

function measureLayout(w: number): Layout {
  // Scale the dirtverse desktop pack (~1440-wide) down on smaller viewports.
  const scale = Math.min(1.15, Math.max(0.42, w / 1440));
  const perspective = Math.round(DIRT.perspective * scale);
  const radius = Math.round(DIRT.radius * scale);
  const ball = Math.round(DIRT.ballSize * Math.max(0.2, perspective / 1200));
  return { radius, perspective, ball };
}

const DEFAULT_LAYOUT = measureLayout(1440);

function OrbFace({
  orb,
  index,
  angleStep,
  radiusMV,
  visible,
}: {
  orb: (typeof ORBS)[number];
  index: number;
  angleStep: number;
  radiusMV: MotionValue<number>;
  visible: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transformOrigin = useTransform(radiusMV, (r) => `50% 50% ${r}px`);
  const translateZ = useTransform(radiusMV, (r) => -r);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible]);

  return (
    <motion.div
      aria-label={orb.label}
      role="img"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + index * 0.04 }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        rotateY: index * -angleStep,
        transformOrigin,
        translateZ,
        backfaceVisibility: "hidden",
        overflow: "hidden",
        borderRadius: 999,
        userSelect: "none",
        contain: "layout style paint",
      }}
    >
      <div
        className="dirt-c3d-bob"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          animationDelay: `${1.2 + index * 0.08}s`,
          animationDuration: `${2.8 + index * 0.08}s`,
        }}
      >
        <video
          ref={videoRef}
          src={orb.src}
          poster={orb.poster}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
            WebkitBackfaceVisibility: "hidden",
          }}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      </div>
    </motion.div>
  );
}

export default function DirtOrbCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const dragRef = useRef({ active: false, x0: 0, rot0: 0 });
  const rafRef = useRef(0);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const isTouch = useMemo(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    [],
  );

  const rotSpring = useMemo(
    () =>
      isTouch
        ? { stiffness: 28, damping: 22 }
        : { stiffness: 35, damping: 24 },
    [isTouch],
  );
  const radiusSpring = useMemo(
    () =>
      isTouch
        ? { stiffness: 24, damping: 18 }
        : { stiffness: 30, damping: 20 },
    [isTouch],
  );
  const tiltSpring = useMemo(() => ({ stiffness: 50, damping: 18 }), []);

  const rotation = useMotionValue(270);
  const radiusTarget = useMotionValue(DEFAULT_LAYOUT.radius * 1.8);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const rotationSmooth = useSpring(rotation, rotSpring);
  const radiusSmooth = useSpring(radiusTarget, radiusSpring);
  const tiltXSmooth = useSpring(tiltX, tiltSpring);
  const tiltYSmooth = useSpring(tiltY, tiltSpring);

  useEffect(() => {
    const onResize = () => {
      rectRef.current = null;
      const next = measureLayout(window.innerWidth);
      setLayout(next);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Match dirtverse entry once: start expanded (r*1.8 @ rotateY 270), settle to r @ 180.
    const r = measureLayout(window.innerWidth).radius;
    radiusTarget.set(r * 1.8);
    rotation.set(270);
    const t0 = window.setTimeout(() => {
      radiusTarget.set(r);
      rotation.set(180);
    }, 80);
    const t1 = window.setTimeout(() => setReady(true), 1280);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [radiusTarget, rotation]);

  // Keep radius spring in sync when layout changes after entry.
  useEffect(() => {
    if (!ready) return;
    radiusTarget.set(layout.radius);
  }, [layout.radius, ready, radiusTarget]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onDown = (e: PointerEvent) => {
      if (!ready) return;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      dragRef.current = {
        active: true,
        x0: e.clientX,
        rot0: rotation.get(),
      };
      root.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.active) {
        rotation.set(
          drag.rot0 - (e.clientX - drag.x0) * DIRT.dragSensitivity,
        );
        return;
      }
      if (isTouch || !ready || rafRef.current) return;

      const cx = e.clientX;
      const cy = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        let rect = rectRef.current;
        if (!rect) {
          rect = root.getBoundingClientRect();
          rectRef.current = rect;
        }
        // dirtverse: rotateX ±5°, rotateY ±3° from cursor in container
        const ny = (cy - rect.top) / rect.height;
        const nx = (cx - rect.left) / rect.width;
        tiltX.set(-(ny * 2 - 1) * DIRT.tiltX);
        tiltY.set(-(nx * 2 - 1) * DIRT.tiltY);
      });
    };

    const onUp = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      root.style.cursor = ready ? "grab" : "default";
    };

    const onLeave = () => {
      dragRef.current.active = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      tiltX.set(0);
      tiltY.set(0);
      root.style.cursor = ready ? "grab" : "default";
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, isTouch, rotation, tiltX, tiltY]);

  return (
    <div
      ref={rootRef}
      className="dirt-orb-carousel relative h-[90vh] w-full select-none sm:h-screen"
      style={{
        backgroundColor: "#ffffff",
        overflow: "hidden",
        cursor: ready ? "grab" : "default",
        perspective: `${layout.perspective}px`,
        WebkitPerspective: `${layout.perspective}px`,
        perspectiveOrigin: "50% 50%",
        contain: "layout style paint",
        touchAction: "none",
      }}
    >
      <style>{`
        @keyframes __c3db {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .dirt-c3d-bob {
          animation: __c3db ease-in-out infinite;
          width: 100%;
          height: 100%;
          will-change: transform;
        }
      `}</style>

      {/* Mouse tilt layer (rotateX / rotateY) */}
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          rotateX: tiltXSmooth,
          rotateY: tiltYSmooth,
        }}
      >
        {/* Ball stage centered */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: layout.ball,
            height: layout.ball,
            marginLeft: -layout.ball / 2,
            marginTop: -layout.ball / 2,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Drag rotation ring */}
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              rotateY: rotationSmooth,
            }}
          >
            {ITEMS.map((orb, i) => (
              <OrbFace
                key={`${orb.label}-${i}`}
                orb={orb}
                index={i}
                angleStep={ANGLE_STEP}
                radiusMV={radiusSmooth}
                visible={visible}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
