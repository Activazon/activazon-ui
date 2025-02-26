import type { MetadataRoute } from "next";
import { getAllMdxMetadata } from "../lib/mdx";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://activazon.com";

  // Fetch all blog posts
  const posts = await getAllMdxMetadata();

  // Static pages
  const staticPages = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },

    { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
    // { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    // { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  ];

  // Format static pages
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency:
      page.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: page.priority,
  }));

  // Format blog posts
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Return combined sitemap
  return [...staticUrls, ...blogUrls];
}
