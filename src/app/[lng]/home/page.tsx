"use client";
import Content from "@/components/Content/Content";
import ContentGroup from "@/components/Content/ContentGroup";
import ContentGroupTitle from "@/components/Content/ContentGroupTitle";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import MapInfo from "@/components/MapInfo";
import TileGridContainer from "@/components/TileGrid/TileGridContainer";
import TileItem from "@/components/TileGrid/TileItem";
import { useCoordinates } from "./helper";
import { useFetchCitiesQuery, useFetchNearbyQuery } from "@/store/api/cityApi";
import { useFetchCityAreasQuery } from "@/store/api/area";
import { pulseObjectList } from "@/lib/pulse";
import { useDictionary } from "@/dictionaries";
import {
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesSquareDefault,
  accessorPlaceMapImagesWideDefault,
  accesorPlaceSlugPath,
} from "@/lib/placeAccessors";
import { placesPath } from "@/lib/places";

const Page = () => {
  const { t } = useDictionary();
  // fetch nearby cities (try to use user location)
  const { coords, coordsLoaded } = useCoordinates();
  const fetchNearbyQuery = useFetchNearbyQuery(coords, {
    skip: !coordsLoaded,
  });
  // fetch areas for the city we are in
  const areasLimit = 5;
  const fetchAreasQuery = useFetchCityAreasQuery(
    {
      slugPath: fetchNearbyQuery.data?.place.slug_path!,
      limit: areasLimit,
    },
    {
      skip: !fetchNearbyQuery.isSuccess || !fetchNearbyQuery.data?.place.id,
    }
  );
  const areaItems = fetchAreasQuery.isSuccess
    ? fetchAreasQuery.data?.results
    : pulseObjectList(areasLimit);

  // fetch cities
  const citiesLimit = 4;
  const fetchCitiesQuery = useFetchCitiesQuery({
    limit: citiesLimit,
  });
  const cityItems = fetchCitiesQuery.isSuccess
    ? fetchCitiesQuery.data?.results
    : pulseObjectList(citiesLimit);

  return (
    <Content>
      <MapInfo
        pulse={!fetchNearbyQuery.isSuccess}
        imgUrl={accessorPlaceMapImagesWideDefault(fetchNearbyQuery.data?.place)}
        lead={t("home:mapInfo:lead")}
        title={accessorPlaceDisplayName(fetchNearbyQuery.data?.place)}
        description={t("common:recent_activity", {
          count: accessorPlaceIncidentMetricsLast3Months(
            fetchNearbyQuery.data?.place
          ),
        })}
      />

      <ContentGroup>
        <ContentGroupTitle title={t("common:areas")} />
        <ItemListContainer>
          {areaItems.map((data: any) => (
            <Item
              key={`area-${data.id}`}
              title={accessorPlaceDisplayName(data)}
              url={placesPath(accesorPlaceSlugPath(data))}
              description={t("common:recent_activity", {
                count: accessorPlaceIncidentMetricsLast3Months(data),
              })}
              image={accessorPlaceMapImagesSquareDefault(data)}
              pulse={!fetchAreasQuery.isSuccess}
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
