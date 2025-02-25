import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
      {/* <GoogleAnalytics gaId="G-XYZ" /> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          {children}
        </ClerkProvider>
        <GoogleTagManager gtmId="G-EMVQMGMVN2" />
      </body>
    </html>
  );
}
