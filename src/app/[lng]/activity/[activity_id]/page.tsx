"use client";
import Content from "@/components/Content/Content";
import ContentGroup from "@/components/Content/ContentGroup";
import ContentGroupTitle from "@/components/Content/ContentGroupTitle";
import MapInfo from "@/components/MapInfo";
import SubscribeButton from "@/components/SubscribeButton";
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
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { t, locale, thtml } = useDictionary();
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

  const actionsElements = (
    <SubscribeButton
      countrySlug={cityData?.country?.slug!}
      citySlug={cityData?.slug!}
      areaSlug={areaData?.slug}
    />
  );

  return (
    <Content>
      <MapInfo
        pulse={pulse}
        imgUrl={accesorIncidentBannerImage(incidentData)}
        lead={t("activity:mapInfo:lead")}
        title={accesorIncidentTitle(incidentData, locale)}
        description={accesorIncidentAddress(incidentData)}
        actionsElements={actionsElements}
      />

      <TextContent title={t("activity:summary")} pulse={pulse}>
        {accesorIncidentSummary(incidentData, locale)}
      </TextContent>
      {incidentData?.source && (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-gray-dark">
            {thtml("activity:read_more", {
              websiteName: incidentData?.source.website_name,
            })}
          </p>
          <Link href={incidentData?.source.canonical_link} target="_blank">
            <p className="tw-text-sm tw-text-blue-dark ">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={incidentData?.source.website_favicon}
                alt="News source favicon"
                className="tw-inline-block tw-mr-2 tw-h-[18px] tw-w-[18px]"
              />

              {incidentData?.source.title}
            </p>
          </Link>
        </div>
      )}

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
