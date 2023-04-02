import WalkThroughBody from "components/WalkThroughBody";
import { useTrackOnce } from "lib/track";
import { useTrans } from "lib/trans";

const InAppBrowserWalkThrough = () => {
  const { t } = useTrans();
  useTrackOnce("a2hs.open_in_browser");
  return (
    <WalkThroughBody
      heroImageSrc="/walkthrough/open-in-browser.jpg"
      title={t("First, open this page in your browser")}
      instructions={[
        <p class="walkthrough-description">
          {t(
            'Tap the <i class="bi bi-three-dots"></i> button at the top right of your screen and select <b>Open in browser</b>'
          )}
          .
        </p>,
        <p class="walkthrough-description">
          {t(
            'Tap the bar with the url <b>www.activazon.com</b> at top if the <i class="bi bi-three-dots"></i> button is not visible.'
          )}
        </p>,
      ]}
    />
  );
};

export default InAppBrowserWalkThrough;
