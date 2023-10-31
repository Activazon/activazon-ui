import "../../globals.css";
import AppProvider from "@/store/AppProvider";
import NavigationBar from "@/components/NavigationBar";
import SearchManager from "@/components/SearchManager";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "de" }];
}

import ServiceWorkerProvider from "@/store/ServiceWrokerProvider";
import ModalManager from "@/components/ModalManager";
import TrackingProvider from "@/store/TrackingProvider";

export { default as metadata } from "@/lib/metadata";

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
        <TrackingProvider>
          <ServiceWorkerProvider>
            <AppProvider locale={lng}>
              <NavigationBar />
              <SearchManager />
              <main className="tw-mt-4">{children}</main>

              <Footer />
              <ModalManager />
            </AppProvider>
          </ServiceWorkerProvider>
        </TrackingProvider>
      </body>
    </html>
  );
}
