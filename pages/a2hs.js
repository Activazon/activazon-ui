import Head from "components/Head";
import InAppBrowserWalkThrough from "components/WalkThroughBody/InAppBrowserWalkThroughBody";
import AddToHomeScreenWalkThroughBody from "components/WalkThroughBody/AddToHomeScreenWalkThroughBody";
import { useTrans } from "lib/trans";
import { isInAppBrowser, detectDeviceOS } from "lib/walkthrough";

const AnimateIn = ({ children }) => {
  return (
    <div className="animate__animated animate__fadeInLeft flex-grow-1">
      {children}
    </div>
  );
};

export default function Home({ inAppBrowser, browserOs }) {
  const { t } = useTrans();
  useTrans("walkthrough.a2hs", {
    isInAppBrowser: inAppBrowser.is,
    appBrowserName: inAppBrowser.name,
    browserOs,
  });

  const inAppOnlyWalkThrough = inAppBrowser.is;
  const addToHomeScreenOnlyWalkThrough = !inAppBrowser.is;
  const device = browserOs;

  return (
    <>
      <Head title={t("Add To Home Screen")} />
      <body>
        <div class="walkthrough">
          <div class="nav-placeholder">
            <p class="nav-placeholder-title animate__animated animate__fadeInDown">
              <i className="bi bi-activity"></i>Activazon
            </p>
          </div>
          {inAppOnlyWalkThrough && (
            <AnimateIn>
              <InAppBrowserWalkThrough />
            </AnimateIn>
          )}
          {addToHomeScreenOnlyWalkThrough && (
            <AnimateIn>
              <AddToHomeScreenWalkThroughBody device={device} />
            </AnimateIn>
          )}
          <footer>
            <div className="container animate__animated animate__fadeInUp">
              <p>{t("You are adding Activazon to your<br />Home Screen")}</p>
            </div>
          </footer>
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const userAgent = req.headers["user-agent"];

  const inAppBrowser = isInAppBrowser(userAgent);
  const browserOs = detectDeviceOS(userAgent);

  return {
    props: {
      inAppBrowser: {
        is: inAppBrowser[0],
        name: inAppBrowser[1],
      },
      browserOs,
    },
  };
}
