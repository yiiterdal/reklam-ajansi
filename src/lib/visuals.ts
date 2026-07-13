/** Colorful abstract visuals — not brand/product photography */
export const visuals = [
  "/images/abstract-fluid-1.png",
  "/images/abstract-fluid-2.png",
  "/images/aerial-teal-gold.png",
  "/images/fluid-teal-gold.png",
  "/images/glow-teal-orange.png",
  "/images/grain-lavender.png",
  "/images/leaf-variegated.png",
  "/images/leaf-warm.png",
  "/images/motion-blur.png",
  "/images/fern-macro.png",
  "/images/palm-leaf.png",
  "/images/watercolor.png",
  "/images/vertical-organic.png",
  "/images/texture-dark.png",
] as const;

export function visualForIndex(i: number) {
  return visuals[i % visuals.length];
}

export const accentGradients = [
  "from-teal-500/40 via-amber-300/30 to-transparent",
  "from-orange-400/35 via-rose-300/25 to-transparent",
  "from-emerald-400/40 via-cyan-300/25 to-transparent",
  "from-violet-400/35 via-fuchsia-300/25 to-transparent",
  "from-sky-400/40 via-lime-300/25 to-transparent",
  "from-amber-400/40 via-teal-300/30 to-transparent",
] as const;

export function gradientForIndex(i: number) {
  return accentGradients[i % accentGradients.length];
}
