import {
  ToastTurnOnPushNotifications,
  ToastTurnOnPushNotificationsDenied,
  TOASTS,
} from "components/Toast";
import { useTrans } from "lib/trans";
import { useSubscriptionManager } from "components/InteractiveActions/SubscribeButton/hooks";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPlaceDisplayName } from "lib/redux/features/area";

const SubscribeButton = ({}) => {
  /**
   * this is how subscriptions works
   * this is a button that will subscribe the user to the
   * area or city, if we don't have permissions to send
   * notifications, we will prompt the user to turn on
   * notifications using toasts
   */
  const { t } = useTrans();
  const [toastType, setToastType] = useState(null);
  const {
    checkPermissions,
    requestNotificationPermissionAndSubscribe,
    isSubscribed,
    subscribeUserToArea,
    unsubscribeUserFromArea,
  } = useSubscriptionManager();
  const placeDisplayName = useSelector(selectPlaceDisplayName());

  const onSubscribe = (e) => {
    e.preventDefault();

    switch (checkPermissions()) {
      case "granted":
        // we already have permission, so just subscribe the user
        subscribeUserToArea();
        break;
      case "denied":
      case "unsupported":
        // user has denied notifications or browser doesn't support push notifications
        setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
        break;
      case "default":
        // user has not yet been asked for permission, so ask them
        setToastType(TOASTS.PUSH_NOTIFICATIONS_DEFAULT);
        break;
    }
  };
  const onUnsubscribe = (e) => {
    e.preventDefault();
    unsubscribeUserFromArea();
  };
  const requestPermissionAndSubscribe = (e) => {
    e.preventDefault();
    requestNotificationPermissionAndSubscribe({
      onGranted: () => setToastType(null),
      onError: () => setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED),
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
      {!isSubscribed && (
        <button className="btn btn-primary py-2" onClick={onSubscribe}>
          <p className="m-0 fs-5">
            <i className="bi bi-bell-fill me-2"></i>
            <span>{t("Subscribe to Alerts")}</span>
          </p>
        </button>
      )}
      {isSubscribed && (
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
