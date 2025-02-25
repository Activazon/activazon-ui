import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { MDX_COMPONENTS } from "@/lib/mdx-components";

export type MdxFrontMatter = {
  title: string;
  date: string; // Format: YYYY-MM-DD
  author: string;
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

export default async function RemoteMdxPage() {
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const slug = "test-test";
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  const fileContnet = await fs.readFile(filePath);

  const { data, content } = matter(fileContnet);
  const seo = data as MdxFrontMatter;

  return (
    <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">
      <MDXRemote components={MDX_COMPONENTS} source={content} />
    </div>
  );
}
