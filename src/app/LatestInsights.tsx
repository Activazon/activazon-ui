import { MdxFrontMatter } from "@/app/blog/lib/mdx";
import Link from "next/link";

const LatestInsights = ({ posts }: { posts: MdxFrontMatter[] }) => {
  const post = posts?.[0];

  if (!post) {
    return null;
  }
  return (
    <section className="w-full mt-10 px-4 md:px-0">
      <h2 className="text-2xl font-semibold text-white">Latest Insights</h2>
      <div className="mt-4 space-y-3">
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group block"
        >
          <div className="p-4 bg-white/5 hover:bg-[#00A3FF]/20 rounded-lg transition duration-200 border border-white/5">
            <h3 className="text-lg font-medium text-white group-hover:text-[#00A3FF]">
              {post.title}
            </h3>
            <p className="text-sm text-white/60">{post.excerpt}</p>
          </div>
        </Link>
      </div>
      <Link href="/blog">
        <p className="text-[#00A3FF] underline decoration-[#00A3FF]/50 hover:decoration-[#00A3FF] transition-all duration-200 underline-offset-4 text-sm mt-3">
          View all blog posts →
        </p>
      </Link>
    </section>
  );
};

export default LatestInsights;
