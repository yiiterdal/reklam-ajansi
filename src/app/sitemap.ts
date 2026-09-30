import type { MetadataRoute } from "next";
import { brands } from "@/lib/brands";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.9, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/portfolio", priority: 0.8, freq: "weekly" },
    { path: "/brands", priority: 0.7, freq: "monthly" },
    { path: "/visuals", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...brands.map((b) => ({
      url: `${SITE_URL}/brands/${b.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
