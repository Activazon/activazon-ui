import WalkThroughBody from "components/WalkThroughBody";
import { useTrackOnce } from "lib/track";

const InAppBrowserWalkThrough = () => {
  useTrackOnce("a2hs.open_in_browser");
  return (
    <WalkThroughBody
      heroImageSrc="/walkthrough/open-in-browser.jpg"
      title="First, open this page in your browser"
      instructions={[
        <p class="walkthrough-description">
          Tap the <i class="bi bi-three-dots"></i> button at the top right of
          your screen and select <b>Open in browser</b>.
        </p>,
        <p class="walkthrough-description">
          Tap the url <b>www.activazon.com</b> at top if{" "}
          <i class="bi bi-three-dots"></i> button is not visible.
        </p>,
      ]}
    />
  );
};

export default InAppBrowserWalkThrough;
