import Head from "components/Head";
import InAppBrowserWalkThrough from "components/WalkThroughBody/InAppBrowserWalkThroughBody";
import AddToHomeScreenWalkThroughBody from "components/WalkThroughBody/AddToHomeScreenWalkThroughBody";
import { useTrans } from "lib/trans";
import { isInAppBrowser, detectDeviceOS } from "lib/walkthrough";

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
      <Head />
      <body>
        <div className="app-container">
          <div className="app-header">
            <p className="app-header-title">
              <i className="bi bi-activity"></i>Activazon
            </p>
          </div>
          {inAppOnlyWalkThrough && <InAppBrowserWalkThrough />}
          {addToHomeScreenOnlyWalkThrough && (
            <AddToHomeScreenWalkThroughBody device={device} />
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
