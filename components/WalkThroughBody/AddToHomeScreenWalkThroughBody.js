import { useTrackOnce } from "lib/track";
import { useTrans } from "lib/trans";

const AddToHomeScreenWalkThroughBody = ({ device }) => {
  const { t } = useTrans();
  useTrackOnce("a2hs.add_to_home_screen");
  let deviceSpecificInstruction = null;

  if (device === "ios") {
    deviceSpecificInstruction = (
      <p class="app-content-text">
        {t(
          'Tap the <i class="bi bi-box-arrow-up"></i> button at the bottom of your screen and select <b>Add to Home Screen</b> from the menu.'
        )}
      </p>
    );
  } else if (device === "android") {
    deviceSpecificInstruction = (
      <p class="app-content-text">
        {t(
          "Tap the settings button at on your browser and select <b>Add to Home Screen</b>"
        )}
      </p>
    );
  } else {
    deviceSpecificInstruction = (
      <p class="app-content-text">
        {t("Tap the install App button near navigation bar.")}
      </p>
    );
  }

  return (
    <div className="app-content app-content-open-animate">
      <div className="brand">
        <i className="brand-hero">
          <img src="/undraw/undraw_app_installation_re_h36x.svg" />
        </i>
        <p className="brand-text-title">
          {t("Sweet! Now let's Add Activazon to your Home Screen")}
        </p>
      </div>
      <div className="app-content-list">
        <div class="app-content-instruction">{deviceSpecificInstruction}</div>
        <div class="app-content-instruction">
          <p class="app-content-text">
            {t(
              "Then, go to your Home screen and open the Activazon app to continue."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToHomeScreenWalkThroughBody;
