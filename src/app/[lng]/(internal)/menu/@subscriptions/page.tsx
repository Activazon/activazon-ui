"use client";

import { useDictionary } from "@/dictionaries";
import {
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesSquareDefault,
} from "@/lib/placeAccessors";
import { placesPath } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import { getDeviceJwt } from "@/lib/subscriptions";
import { useGetSubscriptionsQuery } from "@/store/api/pushNotificationsApi";
import Link from "next/link";

const Page = () => {
  const { t } = useDictionary();

  const subscriptionsResult = useGetSubscriptionsQuery(
    {
      token: getDeviceJwt()!,
    },
    {
      skip: !getDeviceJwt(),
    }
  );
  const subscriptionItems = subscriptionsResult.isSuccess
    ? subscriptionsResult.data?.results
    : pulseObjectList(4);

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <p className="tw-m-0 tw-text-gray-dark tw-text-xl tw-font-medium">
        {t("common:subscriptions")}
      </p>
      <div className="tw-flex tw-flex-col tw-bg-slate-100 tw-rounded-md">
        {subscriptionItems.map((sub: any) => {
          const data = sub.place_area || sub.place_city;
          const title = accessorPlaceDisplayName(data);
          return (
            <Link
              href={placesPath(accesorPlaceSlugPath(data))}
              key={`subscription-${sub.id}`}
              className="tw-w-full tw-p-2 tw-flex tw-flex-row tw-gap-3 tw-border-b last:tw-border-b-0"
            >
              <div className="tw-aspect-square tw-w-[60px] tw-h-[60px] tw-rounded-md tw-overflow-hidden tw-flex-shrink-0 tw-bg-blue-dark">
                {/* eslint-disable-next-line @next/next/no-img-element  */}
                <img
                  src={accessorPlaceMapImagesSquareDefault(data)}
                  alt={title}
                  className="tw-object-cover tw-w-[70px] tw-h-[70px]"
                />
              </div>
              <div className="tw-w-full">
                <p className="tw-text-lg tw-font-medium tw-text-blue-dark">
                  {title}
                </p>
                <p className="tw-text-sm tw-text-gray-dark">
                  {t("common:recent_activity", {
                    count: accessorPlaceIncidentMetricsLast3Months(data),
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
