export type WorkMedia = {
  src: string;
  title: string;
  subtitle?: string;
  /** Tailwind aspect class — match the real frame */
  aspect: string;
  span?: string;
  poster?: string;
  /** Still image vs video loop. Default: video */
  kind?: "video" | "image";
};

/** Poster path derived from `/videos/works/foo.mp4` → `/images/works-posters/foo.jpg` */
export function workPoster(src: string): string {
  const base = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "work";
  return `/images/works-posters/${base}.jpg`;
}

function withPoster(item: Omit<WorkMedia, "poster"> & { poster?: string }): WorkMedia {
  if (item.kind === "image") {
    return { ...item, poster: item.poster ?? item.src };
  }
  return { ...item, poster: item.poster ?? workPoster(item.src) };
}

/**
 * Each `src` appears on exactly one surface.
 * When you drop new images/videos, add them to ONE list only.
 */

/** Home — Selected works (large bento — campaign pieces read better here) */
export const HOME_WORK: WorkMedia[] = [
  {
    kind: "image" as const,
    src: "/images/studio/funky-disco.png",
    title: "Funky Disco",
    subtitle: "Poster system",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/videos/works/work-v0-1.mp4",
    title: "Fauna",
    subtitle: "Motion poster",
    aspect: "aspect-[4/5]",
  },
  {
    kind: "image" as const,
    src: "/images/studio/domus-spheres.png",
    title: "Soft Stack",
    subtitle: "3D cover study",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/videos/works/work-720x900.mp4",
    title: "Editorial",
    subtitle: "Campaign loop",
    aspect: "aspect-[4/5]",
  },
  {
    kind: "image" as const,
    src: "/images/studio/miss-me-cat.png",
    title: "Miss Me",
    subtitle: "Risograph print",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/videos/works/work-1080-sq.mp4",
    title: "Digital Age",
    subtitle: "Brand visual",
    aspect: "aspect-[4/5]",
  },
].map(withPoster);

/** Home — Services strip (ambient loops for narrow → expand panels) */
export const HOME_SERVICE_ITEMS: WorkMedia[] = [
  {
    src: "/videos/works/work-540x540.mp4",
    title: "Brand",
    subtitle: "Systems & identity",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-v0-6.mp4",
    title: "Digital",
    subtitle: "Publish / Play UI",
    aspect: "aspect-square",
  },
  {
    kind: "image" as const,
    src: "/images/works/galaxy-traveler.png",
    title: "Content",
    subtitle: "Oddsey",
    aspect: "aspect-[1024/576]",
  },
  {
    src: "/videos/works/work-1280x720.mp4",
    title: "Motion",
    subtitle: "Film & loops",
    aspect: "aspect-video",
  },
  {
    src: "/videos/works/work-1082x720.mp4",
    title: "Print",
    subtitle: "Physical craft",
    aspect: "aspect-[1082/720]",
  },
].map(withPoster);

/** @deprecated use HOME_SERVICE_ITEMS */
export const HOME_SERVICE_VIDEOS = HOME_SERVICE_ITEMS.map((m) => m.src);

/** Home — Articles / news */
export const HOME_ARTICLES: WorkMedia[] = [
  {
    src: "/videos/works/work-v0-4.mp4",
    title: "Building brands that move culture",
    subtitle: "Studio Note",
    aspect: "aspect-[10/7]",
  },
  {
    src: "/videos/works/work-v0-5.mp4",
    title: "New campaign systems for wellness",
    subtitle: "Work",
    aspect: "aspect-[10/7]",
  },
  {
    src: "/videos/works/work-v0-3.mp4",
    title: "Bearstow after a year of building",
    subtitle: "News",
    aspect: "aspect-[10/7]",
  },
].map(withPoster);

