import { Metadata } from "next";
import { getMdxContent } from "@/app/blog/lib/mdx";
import { format } from "date-fns";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getMdxContent(slug);

  const image = metadata.image
    ? `https://activazon.com/${metadata.image}`
    : "https://activazon.com/og-image.png";

  return {
    title: metadata.title + " (Activazon)",
    description: metadata.og_description || metadata.excerpt,
    openGraph: {
      title: metadata.og_title || metadata.title,
      description: metadata.og_description || metadata.excerpt,
      images: [{ url: image }],
      type: "article",
      publishedTime: metadata.date,
      authors: [metadata.author],
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.og_title || metadata.title,
      description: metadata.og_description || metadata.excerpt,
      images: [image],
    },
  };
}

export default async function RemoteMdxPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { metadata, content } = await getMdxContent(slug);

  const image = metadata.image
    ? `https://activazon.com/${metadata.image}`
    : "https://activazon.com/og-image.png";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    image: image,
    datePublished: metadata.date,
    dateModified: metadata.date,
    author: {
      "@type": "Person",
      name: metadata.author,
      url: metadata.author_profile,
    },
    publisher: {
      "@type": "Organization",
      name: "Activazon",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    description: metadata.og_description || metadata.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://activazon.com/blog/${metadata.slug}`,
    },
  };

  return (
    <div className="px-4 md:px-0 w-full max-w-[1000px] mx-auto">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Title */}
      <div className="mt-12 mb-6">
        <h1 className="md:inline text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {metadata.title}
        </h1>
        <p className="md:ml-3 md:inline text-2xl md:text-3xl tracking-tight text-white/80 leading-tight">
          {metadata.sub_title}
        </p>

        {/* Metadata Section */}
        <div className="flex items-center text-white/60 text-sm mt-3 space-x-3">
          <p>{format(new Date(metadata.date), "MMMM d, yyyy")}</p>
          <span className="h-4 w-[1px] bg-white/20"></span> {/* Divider */}
          <a
            href={metadata.author_profile}
            target="_blank"
            className="text-[#00A3FF] underline decoration-[#00A3FF]/50 hover:decoration-[#00A3FF] transition-all duration-200 underline-offset-4"
          >
            {metadata.author}
          </a>
        </div>
      </div>

      {/* MDX Content */}
      {content}
      {/* <MDXRemote components={MDX_COMPONENTS} source={content} /> */}
    </div>
  );
}
