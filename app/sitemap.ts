import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/book`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}
