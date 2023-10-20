"use client";
import Content from "@/components/Content/Content";
import ContentGroup from "@/components/Content/ContentGroup";
import ContentGroupTitle from "@/components/Content/ContentGroupTitle";
import MapInfo from "@/components/MapInfo";
import TextContent from "@/components/TextContent";
import TileGridContainer from "@/components/TileGrid/TileGridContainer";
import TileItem from "@/components/TileGrid/TileItem";
import { useDictionary } from "@/dictionaries";
import {
  accesorIncidentAddress,
  accesorIncidentBannerImage,
  accesorIncidentSummary,
  accesorIncidentTitle,
} from "@/lib/incidentAccessors";
import {
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceMapImagesSquareDefault,
} from "@/lib/placeAccessors";
import { placesPath, usePlaceParams } from "@/lib/places";
import { useFetchIncidentQuery } from "@/store/api/incidentApi";
import { useEffect } from "react";

const Page = () => {
  const { t, locale } = useDictionary();
  const { activityId } = usePlaceParams();
  const fetchActivityResult = useFetchIncidentQuery({
    incidentId: parseInt(activityId!),
  });

  useEffect(() => {
    if (!fetchActivityResult.isLoading && fetchActivityResult.isError) {
      // redirect to not found page
    }
  }, [fetchActivityResult]);

  const incidentData = fetchActivityResult.data;
  const areaData = fetchActivityResult.data?.place_area;
  const cityData = fetchActivityResult.data?.place_city;
  const pulse = !fetchActivityResult.isSuccess;

  return (
    <Content>
      <MapInfo
        pulse={pulse}
        imgUrl={accesorIncidentBannerImage(incidentData)}
        lead={t("activity:mapInfo:lead")}
        title={accesorIncidentTitle(incidentData, locale)}
        description={accesorIncidentAddress(incidentData)}
      />

      <TextContent title={t("activity:summary")} pulse={pulse}>
        {accesorIncidentSummary(incidentData, locale)}
      </TextContent>

      <ContentGroup>
        <ContentGroupTitle title={t("activity:related_places")} />
        <TileGridContainer>
          {areaData && (
            <TileItem
              key={`area-${areaData?.id}`}
              title={accessorPlaceDisplayName(areaData)}
              description={t("area:mapInfo:lead")}
              url={placesPath(accesorPlaceSlugPath(areaData))}
              image={accessorPlaceMapImagesSquareDefault(areaData)}
              pulse={pulse}
            />
          )}
          {cityData && (
            <TileItem
              key={`cityData-${cityData?.id}`}
              title={accessorPlaceDisplayName(cityData)}
              description={t("cityData:mapInfo:lead")}
              url={placesPath(accesorPlaceSlugPath(cityData))}
              image={accessorPlaceMapImagesSquareDefault(cityData)}
              pulse={pulse}
            />
          )}
        </TileGridContainer>
      </ContentGroup>
    </Content>
  );
};

export default Page;
