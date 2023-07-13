import { useTrans } from "lib/trans";
import { useRouter } from "next/router";

const PlaceActionBarButton = ({ icon, text, onClick }) => {
  return (
    <button
      className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-blue-dark tw-rounded-lg tw-p-2 tw-bg-blue-bright-trans tw-w-full"
      onClick={onClick}
    >
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBarButtonStandout = ({ icon, text, onClick }) => {
  return (
    <button
      className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-white tw-rounded-lg tw-p-2 tw-bg-blue-bright tw-w-full"
      onClick={onClick}
    >
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBar = ({ placeManager, subscriptionManager }) => {
  const { t } = useTrans();
  const { asPath } = useRouter();

  const onSubscribeClick = () => {};
  const onShareClick = (e) => {
    e.preventDefault();
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const shareUrl = `${origin}${asPath}`;
    const shareTitle = t(
      "Stay informed with real-time crime updates in {{placeDisplayName}}",
      {
        placeDisplayName: placeManager.placeDisplayName,
      }
    );
    const shareText = t(
      "Get the latest updates on crime in {{placeDisplayName}} straight to your phone or desktop with Activazon. Our platform keeps you informed and aware of what's happening in your community in real-time. Stay safe and aware with Activazon's crime updates.",
      {
        placeDisplayName: placeManager.placeDisplayName,
      }
    );

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
    } else {
      alert("Share not supported on this device");
    }
  };

  return (
    <div className="tw-w-full tw-gap-1 tw-flex tw-flex-row">
      <PlaceActionBarButtonStandout
        icon="bell"
        text="Subscribe"
        onClick={onSubscribeClick}
      />
      <PlaceActionBarButton icon="share" text="Share" onClick={onShareClick} />
    </div>
  );
};

export default PlaceActionBar;
