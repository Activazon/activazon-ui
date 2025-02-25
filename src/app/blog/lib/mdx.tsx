import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export type MdxFrontMatter = {
  title: string;
  date: string; // Format: YYYY-MM-DD
  author: string;
  author_profile: string;
  excerpt: string;
  slug: string;
  tags: string[];
  category: string;
  image: string; // Path to the preview image
  og_title: string;
  og_description: string;
  reading_time: number; // Estimated reading time in minutes
  published: boolean;
};

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return { metadata: data as MdxFrontMatter, content };
}

export async function getAllMdxMetadata(): Promise<MdxFrontMatter[]> {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir); // Get all filenames

  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const metadataList = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(contentDir, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data } = matter(fileContent);

      return { ...data, slug } as MdxFrontMatter;
    })
  );

  return metadataList
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
