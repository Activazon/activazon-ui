import { useDictionary } from "@/dictionaries";
import { getDeviceJwt } from "@/lib/subscriptions";
import { useGetUnopenedCountQuery } from "@/store/api/pushNotificationsApi";
import Link from "next/link";
import { useEffect } from "react";

const NavigationBarNotifications = () => {
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

  // probably not the best way to do this, i would like to do this via sw
  useEffect(() => {
    if (token) {
      // set timmer that will refetch every 5 minutes
      const interval = setInterval(() => {
        refetch();
      }, 5 * 60 * 1000);

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          // refetch when app is in foreground
          refetch();
        }
      };

      // Add visibility change event listener
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearInterval(interval);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [token, refetch]);

  return (
    <div>
      <Link
        href="/notifications"
        className={"tw-text-blue-dark tw-text-[1.5rem] tw-px-3"}
        title={altMessage}
      >
        <i className="bi bi-bell-fill tw-relative">
          {showBadge && (
            <div className="tw-absolute tw-bottom-0 tw-left-4 tw-w-3 tw-h-3 tw-bg-blue-light tw-rounded-full tw-shadow"></div>
          )}
        </i>
      </Link>
    </div>
  );
};

export default NavigationBarNotifications;
