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

  // api requests
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
    if (canReceiveNotifications()) {
      switch (requestPermissionStatus()) {
        case "denied":
          setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
          break;
        case "default":
          setToastType(TOASTS.PUSH_NOTIFICATIONS_DEFAULT);
          break;
        case "granted":
          subscribeUserToArea();
      }
    } else {
      setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
    }
  };
  const onUnSubscribeClick = (e) => {
    unsubscribeUserToArea();
  };
  const requestNotificationPermission = useCallback((e) => {
    e.preventDefault();
    Notification.requestPermission((permission) => {
      console.debug("requestNotificationPermission", { permission });
      if (permission === "granted") {
        setToastType(null);
        return;
      }
      setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED);
    });
  }, []);

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
