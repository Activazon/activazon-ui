import Head from "components/Head";
import InAppBrowserWalkThrough from "components/WalkThroughBody/InAppBrowserWalkThroughBody";
import AddToHomeScreenWalkThroughBody from "components/WalkThroughBody/AddToHomeScreenWalkThroughBody";
import { useTrans } from "lib/trans";
import { isInAppBrowser, detectDeviceOS } from "lib/walkthrough";
import { useTrackOnce } from "lib/track";

export default function Home({ inAppBrowser, browserOs }) {
  const { t } = useTrans();
  useTrackOnce("a2hs.loaded", {
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
