"use client";
import Content from "@/components/Content/Content";
import ContentGroup from "@/components/Content/ContentGroup";
import ContentGroupTitle from "@/components/Content/ContentGroupTitle";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import MapInfo from "@/components/MapInfo";
import TileGridContainer from "@/components/TileGrid/TileGridContainer";
import TileItem from "@/components/TileGrid/TileItem";
// import { useCoordinates } from "./helper";
import { useFetchCitiesQuery, useFetchNearbyQuery } from "@/store/api/cityApi";
import { pulseObjectList } from "@/lib/pulse";
import { useDictionary } from "@/dictionaries";
import {
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesWideDefault,
  accesorPlaceSlugPath,
} from "@/lib/placeAccessors";
import { placesPath } from "@/lib/places";
import { useFetchCityIncidentsQuery } from "@/store/api/incidentApi";
import {
  accesorIncidentAreaDisplayName,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import { activityPath } from "@/lib/activity";
import ActivityTypePill from "@/components/ActivityTypePill";
import SubscribeButton from "@/components/SubscribeButton";

const Page = () => {
  const { t, locale } = useDictionary();
  // fetch nearby cities (try to use user location)
  // const { coords, coordsLoaded } = useCoordinates();
  const fetchNearbyQuery = useFetchNearbyQuery(null);
  // fetch areas for the city we are in
  const areasLimit = 5;
  const fetchIncidentsQuery = useFetchCityIncidentsQuery(
    {
      slugPath: fetchNearbyQuery.data?.place.slug_path!,
      limit: areasLimit,
    },
    {
      skip: !fetchNearbyQuery.isSuccess || !fetchNearbyQuery.data?.place.id,
    }
  );
  const activityItems = fetchIncidentsQuery.isSuccess
    ? fetchIncidentsQuery.data?.results
    : pulseObjectList(areasLimit);

  // fetch cities
  const citiesLimit = 8;
  const fetchCitiesQuery = useFetchCitiesQuery({
    limit: citiesLimit,
  });
  const cityItems = fetchCitiesQuery.isSuccess
    ? fetchCitiesQuery.data?.results
    : pulseObjectList(citiesLimit);

  const actionsElements = (
    <SubscribeButton
      countrySlug={fetchNearbyQuery.data?.place.country.slug!}
      citySlug={fetchNearbyQuery.data?.place.slug!}
      areaSlug={undefined}
    />
  );

  return (
    <Content>
      <MapInfo
        pulse={!fetchNearbyQuery.isSuccess}
        imgUrl={accessorPlaceMapImagesWideDefault(fetchNearbyQuery.data?.place)}
        lead={t("home:mapInfo:" + (fetchNearbyQuery.data?.source || "lead"), {
          country_name: fetchNearbyQuery.data?.country_name,
        })}
        title={accessorPlaceDisplayName(fetchNearbyQuery.data?.place)}
        description={t("common:recent_activity", {
          count: accessorPlaceIncidentMetricsLast3Months(
            fetchNearbyQuery.data?.place
          ),
        })}
        actionsElements={actionsElements}
      />

      <ContentGroup>
        <ContentGroupTitle title={t("common:activities")} />
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
              pulse={!fetchIncidentsQuery.isSuccess}
            />
          ))}
        </ItemListContainer>
      </ContentGroup>

      <ContentGroup>
        <ContentGroupTitle title={t("home:similiar_cities")} />
        <TileGridContainer>
          {cityItems.map((data: any) => (
            <TileItem
              key={`city-${data.id}`}
              title={accessorPlaceDisplayName(data)}
              description={t("common:recent_activity", {
                count: accessorPlaceIncidentMetricsLast3Months(data),
              })}
              url={placesPath(accesorPlaceSlugPath(data))}
              image={accessorPlaceMapImagesWideDefault(data)}
              pulse={!fetchCitiesQuery.isSuccess}
            />
          ))}
        </TileGridContainer>
      </ContentGroup>
    </Content>
  );
};

export default Page;
