import SubscribeButton from "./InteractiveActions/SubscribeButton";
import ShareButton from "./InteractiveActions/ShareButton";

const InteractiveActions = ({ placeManager, subscriptionManager }) => {
  return (
    <>
      <div className="banner-interactive-actions">
        {/* <SubscribeButton
          placeManager={placeManager}
          subscriptionManager={subscriptionManager}
        /> */}
        <ShareButton placeManager={placeManager} />
      </div>
    </>
  );
};

export default InteractiveActions;
