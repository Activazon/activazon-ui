"use client";
import { useDictionary } from "@/dictionaries";
import { usePlaceParams } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import {
  useFetchCityActivitiesQuery,
  useFetchCityQuery,
} from "@/store/api/cityApi";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import MapInfo from "@/components/MapInfo";
import PlaceActivityBreakdown from "@/components/PlaceActivityBreakdown";
import { activityPath } from "@/lib/activity";
import ActivityTypePill from "@/components/ActivityTypePill";
import {
  accesorPlaceAddress,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesWideDefault,
} from "@/lib/placeAccessors";
import {
  useFetchCityIncidentTypeBreakdownQuery,
  useFetchCityIncidentsQuery,
} from "@/store/api/incidentApi";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";

const ACTIVITIES_LIMIT = 5;

const Page = () => {
  const { t, locale } = useDictionary();
  const { slugPath } = usePlaceParams();

  // get place data
  const fetchPlaceQuery = useFetchCityQuery({
    slugPath,
  });
  const placeMapLoaded = fetchPlaceQuery.isSuccess;
  const placeData = fetchPlaceQuery.data;
  const placeAddress = placeMapLoaded ? accesorPlaceAddress(placeData) : "";

  // get place breakdown data
  const fetchPlaceBreakdownQuery = useFetchCityIncidentTypeBreakdownQuery(
    {
      slugPath,
    },
    {
      skip: !fetchPlaceQuery.isSuccess,
    }
  );
  const breakdownLoaded = fetchPlaceBreakdownQuery.isSuccess;
  const breakdownData = fetchPlaceBreakdownQuery.data;

  // get activities
  const fetchIncidentQuery = useFetchCityIncidentsQuery(
    {
      slugPath,
      limit: ACTIVITIES_LIMIT,
    },
    {
      skip: !fetchPlaceQuery.isSuccess,
    }
  );
  const activitiesLoaded = fetchIncidentQuery.isSuccess;
  const activityItems = fetchIncidentQuery.isSuccess
    ? fetchIncidentQuery.data?.results
    : pulseObjectList(ACTIVITIES_LIMIT);

  return (
    <Content>
      <MapInfo
        pulse={!placeMapLoaded}
        imgUrl={accessorPlaceMapImagesWideDefault(placeData)}
        lead={t("city:mapInfo:lead")}
        title={placeAddress}
        description={t("common:recent_activity", {
          count: accessorPlaceIncidentMetricsLast3Months(placeData),
        })}
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
            title={accesorIncidentTitle(data, locale)}
            descriptionMd={accesorIncidentAreaDisplayName(data)}
            badge={
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
