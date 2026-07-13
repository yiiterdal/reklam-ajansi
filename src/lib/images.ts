const CDN = "https://cdn.prod.website-files.com/67e1418031b0a27e1810015c";

export const images = {
  hero: `${CDN}/67e6f4ce2080d0f023b5f955_impact%20hero.webp`,
  texture: `${CDN}/67e2e4c73ba8784080dcb9c5_texture.webp`,
  themes: {
    digital: `${CDN}/67e6ee76d8a89683cdb17141_Climate.webp`,
    brand: `${CDN}/67e6ee76cf9f2e38678c9119_Health.webp`,
    growth: `${CDN}/67e6ee765b3f983d697d0a9c_People.webp`,
  },
  decor: {
    abstractFluid1: "/images/abstract-fluid-1.png",
    abstractFluid2: "/images/abstract-fluid-2.png",
    aerialTealGold: "/images/aerial-teal-gold.png",
    fernMacro: "/images/fern-macro.png",
    fluidTealGold: "/images/fluid-teal-gold.png",
    glowTealOrange: "/images/glow-teal-orange.png",
    grainLavender: "/images/grain-lavender.png",
    leafVariegated: "/images/leaf-variegated.png",
    leafWarm: "/images/leaf-warm.png",
    motionBlur: "/images/motion-blur.png",
    palmLeaf: "/images/palm-leaf.png",
    textureDark: "/images/texture-dark.png",
    verticalOrganic: "/images/vertical-organic.png",
    watercolor: "/images/watercolor.png",
  },
} as const;
