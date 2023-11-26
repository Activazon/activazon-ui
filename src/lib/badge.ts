import { useDictionary } from "@/dictionaries";
import { getDeviceJwt } from "@/lib/subscriptions";
import { useGetUnopenedCountQuery } from "@/store/api/pushNotificationsApi";
import { useEffect } from "react";

export const useUnopenedIncidents = () => {
  const { t } = useDictionary();
  const token = getDeviceJwt();
  const { data, refetch } = useGetUnopenedCountQuery(
    {
      token: token!,
    },
    {
      skip: !token,
    }
  );

  const unOpenedCount = data?.unopened_count || 0;
  const showBadge = unOpenedCount > 0 || !token; // we want to show badge if there is no token to try and get the user's attention

  const altMessage = t("unread_notifications", {
    count: unOpenedCount,
  });

  useEffect(() => {
    // update badge
    if (navigator.setAppBadge) {
      if (unOpenedCount && unOpenedCount > 0) {
        navigator.setAppBadge(unOpenedCount);
      } else {
        navigator.clearAppBadge();
      }
    } else {
      console.warn("BadgeAPI not supported on this device");
    }
  }, [unOpenedCount]);

  return {
    unOpenedCount,
    showBadge,
    altMessage,
    refetchAndUpdateBadge: refetch,
  };
};
