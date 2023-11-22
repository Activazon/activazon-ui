import { Metadata } from "next";
import { default as basicMetadata } from "@/lib/metadata";
import Link from "next/link";

interface SectionProps {
  children: any;
  color: "blue" | "white" | "slate" | "transparent";
}

export const metadata: Metadata = {
  applicationName: "Activazon",
  title: "Explore Honduras Safely with Activazon",
  description:
    "Discover essential safety insights for traveling in Honduras. Stay informed and explore with confidence using Activazon.",
  keywords: [
    "Honduras travel safety",
    "places to avoid in Honduras",
    "Honduras travel tips",
    "safety in Honduras",
    "is Honduras safe to visit?",
    "dangerous places in Honduras",
    "places to avoid in Honduras",
    "crime in Honduras",
    "travel safety tips for Honduras",
    "Honduras safety news",
    "Honduras safety alerts",
    "Honduras safety map",
    "real-time safety alerts for Honduras",
    "safety app for Honduras",
    "safe places to visit in Honduras",
    "Honduras news alerts",
    "Honduras incident alerts",
    "Honduras safety notifications",
    "Honduras travel safety app",
    "Honduras safety app for tourists",
    "Honduras crime alerts",
    "Honduras violence alerts",
    "Honduras natural disaster alerts",
    "Honduras political unrest alerts",
  ],
  icons: basicMetadata.icons,
  twitter: {
    card: "summary_large_image",
    site: "@activazon",
    creator: "@yourusername", // Replace with your Twitter handle
    title: "Explore Honduras Safely | Activazon",
    description:
      "Discover essential safety insights for traveling in Honduras. Stay informed and explore with confidence using Activazon.",
  },
  openGraph: {
    type: "website",
    url: "https://activazon.com/visit-honduras",
    title: "Visit Honduras Securely",
    description:
      "Your Trusted Safety Companion in Honduras. Explore with Confidence.",
    siteName: "Activazon",
    images: [
      {
        url: "https://www.activazon.com/pwa/social-share.png",
        width: 1200,
        height: 630,
        alt: "Activazon Logo",
      },
    ],
  },
};

const Section = ({ children, color }: SectionProps) => {
  const colorClassName = {
    blue: "tw-bg-blue-light",
    white: "tw-bg-white",
    slate: "tw-bg-slate-100",
    transparent: "tw-bg-transparent",
  }[color];
  return (
    <div className={"tw-w-full tw-py-12 " + colorClassName}>
      <div className="tw-w-full tw-max-w-5xl tw-px-3 tw-mx-auto">
        {children}
      </div>
    </div>
  );
};

const Point = ({ children }: { children: React.ReactNode }) => (
  <div className="tw-text-blue-dark tw-text-lg tw-bg-blue-light/20 tw-p-4 tw-rounded-2xl tw-shadow-xll tw-border-2 tw-border-blue-light tw-flex tw-flex-row tw-gap-3 tw-items-center hover:tw-scale-110 tw-ease-in-out tw-duration-300">
    <i className="bi bi-asterisk tw-text-2xl tw-text-blue-light"></i>
    <p>{children}</p>
  </div>
);

const PointCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="tw-w-full tw-bg-black/5 tw-rounded-3xl tw-py-9 tw-px-6 tw-flex tw-flex-col tw-gap-4 hover:tw-scale-110 tw-ease-in-out tw-duration-300">
    <div className="tw-text-center">
      <i className={`${icon} tw-text-5xl tw-text-blue-light`}></i>
    </div>
    <p className="tw-text-center tw-text-2xl tw-font-semibold tw-text-blue-dark">
      {title}
    </p>
    <p className="tw-text-center tw-text-md tw-font-medium tw-text-gray-dark">
      {description}
    </p>
  </div>
);

