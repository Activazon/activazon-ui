import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { loadFullStory } from "lib/track";
import { Provider } from "react-redux";
import store from "lib/redux/store";
import { onLoad } from "lib/pwa";
import { usePanelbear } from "@panelbear/panelbear-nextjs";
// styling
import "../styles/theme.scss";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  usePanelbear("IQemxXNOhlr");
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
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
