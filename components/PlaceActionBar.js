import { useTrans } from "lib/trans";
import { useRouter } from "next/router";
import { isDisplayModeStandalone } from "lib/pwa";
import { track } from "lib/track";
import { useUser } from "lib/user";

const PlaceActionBarButton = ({ icon, text, onClick, disabled }) => {
  return (
    <button
      className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-blue-dark tw-rounded-lg tw-p-2 tw-bg-blue-bright-trans tw-w-full"
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBarButtonStandout = ({ icon, text, onClick, disabled }) => {
  return (
    <button
      className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-white tw-rounded-lg tw-p-2 tw-bg-blue-bright tw-w-full"
      disabled={disabled}
      onClick={onClick}
    >
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBar = ({ placeManager, subscriptionManager }) => {
  const { ts } = useTrans();
  const { asPath, push } = useRouter();
  const user = useUser();
  const canSubscribe = subscriptionManager.isLoaded;
  const isSubscribed = subscriptionManager.isSubscribed;

  const onSubscribeClick = (e) => {
    /**
     * makes a requests to try and subscribe user to area/place
     */
    e.preventDefault();
    if (!isDisplayModeStandalone()) {
      track("subscribe.click.standalone");
      push({
        pathname: "/a2hs",
        query: { callbackUrl: asPath, mustSignUp: "1" },
      });
      return;
    }
    if (!user) {
      track("subscribe.not-logged-in");
      // can't subscribe if not logged in
      push({
        pathname: "/app",
        query: { callbackUrl: asPath, mustSignUp: "1" },
      });
      return;
    }

    const perms = subscriptionManager.checkPermissions();
    if (perms === "denied") {
      track("subscribe.click.denied");
      alert(
        ts(
          "Could not subscribe. Please enable notifications in your notification settings."
        )
      );
      return;
    } else if (perms === "unsupported") {
      track("subscribe.click.unsupported");
      alert(
        ts("Could not subscribe. Your browser does not support notifications.")
      );
      return;
    } else if (perms === "granted") {
      track("subscribe.click.granded");
      subscriptionManager.subscribeUserToArea();
      return;
    } else {
      track("subscribe.click.unknown_error");
      alert(ts("Could not subscribe. Please try again later."));
    }
  };

  const onUnsubscribeClick = (e) => {
    /**
     * makes a requests to try and unsubscribe user from area/place
     */
    e.preventDefault();
    const { placeDisplayName } = placeManager;

    if (
      confirm(
        ts("Are you sure you want to unsubscribe from {{placeDisplayName}}?", {
          placeDisplayName,
        })
      )
    ) {
      subscriptionManager.unsubscribeUserFromArea();
    }
  };

  const onShareClick = (e) => {
    /**
     * triggers system share dialog
     * https://web.dev/web-share/
     */
    e.preventDefault();
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const shareUrl = `${origin}${asPath}`;
    const shareTitle = ts(
      "Stay informed with real-time crime updates in {{placeDisplayName}}",
      {
        placeDisplayName: placeManager.placeDisplayName,
      }
    );
    const shareText = ts(
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
      {!isSubscribed && (
        <PlaceActionBarButtonStandout
          disabled={!canSubscribe}
          icon="bell"
          text="Subscribe"
          onClick={onSubscribeClick}
        />
      )}
      {isSubscribed && (
        <PlaceActionBarButton
          disabled={!canSubscribe}
          icon="bell-slash"
          text="Unsubscribe"
          onClick={onUnsubscribeClick}
        />
      )}
      <PlaceActionBarButton icon="share" text="Share" onClick={onShareClick} />
    </div>
  );
};

export default PlaceActionBar;
