/** Brand-free creative photography & abstract textures — no logos, no product marks */
export const campaignPhotos = [
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
  "/images/pexels-anniroenkae-3222285-a7b2962d-c15f-46aa-9c5e-8b77e0754ba0.png",
  "/images/pexels-chris-f-38966-34034146-2ccc6d5a-8bb7-4267-a5ca-bc89dab50621.png",
  "/images/pexels-diva-30593380-a70e6e85-acdc-4ed5-9db3-a3bee00f8425.png",
  "/images/pexels-diva-30676751-da5c3394-4bab-4081-9e4c-26930c9ac288.png",
  "/images/pexels-ian-panelo-8668767-137d85ce-7e22-4629-81fd-b19ec4cb8d69.png",
  "/images/pexels-james-lee-932763-4383963-b9b09fcc-9bc9-4ffb-acba-09fc34270576.png",
  "/images/pexels-karola-g-5978601-cd6e9f04-9608-485b-aff8-0af3f78ac61f.png",
  "/images/pexels-kseniya-lapteva-93670191-9176085-a98e83e5-2da7-4909-ac3a-52a1fd214673.png",
  "/images/pexels-marina-zasorina-7717503-32129c79-4af1-4587-9509-f77fd4d9dcec.png",
  "/images/pexels-matreding-12008049-7ba78aaa-b32a-4fd2-b3b2-1f2d793d506f.png",
  "/images/pexels-resourceboy-18541754-cd39271a-ad48-4104-bc27-9109fd0c4791.png",
  "/images/pexels-robert-clark-504241532-20133620-b2b27ad4-3b2c-4571-84d7-cb3603c22bdb.png",
  "/images/pexels-robert-clark-504241532-20493203-ce4995c7-27f6-4e7d-9c4f-dcd7e86ba905.png",
  "/images/pexels-wal_-172619-2156618639-35993620-c266343d-27bd-47c0-9f69-ad6ebc4d9174.png",
] as const;

export function photoForIndex(i: number) {
  return campaignPhotos[i % campaignPhotos.length];
}

export const visuals = campaignPhotos;

export function visualForIndex(i: number) {
  return photoForIndex(i);
}

/** Violet-forward overlays matching the Bearstow mark */
export const accentGradients = [
  "from-violet-600/40 via-fuchsia-400/25 to-transparent",
  "from-purple-500/35 via-amber-300/20 to-transparent",
  "from-fuchsia-500/35 via-violet-300/25 to-transparent",
  "from-indigo-500/35 via-rose-300/20 to-transparent",
  "from-violet-400/40 via-orange-300/20 to-transparent",
  "from-purple-600/35 via-pink-300/25 to-transparent",
] as const;

export function gradientForIndex(i: number) {
  return accentGradients[i % accentGradients.length];
}

/** Solid color blocks for hero mosaic — logo palette */
export const mosaicColors = [
  "#7c3aed",
  "#a855f7",
  "#6d28d9",
  "#c026d3",
  "#4c1d95",
  "#e879f9",
  "#f0abfc",
  "#2e1065",
  "#db2777",
  "#f97316",
  "#8b5cf6",
  "#1f1027",
] as const;
