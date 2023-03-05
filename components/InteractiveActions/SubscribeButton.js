import {
  ToastTurnOnPushNotifications,
  ToastTurnOnPushNotificationsDenied,
  TOASTS,
} from "components/Toast";
import { useTrans } from "lib/trans";
import { useUser } from "lib/user";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { track } from "lib/track";

const SubscribeButton = ({ placeManager, subscriptionManager }) => {
  /**
   * this is how subscriptions works
   * this is a button that will subscribe the user to the
   * area or city, if we don't have permissions to send
   * notifications, we will prompt the user to turn on
   * notifications using toasts
   */
  const { t } = useTrans();
  const user = useUser();
  const router = useRouter();
  const [toastType, setToastType] = useState(null);
  const {
    checkPermissions,
    requestNotificationPermissionAndSubscribe,
    isSubscribed,
    subscribeUserToArea,
    unsubscribeUserFromArea,
  } = subscriptionManager;
  const { placeDisplayName } = placeManager;
  const isLoaded = subscriptionManager.isLoaded;

  const onSubscribe = useCallback(
    (e) => {
      e.preventDefault();

      if (!user) {
        track("subscribe.click.not-logged-in");
        // can't subscribe if not logged in
        router.push({
          pathname: "/signup",
          query: { callbackUrl: router.asPath, mustSignUp: "1" },
        });
        return;
      }

      switch (checkPermissions()) {
        case "granted":
          // we already have permission, so just subscribe the user
          track("subscribe.click.granted");
          subscribeUserToArea();
          break;
        case "denied":
        case "unsupported":
          track("subscribe.click.push-notifications-denied-prompt");
          // user has denied notifications or browser doesn't support push notifications
          setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
          break;
        case "default":
          track("subscribe.click.push-notifications-default-prompt");
          // user has not yet been asked for permission, so ask them
          setToastType(TOASTS.PUSH_NOTIFICATIONS_DEFAULT);
          break;
      }
    },
    [user]
  );
  const onUnsubscribe = (e) => {
    track("unsubscribe.click");
    e.preventDefault();
    unsubscribeUserFromArea();
  };
  const requestPermissionAndSubscribe = (e) => {
    e.preventDefault();
    requestNotificationPermissionAndSubscribe({
      onGranted: () => {
        track("subscribe.click.push-notifications-default-prompt.success");
        setToastType(null);
      },
      onError: () => {
        track("subscribe.click.push-notifications-default-prompt.failed");
        setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
      },
    });
  };

  return (
    <>
      {/* toast */}
      {toastType === TOASTS.PUSH_NOTIFICATIONS_DEFAULT && (
        <ToastTurnOnPushNotifications
          placeDisplayName={placeDisplayName}
          onAccept={requestPermissionAndSubscribe}
          onCancel={() => setToastType(null)}
        />
      )}
      {toastType === TOASTS.PUSH_NOTIFICATIONS_DENIED && (
        <ToastTurnOnPushNotificationsDenied
          onCancel={() => setToastType(null)}
        />
      )}
      {/* subscribe button */}
      {!isLoaded && (
        <button className="btn btn-primary py-2 disabled" disabled={true}>
          <p className="m-0 fs-5">
            <i className="bi bi-bell-fill"></i>
          </p>
        </button>
      )}
      {isLoaded && !isSubscribed && (
        <button className="btn btn-primary py-2" onClick={onSubscribe}>
          <p className="m-0 fs-5">
            <i className="bi bi-bell-fill me-2"></i>
            <span>{t("Subscribe to Alerts")}</span>
          </p>
        </button>
      )}
      {isLoaded && isSubscribed && (
        <button
          className="btn btn-outline-primary py-2"
          onClick={onUnsubscribe}
        >
          <p className="m-0 fs-5">
            <i className="bi bi-bell me-2"></i>
            <span>{t("Subscribed")}</span>
          </p>
        </button>
      )}
    </>
  );
};

export default SubscribeButton;
