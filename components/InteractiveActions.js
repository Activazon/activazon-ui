import {
  ToastTurnOnPushNotifications,
  ToastTurnOnPushNotificationsDenied,
  TOASTS,
} from "components/Toast";
import { useTrans } from "lib/trans";
import { useCallback, useState } from "react";
import {
  canReceiveNotifications,
  requestPermissionStatus,
  requestPermission,
} from "lib/notifications";

const InteractiveActions = ({
  placeType,
  areaDisplayName,
  cityDisplayName,
  areadId,
  cityId,
}) => {
  const { t } = useTrans();
  const [toastType, setToastType] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const placeDisplayName =
    placeType === "area" ? areaDisplayName : cityDisplayName;

  // handles subscribing and unsubscribing the user
  const subscribeUserToArea = useCallback(() => {
    // TODO: subscribe user to area
    setIsSubscribed(true);
  }, []);
  const unsubscribeUserToArea = useCallback(() => {
    // TODO: unsubscribe user to area
    setIsSubscribed(false);
  }, []);

  // button event handlers
  const onSubscribeClick = (e) => {
    /**
     * this will try to subscribe the user to the area.
     * before subscribing, check if we have permission to send
     * notifications through this device and prompt the user if
     * we have to
     */
    if (!canReceiveNotifications()) {
      // user is on a browser that doesn't support notifications
      setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
      return;
    }

    const status = requestPermissionStatus();

    if (status === "granted") {
      // we already have permission, so just subscribe the user
      subscribeUserToArea();
      return;
    }

    if (status === "denied") {
      // user has denied notifications, so show them a toast
      setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
      return;
    }

    if (status === "default") {
      // user has not yet been asked for permission, so ask them
      setToastType(TOASTS.PUSH_NOTIFICATIONS_DEFAULT);
      return;
    }
  };
  const onUnSubscribeClick = (e) => {
    unsubscribeUserToArea();
  };
  const requestNotificationPermission = useCallback(
    (e) => {
      /**
       * This is a callback for the "Turn On" button in the toast.
       * this will request permission from the user to send notifications
       * and then subscribe the user to the area.
       */
      e.preventDefault();
      requestPermission({
        onGranted: () => {
          setToastType(null);
          // subscribed to area
          subscribeUserToArea();
        },
        onError: () => setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED),
      });
    },
    [subscribeUserToArea]
  );

  // determines what type of toast to display
  const toast = {
    [TOASTS.PUSH_NOTIFICATIONS_DEFAULT]: (
      <ToastTurnOnPushNotifications
        placeDisplayName={placeDisplayName}
        onAccept={requestNotificationPermission}
        onCancel={() => setToastType(null)}
      />
    ),
    [TOASTS.PUSH_NOTIFICATIONS_DENIED]: (
      <ToastTurnOnPushNotificationsDenied onCancel={() => setToastType(null)} />
    ),
  }[toastType];

  return (
    <>
      {toast}
      <div className="banner-interactive-actions">
        {isSubscribed && (
          <button
            className="btn btn-outline-primary py-2"
            onClick={onUnSubscribeClick}
          >
            <p className="m-0 fs-5">
              <i className="bi bi-bell me-2"></i>
              <span>{t("Subscribed")}</span>
            </p>
          </button>
        )}
        {!isSubscribed && (
          <button className="btn btn-primary py-2" onClick={onSubscribeClick}>
            <p className="m-0 fs-5">
              <i className="bi bi-bell-fill me-2"></i>
              <span>{t("Subscribe to Alerts")}</span>
            </p>
          </button>
        )}
      </div>
    </>
  );
};

export default InteractiveActions;
