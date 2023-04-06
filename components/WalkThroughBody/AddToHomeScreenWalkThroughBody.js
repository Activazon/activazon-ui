import { useTrackOnce } from "lib/track";
import WalkThroughBody from "components/WalkThroughBody";
import { useTrans } from "lib/trans";

const AddToHomeScreenWalkThroughBody = ({ device }) => {
  const { t } = useTrans();
  useTrackOnce("a2hs.add_to_home_screen");
  let deviceSpecificInstruction = null;

  if (device === "ios") {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        {t(
          'Tap the <i class="bi bi-box-arrow-up"></i> button at the bottom of your screen and select <b>Add to Home Screen</b> from the menu.'
        )}
      </p>
    );
  } else if (device === "android") {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        {t(
          'Tap the <i class="bi bi-three-dots"></i> button at the top right of your screen and select <b>Add to Home Screen</b>'
        )}
      </p>
    );
  } else {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        {t("Tap the install App button near navigation bar.")}
      </p>
    );
  }

  return (
    <WalkThroughBody
      heroImageSrc="/undraw/undraw_app_installation_re_h36x.svg"
      title={t("Sweet! Now let's Add Activazon to your Home Screen")}
      instructions={[
        deviceSpecificInstruction,
        <p class="walkthrough-description">
          {t(
            "Then, go to your Home screen and open the Activazon app to continue."
          )}
        </p>,
      ]}
    />
  );
};

export default AddToHomeScreenWalkThroughBody;
