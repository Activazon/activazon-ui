"use client";

import { getDeviceSubscriptionInfo } from "@/lib/subscriptions";
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
    if (pushNotificationPermission() === "granted") {
      getDeviceSubscriptionInfo().then((subscriptionInfo) => {
        if (subscriptionInfo) {
          updateDevice({
            ...subscriptionInfo,
          });
        }
      });
    }
  }, []);
  return children;
};

export default ServiceWorkerProvider;
