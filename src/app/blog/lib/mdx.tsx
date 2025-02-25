import path from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { MDX_COMPONENTS } from "./components";
import remarkGfm from "remark-gfm";

export type MdxFrontMatter = {
  title: string;
  sub_title: string;
  date: string; // Format: YYYY-MM-DD
  author: string;
  author_profile: string;
  excerpt: string;
  slug: string;
  tags: string[];
  category: string;
  image?: string; // Path to the preview image
  og_title: string;
  og_description: string;
  reading_time: number; // Estimated reading time in minutes
  published: boolean;
};

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, "utf-8");

  const { frontmatter: metadata, content } = await compileMDX<MdxFrontMatter>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: MDX_COMPONENTS,
  });

  return { metadata, content };
}

export async function getAllMdxMetadata(): Promise<MdxFrontMatter[]> {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir); // Get all filenames

  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const metadataList = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(".mdx", "");
      const { metadata } = await getMdxContent(slug);

      return { ...metadata, slug } as MdxFrontMatter;
    })
  );

  return metadataList
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
