import { MdxFrontMatter } from "@/app/blog/lib/mdx";
import Link from "next/link";

const LatestInsights = ({ posts }: { posts: MdxFrontMatter[] }) => {
  const latestPosts = posts?.slice(0, 3); // Get the first 3 posts

  if (!latestPosts || latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-10 px-4 md:px-0">
      <h2 className="text-2xl font-semibold text-white">Latest Insights</h2>
      <div className="mt-4 space-y-3">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="p-4 bg-white/5 hover:bg-[#00A3FF]/20 rounded-lg transition duration-200 border border-white/5">
              <div className="mb-2 text-white group-hover:text-[#00A3FF] transition-all">
                <h3 className="inline text-lg font-medium">{post.title}</h3>
                <p className="ml-1.5 inline opacity-80">{post.sub_title}</p>
              </div>
              <p className="text-sm text-white/60">{post.excerpt}</p>
            </div>
          </Link>
        ))}
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
