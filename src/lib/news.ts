import { workPoster, type WorkMedia } from "@/lib/workMedia";

export type NewsCategory = "Studio" | "Work" | "Process" | "Digital";

export type NewsPost = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  readTime: string;
  excerpt: string;
  media: WorkMedia;
  body: string[];
};

function video(src: string, aspect = "aspect-[4/3]"): WorkMedia {
  return { src, title: "", aspect, poster: workPoster(src) };
}

export const NEWS_CATEGORIES: NewsCategory[] = ["Studio", "Work", "Process", "Digital"];

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "one-year-in-the-den",
    title: "Bearstow after a year of building",
    category: "Studio",
    date: "Sep 2026",
    readTime: "4 min",
    excerpt:
      "Twelve months, a handful of brands we're proud of, and one simple rule we refuse to break: nothing leaves the den until it's ready.",
    media: {
      kind: "image",
      src: "/images/studio/gateway-mark.png",
      poster: "/images/studio/gateway-mark.png",
      title: "Gateway mark",
      aspect: "aspect-video",
    },
    body: [
      "A year ago Bearstow was a name, a blank page and a stubborn idea: that a small studio could make work that feels bigger than its size. Twelve months later, the den is busier than ever.",
      "We've shipped identities, launched websites, cut campaign films and printed more proofs than we'd like to admit. What hasn't changed is the rhythm. We watch first, we gather what matters, and we only move when the idea is strong enough to be felt.",
      "Year two starts now. Bigger briefs, the same patience. If you've got something that deserves a pulse, the door is open.",
    ],
  },
  {
    slug: "brands-that-move-culture",
    title: "Building brands that move culture",
    category: "Studio",
    date: "Aug 2026",
    readTime: "5 min",
    excerpt:
      "Culture doesn't care about your logo. It cares about what you stand for and how consistently you show up. Here's how we build for that.",
    media: video("/videos/works/work-v0-4.mp4"),
    body: [
      "Most brands try to join culture. The ones that last give culture something to talk about. That difference starts long before the first sketch.",
      "We begin every identity with a single question: what would people miss if this brand disappeared tomorrow? The answer becomes the spine of the system, from typography and colour to tone of voice and motion.",
      "When the spine is right, every touchpoint gets easier. Campaigns feel related without being repetitive, and the brand earns the right to take risks.",
    ],
  },
  {
    slug: "campaign-systems-for-wellness",
    title: "New campaign systems for wellness",
    category: "Work",
    date: "Jul 2026",
    readTime: "3 min",
    excerpt:
      "Wellness is a crowded shelf of soft pastels and sans serifs. We built a campaign system that's loud, hand-made and impossible to scroll past.",
    media: video("/videos/works/work-v0-5.mp4"),
    body: [
      "The category was drowning in calm. So we went the other way: marker scribbles, risograph textures and copy that talks like a friend, not a clinic.",
      "The system scales from a single story frame to full out-of-home, with a kit of textures and type rules the in-house team can run with on their own.",
      "Early numbers are promising, but the best feedback so far came from the team itself: it finally feels like them.",
    ],
  },
  {
    slug: "prototype-in-motion",
    title: "Why we prototype in motion first",
    category: "Process",
    date: "Jun 2026",
    readTime: "4 min",
    excerpt:
      "A static frame can lie. Movement tells you straight away whether an idea has rhythm, weight and personality.",
    media: video("/videos/works/work-v0-3.mp4"),
    body: [
      "Brands live on screens that move, so we test them there first. Before a single guideline page exists, we build rough loops to see how the idea behaves.",
      "Does the mark hold up at speed? Does the type breathe or panic? Does the colour still work when it's only on screen for half a second?",
      "Motion prototypes save weeks of polishing the wrong direction. They also make presentations far more honest: clients feel the brand instead of imagining it.",
    ],
  },
  {
    slug: "designing-for-unseen-screens",
    title: "Designing for the screen you can't see yet",
    category: "Digital",
    date: "May 2026",
    readTime: "6 min",
    excerpt:
      "Watches, dashboards, headsets, billboards. We design digital systems that stay recognisable wherever they end up.",
    media: video("/videos/works/work-1080.mp4"),
    body: [
      "Every brand we launch will eventually appear somewhere we never designed for. The only way to prepare is to design principles, not just pages.",
      "We define how the system scales, what it keeps when space runs out and what it can let go of. A good digital identity knows its own minimum.",
      "The result is a brand that feels at home on a phone lock screen and on a fifty-metre screen alike, without anyone redrawing it from scratch.",
    ],
  },
  {
    slug: "natured-headlines",
    title: "Natured Headlines: a poster series",
    category: "Work",
    date: "Apr 2026",
    readTime: "2 min",
    excerpt:
      "A self-initiated series about how close you can get to nature before it stops looking natural. Macro lenses, micro type.",
    media: video("/videos/works/work-480x678-b.mp4", "aspect-[480/678]"),
    body: [
      "Natured Headlines started as a lunchtime experiment and turned into a small obsession: shoot something organic so close that it becomes abstract, then let typography bring it back to earth.",
      "Each poster pairs a macro loop with a whisper of type, mirrored and rotated so the frame reads differently from every angle.",
      "Side projects like this keep the den sharp. Some of the techniques are already finding their way into client work.",
    ],
  },
];

export function getNewsPost(slug: string) {
  return NEWS_POSTS.find((p) => p.slug === slug);
}
