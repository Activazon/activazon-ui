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
        <a href="https://www.sideprojectors.com/project/39567/activazon">
          <img
            style={{
              position: "fixed",
              zIndex: "1000",
              top: "-5px",
              right: "20px",
              border: 0,
            }}
            src="https://www.sideprojectors.com/img/badges/badge_2_red.png"
            alt="Activazon is sale at @SideProjectors"
          />
        </a>
        <AppProvider locale={lng}>
          <TrackingProvider>
            <ServiceWorkerProvider>
              <NavigationBar />
              <SearchManager alwaysShow={false} />
              <main className="tw-mt-4">{children}</main>
              <Footer />
              <ModalManager />
            </ServiceWorkerProvider>
          </TrackingProvider>
        </AppProvider>
      </body>
    </html>
  );
}