/** Work archive — shown on `/` */
export const PORTFOLIO_WORK: WorkMedia[] = [
  {
    src: "/videos/works/work-0.mp4",
    title: "Northline",
    subtitle: "Launch systems for a product-led brand",
    aspect: "aspect-video",
    span: "md:col-span-7",
  },
  {
    src: "/videos/works/work-tatra-v0-6.mp4",
    title: "Signal",
    subtitle: "Generative brand film",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-720x954.mp4",
    title: "Pulse",
    subtitle: "Trust at scale in health",
    aspect: "aspect-[720/954]",
  },
  {
    src: "/videos/works/work-1036x1108.mp4",
    title: "Messi 10",
    subtitle: "Campaign portrait",
    aspect: "aspect-[652/864]",
  },
  {
    src: "/videos/works/work-1080-2.mp4",
    title: "Trail Mark",
    subtitle: "Brand system stills",
    aspect: "aspect-[522/736]",
  },
  {
    src: "/videos/works/work-480x640.mp4",
    title: "Pocket Story",
    subtitle: "Vertical social",
    aspect: "aspect-[480/640]",
  },
  {
    src: "/videos/works/work-480x678.mp4",
    title: "Path Cut",
    subtitle: "Story format",
    aspect: "aspect-[480/678]",
  },
  {
    src: "/videos/works/work-540x960.mp4",
    title: "SabancıDX",
    subtitle: "A digital sanctuary for enterprise craft",
    aspect: "aspect-[9/16]",
  },
  {
    src: "/videos/works/work-v0-2.mp4",
    title: "Year of the Horse",
    subtitle: "Campaign loop",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-v0.mp4",
    title: "Zen",
    subtitle: "Editorial craft for luxury",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-tatra-v0.mp4",
    title: "Tatra House",
    subtitle: "Identity in motion",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-tatra-v0-2.mp4",
    title: "Summit Loop",
    subtitle: "Motion study",
    aspect: "aspect-square",
  },
].map(withPoster);

/**
 * /visuals — new drops only (never reused on Home / Work).
 */
export const VISUALS_WORK: WorkMedia[] = [
  {
    kind: "image" as const,
    src: "/images/works/body-wave.png",
    title: "Body Wave",
    subtitle: "Music events branding",
    aspect: "aspect-[720/900]",
  },
  {
    kind: "image" as const,
    src: "/images/works/stamp-deer.png",
    title: "Folk Mark",
    subtitle: "Archive study",
    aspect: "aspect-[651/782]",
  },
  {
    src: "/videos/works/work-v0-8.mp4",
    title: "Rewind Room",
    subtitle: "Music nights poster",
    aspect: "aspect-[760/948]",
  },
  {
    kind: "image" as const,
    src: "/images/works/wild-rendered.png",
    title: "Wild rendered",
    subtitle: "Still life study",
    aspect: "aspect-[1024/801]",
  },
  {
    kind: "image" as const,
    src: "/images/works/underscores.png",
    title: "underscores",
    subtitle: "Editorial portrait",
    aspect: "aspect-[768/1024]",
  },
  {
    src: "/videos/works/work-1148x720.mp4",
    title: "Wide Cut",
    subtitle: "Campaign frame",
    aspect: "aspect-[1148/720]",
  },
  {
    src: "/videos/works/work-v0-7.mp4",
    title: "Soft Core",
    subtitle: "Identity loop",
    aspect: "aspect-[446/458]",
  },
  {
    src: "/videos/works/work-1080-sq-2.mp4",
    title: "Square Signal",
    subtitle: "Social system",
    aspect: "aspect-square",
  },
  {
    src: "/videos/works/work-v0-9.mp4",
    title: "Pulse Grid",
    subtitle: "Studio loop",
    aspect: "aspect-square",
  },
  {
    kind: "image" as const,
    src: "/images/studio/spiderman-ticket.png",
    title: "Ticket Sketch",
    subtitle: "Found-object comic · 720×990",
    aspect: "aspect-[720/990]",
  },
  {
    kind: "image" as const,
    src: "/images/studio/santoriolo-menu.png",
    title: "Santoriolo",
    subtitle: "Menu system · 480×849",
    aspect: "aspect-[480/849]",
  },
].map(withPoster);

/** Convenience — home + portfolio (already unique between them) */
export const ALL_WORK_VIDEOS = [...HOME_WORK, ...PORTFOLIO_WORK];

/** Dev guard: every src used once across surfaces */
export function assertUniqueMedia() {
  if (process.env.NODE_ENV === "production") return;
  const bags: [string, string[]][] = [
    ["HOME_WORK", HOME_WORK.map((m) => m.src)],
    ["HOME_SERVICE_ITEMS", HOME_SERVICE_ITEMS.map((m) => m.src)],
    ["HOME_ARTICLES", HOME_ARTICLES.map((m) => m.src)],
    ["PORTFOLIO_WORK", PORTFOLIO_WORK.map((m) => m.src)],
    ["VISUALS_WORK", VISUALS_WORK.map((m) => m.src)],
  ];
  const seen = new Map<string, string>();
  for (const [bag, srcs] of bags) {
    for (const src of srcs) {
      const prev = seen.get(src);
      if (prev) throw new Error(`Media reused across ${prev} and ${bag}: ${src}`);
      seen.set(src, bag);
    }
  }
}

assertUniqueMedia();
