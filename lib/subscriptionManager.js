import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  storePushSubscription,
} from "lib/client-api";
import { useCallback, useEffect, useState } from "react";

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

export const useSubscriptionManager = (placeManager) => {
  /**
   * this hook is the brains of the subscribe button.
   * this exposes functionality to subscribe and unsubscribe the user to the area or city
   */
  const { detailsLoaded, area, city } = placeManager;
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (detailsLoaded && !subscription) {
      // load subscription
      getSubscription(city.id, area?.id || null).then((resp) => {
        setSubscription(resp);
        setIsSubscribed(!!resp?.id);
      });
    }
  }, [detailsLoaded, city, area, subscription]);

  // handles subscribing and unsubscribing the user
  // area must be loaded
  const subscribeUserToArea = useCallback(() => {
    createSubscription(city.id, area?.id).then((resp) => {
      setSubscription(resp);
      setIsSubscribed(!!resp?.id);
    });
  }, [city, area]);

  const unsubscribeUserFromArea = useCallback(() => {
    deleteSubscription(subscription).finally(() => {
      setSubscription(null);
      setIsSubscribed(false);
    });
  }, [subscription]);

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

        // get subscription
        const registration = await navigator.serviceWorker.ready;
        alert("service worker ready");
        let subscription = null;
        try {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
          });
        } catch (e) {
          alert(e);
          return;
        }
        alert("subscribed");

        // store subscription
        const subscriptionJson = subscription.toJSON();
        alert("json received");
        const apiRespose = await storePushSubscription({
          endpoint: subscription.endpoint,
          expiration_time: subscription.expirationTime,
          auth: subscriptionJson.keys.auth,
          p256dh: subscriptionJson.keys.p256dh,
          user_agent: navigator.userAgent,
        });

        alert("api response received", apiRespose.id);

        if (!apiRespose.id) {
          console.debug("error subscribing user to area", apiRespose);
          onError();
          return;
        }

        // subscribe user
        subscribeUserToArea();
        return;
      }
      onError();
    });
  };

  return {
    checkPermissions,
    requestNotificationPermissionAndSubscribe,
    subscribeUserToArea,
    unsubscribeUserFromArea,
    subscription,
    isSubscribed,
    isLoaded: typeof isSubscribed == "boolean",
  };
};
