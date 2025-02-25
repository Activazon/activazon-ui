import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { MDX_COMPONENTS } from "@/lib/mdx-components";

export default async function RemoteMdxPage() {
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const slug = "test-test";
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  const fileContnet = await fs.readFile(filePath);

  const { data, content } = matter(fileContnet);

  console.log("data", data);

  return <MDXRemote components={MDX_COMPONENTS} source={content} />;
}
