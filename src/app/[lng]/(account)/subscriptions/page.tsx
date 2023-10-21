"use client";
import { useEffect, useState } from "react";
import { useDictionary } from "@/dictionaries";
import { placesPath, usePlaceParams } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import MapInfo from "@/components/MapInfo";
import PlaceActivityBreakdown from "@/components/PlaceActivityBreakdown";
import { activityPath } from "@/lib/activity";
import ActivityTypePill from "@/components/ActivityTypePill";
import { useFetchAreaQuery } from "@/store/api/areaApi";
import {
  useFetchAreaIncidentTypeBreakdownQuery,
  useFetchAreaIncidentsQuery,
} from "@/store/api/incidentApi";
import {
  accesorPlaceAddress,
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesSquareDefault,
  accessorPlaceMapImagesWideDefault,
} from "@/lib/placeAccessors";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import PageTitle from "@/components/PageTitle";
import { getDeviceJwt } from "@/lib/subscriptions";
import { isDisplayModeStandalone } from "@/lib/browser";
import { setModel } from "@/store/slices/modals";
import { useActivazonDispatch } from "@/store/hooks";
import ContentGroup from "@/components/Content/ContentGroup";
import { useGetSubscriptionsQuery } from "@/store/api/pushNotificationsApi";

const ACTIVITIES_LIMIT = 15;

const Page = () => {
  const { t, locale } = useDictionary();
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

  console.log("activityItems", activityItems);
  return (
    <Content>
      <PageTitle
        title={t("common:subscriptions")}
        description="Places you are subscribed to"
      />
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