const Page = () => {
  return (
    <>
      <div className="banner-bg">
        <div className="tw-w-full tw-min-h-[50px] tw-py-5 tw-sticky">
          <nav className="tw-w-full tw-max-w-6xl tw-px-3 tw-mx-auto tw-flex tw-justify-between">
            <p className="tw-text-2xl tw-flex tw-flex-row tw-gap-2 tw-items-center tw-font-medium tw-text-white">
              <i className="bi bi-activity tw-text-3xl"></i>
              <span>Activazon</span>
            </p>
            <a
              href="#"
              className="tw-bg-blue-dark tw-text-blue-light tw-text-lg tw-font-medium tw-px-6 tw-py-2 tw-rounded-full hover:tw-bg-blue-dark/70"
            >
              Open App
            </a>
          </nav>
        </div>
        {/* what the user will get */}
        <Section color="transparent">
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-10 tw-justify-evenly">
            <div className="tw-flex tw-flex-shrink tw-flex-col tw-gap-3 tw-justify-center">
              <h1 className="tw-text-6xl tw-font-bold tw-text-white">
                Explore Honduras&apos; Secrets with
                <br />
                Peace of Mind
              </h1>
              <p className="tw-text-xl tw-font-medium tw-text-white">
                Find Peace of Mind Knowing You&apos;re Safe while You to Explore
                with Confidence.
              </p>
            </div>
            <div className="tw-flex tw-flex-shrink-0 tw-w-1/3"></div>
          </div>
        </Section>
      </div>
      {/* the problem with the way things are done */}
      <Section color="white">
        <div className="tw-flex tw-flex-col tw-gap-10">
          <h1 className="tw-text-blue-dark tw-text-5xl tw-font-bold tw-text-left">
            Honestly, We Get It.
          </h1>
          <div className="tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-10 tw-justify-evenly">
            {/* first issue our customers have */}
            <div className="tw-w-full tw-flex tw-flex-col tw-gap-5">
              <p className="tw-text-2xl tw-font-bold tw-text-blue-dark">
                You can&apos;t enjoy yourself while feeling anxious or unsure of
                your surroundings.
              </p>
              <Point>
                The constant worry about your safety can cast a shadow on your
                travel experience. Preventing you from enjoying yourself.
              </Point>
              <Point>Hard to find information relevant to you</Point>
              <Point>
                Googling news articles can be time-consuming, especially if the
                news is in a language you don&apos;t understand.
              </Point>
            </div>

            <div className="tw-w-full md:tw-w-2/3 tw-flex tw-items-center tw-justify-center">
              <img src="/assets/landing/undraw_Departing_re_mlq3.png" />
            </div>
          </div>
        </div>
      </Section>
      {/* how we activazon works */}
      <Section color="slate">
        <div className="tw-flex tw-flex-col tw-gap-10">
          <h1 className="tw-text-blue-dark tw-text-5xl tw-font-bold tw-text-center">
            Safety Simplified, Just for You.
          </h1>
          <div className="tw-flex tw-flex-row tw-gap-10 tw-justify-evenly">
            <div className="tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-gap-5">
              <PointCard
                icon="bi bi-hearts"
                title="Information that is relevant to you"
                description="Effortlessly find incidents in your vicinity, with clear insights into the types of occurrences in your area."
              />
              <PointCard
                icon="bi bi-clipboard-data-fill"
                title="Insights on places you want to care about"
                description="Get quick and easily understandable updates on incidents near you, available in both English and Spanish."
              />
              <PointCard
                icon="bi bi-app-indicator"
                title="Notifications as a incident is reported."
                description="Receive immediate notifications as an incident is detected near you, ensuring you stay informed, and secure."
              />
            </div>
          </div>
        </div>
      </Section>
      {/* CTA */}
      <Section color="blue">
        <div className="tw-flex tw-flex-col tw-gap-10">
          <h1 className="tw-text-blue-dark tw-text-5xl tw-font-bold tw-text-center">
            Don&apos;t take our word for it.
          </h1>
          <p className="tw-text-center tw-text-lg">
            Activazon is easy to use, no installs necessary, just tap below
          </p>
          <p className="tw-text-[8rem] tw-text-blue-dark tw-text-center">
            <i className="bi bi-door-open-fill"></i>
          </p>

          <p className="tw-text-center">
            <Link
              href="/"
              className="tw-text-center tw-text-3xl tw-font-bold tw-text-white tw-bg-blue-dark tw-rounded-full tw-py-4 tw-px-10 hover:tw-scale-110 tw-ease-in-out tw-duration-300"
            >
              Open App
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
};

export default Page;
