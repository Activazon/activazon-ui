"use client";
import { useEffect, useState } from "react";
import { useDictionary } from "@/dictionaries";
import { placesPath } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import {
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesSquareDefault,
} from "@/lib/placeAccessors";
import PageTitle from "@/components/PageTitle";
import { getDeviceJwt } from "@/lib/subscriptions";
import { isDisplayModeStandalone } from "@/lib/browser";
import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import { useGetSubscriptionsQuery } from "@/store/api/pushNotificationsApi";

const Page = () => {
  const { t } = useDictionary();
  const dispatch = useActivazonDispatch();
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(getDeviceJwt());

  useEffect(() => {
    if (!isDeviceRegistered && !isDisplayModeStandalone()) {
      dispatch(
        setModel({
          name: "pwa_install",
          data: undefined,
        })
      );
    }
  }, [isDeviceRegistered, dispatch]);

  const subscriptionsResult = useGetSubscriptionsQuery(
    {
      token: getDeviceJwt()!,
    },
    {
      skip: !getDeviceJwt(),
    }
  );

  const activityItems = subscriptionsResult.isSuccess
    ? subscriptionsResult.data?.results
    : pulseObjectList(5);

  return (
    <Content>
      <PageTitle title={t("common:subscriptions")} />
      <ItemListContainer>
        {activityItems.map((sub: any) => {
          const data = sub.place_area || sub.place_city;
          return (
            <Item
              key={`area-${sub.id}`}
              title={accessorPlaceDisplayName(data)}
              url={placesPath(accesorPlaceSlugPath(data))}
              description={t("common:recent_activity", {
                count: accessorPlaceIncidentMetricsLast3Months(data),
              })}
              image={accessorPlaceMapImagesSquareDefault(data)}
              pulse={!subscriptionsResult.isSuccess}
            />
          );
        })}
      </ItemListContainer>
    </Content>
  );
};

export default Page;
