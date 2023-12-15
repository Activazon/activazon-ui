"use client";
import { useDictionary } from "@/dictionaries";
import { usePlaceParams } from "@/lib/places";
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
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesWideDefault,
} from "@/lib/placeAccessors";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentDate,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import SubscribeButton from "@/components/SubscribeButton";
import { notFound as nextNotFound } from "next/navigation";

const ACTIVITIES_LIMIT = 15;

const Page = () => {
  const { t, locale } = useDictionary();
  const { countrySlug, citySlug, areaSlug, slugPath } = usePlaceParams();

  // get place data
  const fetchPlaceQuery = useFetchAreaQuery({
    countrySlug,
    citySlug,
    areaSlug: areaSlug!,
  });
  const placeMapLoaded = fetchPlaceQuery.isSuccess;
  const placeData = fetchPlaceQuery.data;
  const placeAddress = placeMapLoaded ? accesorPlaceAddress(placeData) : "";

  // get place breakdown data
  const fetchPlaceBreakdownQuery = useFetchAreaIncidentTypeBreakdownQuery(
    {
      slugPath: slugPath!,
    },
    {
      skip: !fetchPlaceQuery.isSuccess || !slugPath,
    }
  );
  const breakdownLoaded = fetchPlaceBreakdownQuery.isSuccess;
  const breakdownData = fetchPlaceBreakdownQuery.data;

  // get activities
  const fetchIncidentsQuery = useFetchAreaIncidentsQuery(
    {
      slugPath: slugPath!,
      limit: ACTIVITIES_LIMIT,
    },
    {
      skip: !fetchPlaceQuery.isSuccess || !slugPath,
    }
  );
  const activitiesLoaded = fetchIncidentsQuery.isSuccess;
  const activityItems = fetchIncidentsQuery.isSuccess
    ? fetchIncidentsQuery.data?.results
    : pulseObjectList(ACTIVITIES_LIMIT);

  const actionsElements = (
    <SubscribeButton
      countrySlug={countrySlug}
      citySlug={citySlug}
      areaSlug={areaSlug}
    />
  );

  const notFound = (fetchPlaceQuery?.error as any)?.status == 404;
  if (notFound) {
    return nextNotFound();
  }

  return (
    <Content>
      <MapInfo
        pulse={!placeMapLoaded}
        imgUrl={accessorPlaceMapImagesWideDefault(placeData)}
        lead={t("area:mapInfo:lead")}
        title={placeAddress}
        description={t("common:recent_activity", {
          count: accessorPlaceIncidentMetricsLast3Months(placeData),
        })}
        actionsElements={actionsElements}
      />

      <PlaceActivityBreakdown
        pulse={!breakdownLoaded}
        areaDisplayName={accessorPlaceDisplayName(placeData)}
        data={breakdownData}
      />

      <ItemListContainer>
        {activityItems.map((data: any) => (
          <Item
            key={`area-${data.id}`}
            attrLabels={[
              accesorIncidentAreaDisplayName(data),
              accesorIncidentDate(data, locale),
            ]}
            title={accesorIncidentTitle(data, locale)}
            content={
              <span>
                <ActivityTypePill name={accesorIncidentType(data)} />
              </span>
            }
            url={activityPath(data.id)}
            image={accesorIncidentListImage(data)}
            pulse={!activitiesLoaded}
          />
        ))}
      </ItemListContainer>
    </Content>
  );
};

export default Page;
