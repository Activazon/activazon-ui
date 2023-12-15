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
    </Content>
  );
};

export default Page;
