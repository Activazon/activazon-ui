import { useTrackOnce } from "lib/track";
import { useTrans } from "lib/trans";

const InAppBrowserWalkThrough = () => {
  const { t } = useTrans();
  useTrackOnce("a2hs.open_in_browser");
  return (
    <div className="app-content app-content-open-animate">
      <div className="brand">
        <i className="brand-hero">
          <img src="/undraw/undraw_going_offline_ihag.svg" />
        </i>
        <p className="brand-text-title">
          {t("First, open this page in your browser")}
        </p>
      </div>
      <div className="app-content-list">
        <div class="app-content-instruction">
          <p class="app-content-text">
            {t(
              'Tap the <i class="bi bi-three-dots"></i> button at the top right of your screen and select <b>Open in browser</b>'
            )}
          </p>
        </div>
        <div class="app-content-instruction">
          <p class="app-content-text">
            {t(
              'Tap the bar with the url <b>www.activazon.com</b> at top if the <i class="bi bi-three-dots"></i> button is not visible.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowserWalkThrough;
