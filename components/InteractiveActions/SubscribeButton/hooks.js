import { useSelector, useDispatch } from "react-redux";
import {
  selectIsSubscribed,
  subscribeUserToArea,
  unsubscribeUserFromArea,
} from "lib/redux/features/area";

export const canReceiveNotifications = () => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }
  if (!("PushManager" in window)) {
    return false;
  }
  return true;
};

export const loadServiceWorker = () => {
  navigator.serviceWorker.register("/sw.js");
};

export const requestPermissionStatus = () => {
  return Notification.permission;
};

export const usePushNotifications = () => {
  /**
   * this hook is the brains of the subscribe button.
   * this exposes functionality to subscribe and unsubscribe the user to the area or city
   */

  const dispatch = useDispatch();
  const isSubscribed = useSelector(selectIsSubscribed());

  // handles subscribing and unsubscribing the user
  // area must be loaded in redux for this to work
  const doSubscribeUserToArea = () => {
    dispatch(subscribeUserToArea());
  };
  const doUnsubscribeUserFromArea = () => {
    dispatch(unsubscribeUserFromArea());
  };

  const checkPermissions = () => {
    /**
     * this will check if we have permission to send notifications
     */
    if (!canReceiveNotifications()) {
      return "unsupported";
    }
    return requestPermissionStatus();
  };

  const requestNotificationPermissionAndSubscribe = ({
    onGranted,
    onError,
  }) => {
    /**
     * This is a callback for the "Turn On" button that
     * the user will see the first time they try to subscribe
     * to an area.
     *
     * once the user grants permission, we will register the service worker and subscribe the user
     */
    window?.Notification.requestPermission((permission) => {
      if (permission === "granted") {
        onGranted();
        // register service worker, for first time
        loadServiceWorker();
        // subscribe user
        doSubscribeUserToArea();
        return;
      }
      onError();
    });
  };

  return {
    checkPermissions,
    requestNotificationPermissionAndSubscribe,
    isSubscribed,
    subscribeUserToArea: doSubscribeUserToArea,
    unsubscribeUserFromArea: doUnsubscribeUserFromArea,
  };
};
