import { useAddDeviceMutation } from "@/store/api/pushNotificationsApi";
import { usePlaceParams } from "./places";

const urlBase64ToUint8Array = (base64String: string) => {
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

/**
 * collects data we need to store in our database to send push notifications
 */
export const getDeviceSubscriptionInfo = async () => {
  // get subscription
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
    ),
  });

  const subscriptionJson = subscription.toJSON();

  return {
    platform: navigator.platform,
    user_agent: navigator.userAgent,
    language_preference: navigator.language,
    endpoint: subscription.endpoint,
    expiration_time: subscription.expirationTime,
    p256dh: subscriptionJson.keys!.p256dh,
    auth: subscriptionJson.keys!.auth,
  };
};

const DEVICE_JWT_STORAGE_KEY = "device_jwt";

export const usePlaceSubscription = () => {
  /**
   * grabs the users subscription info object
   * along with browser info to store in our database
   */
  const { slugPath } = usePlaceParams();
  const [addDevice, addDeviceResult] = useAddDeviceMutation();
  const isEnrolled = () => {
    const jwtToken = localStorage.getItem(DEVICE_JWT_STORAGE_KEY);
    return jwtToken !== null;
  };

  const enrollDevice = async () => {
    const data = await getDeviceSubscriptionInfo();
    // add this device to our database, so we can send it push notifications
    const response = await addDevice({
      ...data,
    });

    if ("error" in response) {
      // error adding device
    }

    if ("data" in response) {
      const jwtToken = response.data.jwt_token;
      localStorage.setItem(DEVICE_JWT_STORAGE_KEY, jwtToken);
    }
    console.log("add device response", response);
  };

  return {
    isSubscribed: false,
    isEnrolled,
    enrollDevice,
  };
};
