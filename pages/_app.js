import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { loadFullStory } from "lib/track";
import Script from "next/script";
import { onLoad } from "lib/pwa";
// styling
import "../styles/theme.scss";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  useEffect(() => {
    // handles showing and hiding the loading overlay
    // when the router is changing routes
    const handleStart = (url) => {
      NProgress.configure({
        showSpinner: false,
        trickleSpeed: 100,
      });
      NProgress.set(0);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    loadFullStory();
    onLoad();
  }, []);

  return (
    <>
      {/* google tag */}

      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-QWY03DH2W4"
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QWY03DH2W4', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
