import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Activazon – Community Intelligence for Smart Investors & Decision-Makers",
  description:
    "Get AI-powered reports on real estate trends, new developments, crime & safety, business openings, and local infrastructure changes. Stay ahead with Activazon.",
  keywords: [
    "Activazon",
    "Neighborhood Intelligence",
    "Community Intelligence",
    "Real Estate Reports",
    "Local Insights",
    "Development Reports",
    "Investment Trends",
    "AI Reports",
  ],
  openGraph: {
    title: "Activazon – AI-Powered Community Intelligence",
    description:
      "Exclusive AI-generated reports on real estate, developments, crime, and more. Know first. Act fast.",
    url: "https://activazon.com",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Activazon - AI-Powered Community Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Activazon – AI-Powered Community Intelligence",
    description:
      "Exclusive AI-generated reports on real estate, developments, crime, and more. Know first. Act fast.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      {/* <GoogleAnalytics gaId="G-EMVQMGMVN2" /> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mesh-gradient-bg !fixed !translate-y-[-50vh] md:!translate-y-[-70vh] top-0 left-0 w-full h-[40vh] z-[-1]" />
        <header className="w-full flex flex-row justify-between items-center border-b border-white/10 bg-white/5 md:bg-transparent md:py-5 md:px-5 py-4 px-3 sticky top-0 backdrop-blur-xl z-10">
          <Link href="/" className="">
            <img
              src="/logo.svg"
              className="h-6 md:h-7 invert brightness-0 transition-all hover:brightness-100 hover:invert-0 duration-200"
            />
          </Link>

          <div className="">
            <Link
              href="https://madein.ky"
              className="text-primary underline decoration-primary/50 hover:decoration-primary transition-all duration-200 underline-offset-4 md:text-base text-sm"
            >
              Back to Site
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
