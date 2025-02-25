import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDX_COMPONENTS } from "@/lib/mdx-components";
import { getMdxContent } from "@/lib/mdx-files";
import { format } from "date-fns";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { metadata } = await getMdxContent(params.slug);

  return {
    title: metadata.title + " (Activazon)",
    description: metadata.og_description || metadata.excerpt,
    openGraph: {
      title: metadata.og_title || metadata.title,
      description: metadata.og_description || metadata.excerpt,
      images: [{ url: metadata.image }],
      type: "article",
      publishedTime: metadata.date,
      authors: [metadata.author],
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.og_title || metadata.title,
      description: metadata.og_description || metadata.excerpt,
      images: [metadata.image],
    },
  };
}

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  const { metadata, content } = await getMdxContent(params.slug);

  return (
    <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">
      {/* Title */}
      <div className="mt-12 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {metadata.title}
        </h1>

        {/* Metadata Section */}
        <div className="flex items-center text-white/80 mt-3 space-x-3 font-medium">
          <p>{format(new Date(metadata.date), "MMMM d, yyyy")}</p>
          <span className="h-4 w-[1px] bg-white/20"></span> {/* Divider */}
          <p>{metadata.author}</p>
        </div>
      </div>

      {/* MDX Content */}
      <MDXRemote components={MDX_COMPONENTS} source={content} />
    </div>
  );
}
