import { useState } from "react";
import SubscribeButton from "./InteractiveActions/SubscribeButton";
import ShareButton from "./InteractiveActions/ShareButton";
import A2hsCtaTile from "./A2hsCtaTile";

const InteractiveActions = ({ placeManager, subscriptionManager }) => {
  const [showA2hsCta, setShowA2hsCta] = useState(false);
  return (
    <>
      {!showA2hsCta && (
        <div className="banner-interactive-actions">
          <SubscribeButton
            placeManager={placeManager}
            subscriptionManager={subscriptionManager}
            showA2hsCta={() => setShowA2hsCta(true)}
          />
          <ShareButton placeManager={placeManager} />
        </div>
      )}
      {showA2hsCta && (
        <div className="py-3">
          <A2hsCtaTile />
        </div>
      )}
    </>
  );
};

export default InteractiveActions;
