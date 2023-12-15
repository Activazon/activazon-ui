"use client";
import { useDictionary } from "@/dictionaries";
import Content from "@/components/Content/Content";
import Item from "@/components/ItemList/Item";
import ItemListContainer from "@/components/ItemList/ItemListContainer";
import MapInfo from "@/components/MapInfo";
import PlaceActivityBreakdown from "@/components/PlaceActivityBreakdown";
import { activityPath } from "@/lib/activity";
import ActivityTypePill from "@/components/ActivityTypePill";
import {
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesWideDefault,
} from "@/lib/placeAccessors";

import {
  accesorIncidentCityDisplayName,
  accesorIncidentDate,
  accesorIncidentListImage,
  accesorIncidentTitle,
  accesorIncidentType,
} from "@/lib/incidentAccessors";
import { useCountryPageParams } from "../helper";
import ContentGroup from "@/components/Content/ContentGroup";
import ContentGroupTitle from "@/components/Content/ContentGroupTitle";
import TileGridContainer from "@/components/TileGrid/TileGridContainer";
import TileItem from "@/components/TileGrid/TileItem";
import { placesPath } from "@/lib/places";

const Page = () => {
  const { t, locale } = useDictionary();
  const {
    placeAddress,
    placeData,
    placeMapLoaded,
    breakdownLoaded,
    breakdownData,
    activityItems,
    activitiesLoaded,
    cityItems,
    citiesLoaded,
  } = useCountryPageParams();

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
        actionsElements={null}
      />

      <PlaceActivityBreakdown
        pulse={!breakdownLoaded}
        areaDisplayName={accessorPlaceDisplayName(placeData)}
        data={breakdownData}
      />

      <ItemListContainer>
        {activityItems.map((data: any) => (
          <Item
            key={`activity-${data.id}`}
            attrLabels={[
              accesorIncidentCityDisplayName(data),
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
              pulse={!citiesLoaded}
            />
          ))}
        </TileGridContainer>
      </ContentGroup>
    </Content>
  );
};

export default Page;
