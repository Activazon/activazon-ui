import { useTrackOnce } from "lib/track";
import WalkThroughBody from "components/WalkThroughBody";

const AddToHomeScreenWalkThroughBody = ({ device }) => {
  useTrackOnce("a2hs.add_to_home_screen");
  let deviceSpecificInstruction = null;

  if (device === "ios") {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        Tap the <i class="bi bi-box-arrow-up"></i> button at the bottom of your
        screen and select <b>Add to Home Screen</b> from the menu.
      </p>
    );
  } else if (device === "android") {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        Tap the <i class="bi bi-three-dots"></i> button at the top right of your
        screen and select <b>Add to Home Screen</b>.
      </p>
    );
  } else {
    deviceSpecificInstruction = (
      <p class="walkthrough-description">
        Tap the install App button near navigation bar.
      </p>
    );
  }

  return (
    <WalkThroughBody
      heroImageSrc="/walkthrough/install.jpg"
      title="Great Job. Now we can Add to your Home Screen."
      instructions={[
        deviceSpecificInstruction,
        <p class="walkthrough-description">
          Then, go to your Home screen and open the Activazon app.
        </p>,
      ]}
    />
  );
};

export default AddToHomeScreenWalkThroughBody;
