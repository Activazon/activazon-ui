import SubscribeButton from "./InteractiveActions/SubscribeButton";

const InteractiveActions = ({ placeManager, subscriptionManager }) => {
  return (
    <>
      <div className="banner-interactive-actions">
        {placeManager.isLoaded && subscriptionManager?.isLoaded && (
          <SubscribeButton
            placeManager={placeManager}
            subscriptionManager={subscriptionManager}
          />
        )}
      </div>
    </>
  );
};

export default InteractiveActions;
