import "../globals.css";
import AppProvider from "@/store/AppProvider";
import NavigationBar from "@/components/NavigationBar";
import SearchManager from "@/components/SearchManager";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "de" }];
}

import type { Metadata } from "next";
import ServiceWorkerProvider from "@/store/ServiceWrokerProvider";
import ModalManager from "@/components/ModalManager";

export const metadata: Metadata = {
  title: "Activazon",
  applicationName: "Activazon",
  keywords: [
    "safety",
    "ai",
    "honduras",
    "san pedro sula",
    "teguciglpa",
    "visit honduras",
  ],
  description: "AI-powered insights for your neighborhood",
  themeColor: "#FFFFFF",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: { url: "/favicon.ico", sizes: "64x64 32x32 24x24 16x16" },
  },
  manifest: "/manifest-es.webmanifest",
  openGraph: {
    type: "website",
    locale: "es",
    url: "https://activazon.com/es/",
    title: "Activazon",
    description: "AI-powered insights for your neighborhood",
    images: [
      {
        url: "https://www.activazon.com/pwa/social-share.png",
        width: 1200,
        height: 630,
        alt: "Activazon",
      },
    ],
  },
  twitter: {
    site: "@activazon",
    card: "summary_large_image",
    creator: "@activazon",
    images: "https://www.activazon.com/pwa/social-share.png",
  },
  appleWebApp: {
    title: "Activazon",
  },
  category: "news",
  classification: "AI",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng}>
      <body>
        <ServiceWorkerProvider>
          <AppProvider locale={lng}>
            <NavigationBar />
            <SearchManager />
            <main className="tw-mt-4">{children}</main>

            <Footer />
            <ModalManager />
          </AppProvider>
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
