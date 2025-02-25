import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "How AI is Transforming Real Estate Analysis",
    excerpt:
      "Discover how AI is revolutionizing real estate, from property valuation to predictive market trends.",
    slug: "ai-real-estate-analysis",
    date: "Feb 24, 2025",
  },
  {
    id: 2,
    title: "Top 5 Neighborhood Trends to Watch in 2025",
    excerpt:
      "Stay ahead with insights on the latest development and investment trends shaping communities.",
    slug: "neighborhood-trends-2025",
    date: "Jan 15, 2025",
  },
  {
    id: 3,
    title: "Crime & Safety Insights: What Data Tells Us",
    excerpt:
      "Learn how crime patterns influence real estate decisions and neighborhood planning.",
    slug: "crime-safety-insights",
    date: "Dec 10, 2024",
  },
  {
    id: 4,
    title: "The Future of Smart Cities & AI",
    excerpt:
      "Explore how AI is shaping the future of urban planning and smart infrastructure.",
    slug: "smart-cities-ai",
    date: "Nov 5, 2024",
  },
  {
    id: 5,
    title: "How Local Policy Impacts Real Estate Investments",
    excerpt:
      "Learn how zoning laws and policy changes can affect market opportunities.",
    slug: "local-policy-real-estate",
    date: "Oct 22, 2024",
  },
];

export default function BlogIndex() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center px-5 md:px-10">
      {/* New Header */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-start mt-16 md:mt-32 md:mb-5">
        <div className="w-full md:w-auto">
          <h1 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
            Activazon Blog
          </h1>
          <p className="text-white/70 text-lg mt-2 max-w-lg">
            AI-powered insights on real estate, development, and community
            trends.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-full max-w-[1200px] mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="w-full bg-white/[0.05] border border-white/10 rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.1] hover:border-white/20 hover:scale-105">
              <h2 className="text-xl font-semibold text-white group-hover:text-[#00A3FF] transition-all duration-200">
                {post.title}
              </h2>
              <p className="text-white/70 mt-1">{post.excerpt}</p>
              <p className="text-sm text-white/50 mt-2">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full text-center mt-16 py-5">
        <p className="text-sm text-white/70">&copy; Activazon 2025</p>
      </footer>
    </div>
  );
}
