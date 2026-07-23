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
 * dirtverse.co Section Carousel — CSS 3D ring (live Framer props):
 * ballSize 800 · perspective 800 · radius 800 · lockBallSize
 * effective ball = 800 * (perspective/1200) ≈ 533 @ desktop
 * 10 faces (5 orbs × 2) · mouse tilt ±5°/±3° · drag 0.5 · bob -10px
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

/** Same as dirtverse: 5 unique + 5 duplicate = 10 faces on the ring */
const ITEMS = [...ORBS, ...ORBS];
const ANGLE_STEP = 360 / ITEMS.length;

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

/**
 * Match the reference frame: edge orbs ~55–60% of viewport height,
 * heavily cropped left/right — dirtverse effective ball ≈ 533 @ 1440×900.
 */
function measureLayout(w: number, h: number): Layout {
  const baseBall = DIRT.ballSize * (DIRT.perspective / 1200); // ≈533.3
  const targetByH = h * 0.58;
  const targetByW = w * 0.37;
  const target = Math.min(targetByH, targetByW);
  const scale = Math.max(0.55, Math.min(1.4, target / baseBall));

  const perspective = Math.round(DIRT.perspective * scale);
  const radius = Math.round(DIRT.radius * scale);
  // lockBallSize formula from dirtverse source
  const ball = Math.round(DIRT.ballSize * Math.max(0.2, perspective / 1200));
  return { radius, perspective, ball };
}

const DEFAULT_LAYOUT = measureLayout(1440, 900);

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
      setLayout(measureLayout(window.innerWidth, window.innerHeight));
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // dirtverse entry: start expanded (r*1.8 @ rotateY 270), settle to r @ 180
    const { radius: r } = measureLayout(window.innerWidth, window.innerHeight);
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
      className="dirt-orb-carousel relative h-[100svh] w-full select-none"
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
