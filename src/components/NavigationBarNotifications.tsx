import { useDictionary } from "@/dictionaries";
import { getDeviceJwt } from "@/lib/subscriptions";
import { useGetUnopenedCountQuery } from "@/store/api/pushNotificationsApi";
import Link from "next/link";

const NavigationBarNotifications = () => {
  const { t } = useDictionary();
  const token = getDeviceJwt();
  const { data, error, isLoading } = useGetUnopenedCountQuery(
    {
      token: token!,
    },
    {
      skip: !token,
    }
  );

  const unOpenedCount = data?.unopened_count || 0;
  const showBadge = unOpenedCount > 0;

  const altMessage = t("unread_notifications", {
    count: unOpenedCount,
  });

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
