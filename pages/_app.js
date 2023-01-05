import "../styles/theme.scss";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { usePanelbear } from "@panelbear/panelbear-nextjs";

export default function App({ Component, pageProps }) {
  // Load Panelbear only once during the app lifecycle
  usePanelbear(process.env.NEXT_PUBLIC_BEAR_PANEL_SITE_ID, {
    debug: process.env.NEXT_PUBLIC_BEAR_PANEL_ENABLED != "1",
    scriptSrc: "/bear.js",
  });
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
    // handles facebook pixel
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init("1244744206472430");
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  return <Component {...pageProps} />;
}
