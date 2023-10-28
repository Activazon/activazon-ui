import {
  useAddDeviceMutation,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
} from "@/store/api/pushNotificationsApi";
import { useCallback, useState } from "react";

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

export const getDeviceJwt = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(DEVICE_JWT_STORAGE_KEY);
};

interface UsePlaceSubscriptionOptions {
  countrySlug: string;
  citySlug: string;
  areaSlug?: string;
}

export const usePlaceSubscription = ({
  countrySlug,
  citySlug,
  areaSlug,
}: UsePlaceSubscriptionOptions) => {
  /**
   * grabs the users subscription info object
   * along with browser info to store in our database
   */
  const hasSlugs = Boolean(countrySlug && citySlug);
  // const { countrySlug, citySlug, areaSlug, hasSlugs } = usePlaceParams();
  const [addDevice, addDeviceResult] = useAddDeviceMutation();
  const [createSubscription, createSubscriptionResult] =
    useCreateSubscriptionMutation();
  const subscriptionsResult = useGetSubscriptionsQuery(
    {
      token: getDeviceJwt()!,
    },
    {
      skip: !getDeviceJwt(),
    }
  );
  const [deleteSubscription, deleteSubscriptionResult] =
    useDeleteSubscriptionMutation();
  const [actionSuccessful, setActionSuccessful] = useState(false);

  const subscription =
    subscriptionsResult.isSuccess &&
    subscriptionsResult.data.results.find((devSub: any) => {
      if (!hasSlugs) {
        return false;
      }

      if (devSub.place_city.slug_path == `/${countrySlug}/${citySlug}`) {
        return true;
      }

      if (
        areaSlug &&
        devSub.place_area?.slug_path ==
          `/${countrySlug}/${citySlug}/${areaSlug}`
      ) {
        return true;
      }

      return false;
    });
  const isSubscribed = Boolean(subscription);

  const canSubscribe = Boolean(countrySlug && citySlug);
  const citySlugPath = [countrySlug, citySlug].join("/");
  const areaSlugPath = areaSlug
    ? [countrySlug, citySlug, areaSlug].join("/")
    : null;

  const isEnrolled = () => {
    const jwtToken = getDeviceJwt();
    return jwtToken !== null;
  };

  /**
   * registers this device with our database
   * so we can send it push notifications
   */
  const registerDevice = async () => {
    const data = await getDeviceSubscriptionInfo();
    // add this device to our database, so we can send it push notifications
    const response = await addDevice({
      ...data,
    });

    if ("error" in response) {
      // error adding device
      alert("Error subscribing, could not register device");
    } else if ("data" in response) {
      const jwtToken = response.data.jwt_token;
      localStorage.setItem(DEVICE_JWT_STORAGE_KEY, jwtToken);
    }
  };

  /**
   * creates a subscription for this device
   */
  const subscribeToPlace = async () => {
    const token = getDeviceJwt();

    if (!token) {
      alert("Error subscribing, could not find device token");
      return;
    }

    await createSubscription({
      place_city_slug: citySlugPath,
      place_area_slug: areaSlugPath,
      token,
    });
    // refetch subscriptions
    subscriptionsResult.refetch();
    setActionSuccessful(true);
  };

  const unsubscribeToPlace = useCallback(async () => {
    if (!subscription) {
      alert("Something went wrong, could not remove subscription");
    }
    await deleteSubscription({
      id: subscription.id,
      token: getDeviceJwt()!,
    });
    subscriptionsResult.refetch();
    setActionSuccessful(true);
  }, [subscriptionsResult, deleteSubscription, subscription]);

  return {
    isSubscribed,
    canSubscribe,
    actionSuccessful,
    isEnrolled,
    registerDevice,
    subscribeToPlace,
    unsubscribeToPlace,
  };
};
