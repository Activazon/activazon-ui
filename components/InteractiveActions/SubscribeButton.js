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
  loadServiceWorker,
} from "lib/notifications";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsSubscribed,
  selectPlaceDisplayName,
  subscribeUserToArea,
  unsubscribeUserFromArea,
} from "lib/redux/features/area";

const SubscribeButton = ({}) => {
  /**
   * this is how subscriptions works
   * this is a button that will subscribe the user to the
   * area or city, if we don't have permissions to send
   * notifications, we will prompt the user to turn on
   * notifications using toasts
   */
  const { t } = useTrans();

  const dispatch = useDispatch();
  const isSubscribed = useSelector(selectIsSubscribed());
  const placeDisplayName = useSelector(selectPlaceDisplayName());
  const [toastType, setToastType] = useState(null);

  // handles subscribing and unsubscribing the user
  // area must be loaded in redux for this to work
  const doSubscribeUserToArea = useCallback(() => {
    dispatch(subscribeUserToArea());
  }, [dispatch, subscribeUserToArea]);
  const doUnsubscribeUserFromArea = useCallback(() => {
    dispatch(unsubscribeUserFromArea());
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
      doSubscribeUserToArea();
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
    doUnsubscribeUserFromArea();
  };
  const requestNotificationPermission = useCallback(
    (e) => {
      /**
       * This is a callback for the "Turn On" button that
       * the user will see the first time they try to subscribe
       * to an area.
       *
       * once the user grants permission, we will register the service worker and subscribe the user
       */
      e.preventDefault();
      requestPermission({
        onGranted: () => {
          setToastType(null);
          // register service worker, for first time
          loadServiceWorker();
          // subscribe user
          doSubscribeUserToArea();
        },
        onError: () => setToastType(TOASTS.PUSH_NOTIFICATIONS_DENIED),
      });
    },
    [doSubscribeUserToArea]
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
    </>
  );
};

export default SubscribeButton;
