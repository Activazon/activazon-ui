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
  accessorPlaceMapImagesSquareDefault,
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
import { notFound as nextNotFound } from "next/navigation";

const Page = () => {
  const { t, locale } = useDictionary();
  const {
    notFound,
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

  const firstPartCount = 4;
  const activityItemsPart1 = activityItems.slice(0, firstPartCount);
  const activityItemsPart2 = activityItems.slice(firstPartCount);

  if (notFound) {
    return nextNotFound();
  }

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
        {activityItemsPart1.map((data: any) => (
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
        <ContentGroupTitle
          title={t("country:cities", {
            countryName: placeAddress,
          })}
        />
        <TileGridContainer>
          {cityItems.map((data: any) => (
            <TileItem
              key={`city-${data.id}`}
              title={accessorPlaceDisplayName(data)}
              description={t("common:recent_activity", {
                count: accessorPlaceIncidentMetricsLast3Months(data),
              })}
              url={placesPath(accesorPlaceSlugPath(data))}
              image={accessorPlaceMapImagesSquareDefault(data)}
              pulse={!citiesLoaded}
            />
          ))}
        </TileGridContainer>
      </ContentGroup>
      {activityItemsPart2.length > 0 && (
        <ContentGroup>
          <ContentGroupTitle
            title={t("country:incidents", {
              countryName: placeAddress,
            })}
          />
          <ItemListContainer>
            {activityItemsPart2.map((data: any) => (
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
        </ContentGroup>
      )}
    </Content>
  );
};

export default Page;
