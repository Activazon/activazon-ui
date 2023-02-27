import { useSelector, useDispatch } from "react-redux";
import {
  selectIsSubscribed,
  selectArea,
  selectCity,
  subscribeUser,
  unsubscribeUser,
  fetchSubscription,
} from "lib/redux/features/area";
import { storePushSubscription } from "lib/client-api";
import { useCallback, useEffect } from "react";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const useSubscriptionManager = () => {
  /**
   * this hook is the brains of the subscribe button.
   * this exposes functionality to subscribe and unsubscribe the user to the area or city
   */
  const dispatch = useDispatch();
  const isSubscribed = useSelector(selectIsSubscribed());
  const area = useSelector(selectArea());
  const city = useSelector(selectCity());
  useEffect(() => {
    // find out if the user is subscribed to the area
    if (city) {
      dispatch(fetchSubscription(city, area));
    }
  }, [city, area]);

  // handles subscribing and unsubscribing the user
  // area must be loaded in redux for this to work
  const doSubscribeUserToArea = useCallback(() => {
    dispatch(subscribeUser(city, area));
  }, [city, area]);
  const doUnsubscribeUserFromArea = useCallback(() => {
    dispatch(unsubscribeUser());
  }, [city, area]);

  const checkPermissions = () => {
    /**
     * this will check if we have permission to send notifications
     */
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return "unsupported";
    }

    return Notification.permission;
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
    window?.Notification.requestPermission(async (permission) => {
      if (permission === "granted") {
        onGranted();
        // TODO: doing this in app
        // // register service worker, for first time
        // navigator.serviceWorker.register("/sw.js");

        // get subscription
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
          ),
        });

        // store subscription
        const subscriptionJson = subscription.toJSON();
        const apiRespose = await storePushSubscription({
          endpoint: subscription.endpoint,
          expiration_time: subscription.expirationTime,
          auth: subscriptionJson.keys.auth,
          p256dh: subscriptionJson.keys.p256dh,
          user_agent: navigator.userAgent,
        });

        if (!apiRespose.id) {
          console.debug("error subscribing user to area", apiRespose);
          onError();
          return;
        }

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
