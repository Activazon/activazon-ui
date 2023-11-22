"use client";

import {
  getDeviceJwt,
  getDeviceSubscriptionInfo,
  subscribeAndGetDeviceSubscriptionInfo,
} from "@/lib/subscriptions";
import { useEffect } from "react";
import { useUpdateDeviceMutation } from "./api/pushNotificationsApi";
import { pushNotificationPermission } from "@/lib/pushNotifications";

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

const ServiceWorkerProvider = ({ children }: ServiceWorkerProviderProps) => {
  const [updateDevice, _] = useUpdateDeviceMutation();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          //
        },
        (error) => {
          console.error(`Service worker registration failed: ${error}`);
        }
      );
    } else {
      console.error("Service workers are not supported.");
    }

    // sometimes permissions get lost (expired or browswer takes it away from us),
    // so we need to check and re-register
    const deviceJwt = getDeviceJwt();
    if (pushNotificationPermission() === "granted" && deviceJwt) {
      getDeviceSubscriptionInfo()
        .then((subscriptionInfo) => {
          alert(JSON.stringify(subscriptionInfo, null, 2));
          if (subscriptionInfo) {
            updateDevice({
              token: deviceJwt,
              ...subscriptionInfo,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return children;
};

export default ServiceWorkerProvider;
