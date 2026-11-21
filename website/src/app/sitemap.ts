import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE.url, changeFrequency: "weekly", priority: 1 },
        ...getContent().docs.map((d) => ({
            url: `${SITE.url}${d.href}`,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
    ];
}
