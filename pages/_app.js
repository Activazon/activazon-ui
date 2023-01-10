import "../styles/theme.scss";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function App({ Component, pageProps }) {
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
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return <Component {...pageProps} />;
}
