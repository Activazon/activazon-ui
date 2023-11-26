import { useDictionary } from "@/dictionaries";
import { useUnopenedIncidents } from "@/lib/badge";
import { getDeviceJwt } from "@/lib/subscriptions";
import { useGetUnopenedCountQuery } from "@/store/api/pushNotificationsApi";
import Link from "next/link";
import { useEffect } from "react";

const NavigationBarNotifications = () => {
  const { showBadge, altMessage } = useUnopenedIncidents();

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
