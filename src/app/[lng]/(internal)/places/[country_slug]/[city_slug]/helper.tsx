"use client";
import { usePlaceParams } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import { useFetchCityQuery } from "@/store/api/cityApi";
import { accesorPlaceAddress } from "@/lib/placeAccessors";
import {
  useFetchCityIncidentTypeBreakdownQuery,
  useFetchCityIncidentsQuery,
} from "@/store/api/incidentApi";

const ACTIVITIES_LIMIT = 15;

export const useCityPageParams = () => {
  const { slugPath } = usePlaceParams();

  // get place data
  const fetchPlaceQuery = useFetchCityQuery(
    {
      slugPath: slugPath!,
    },
    {
      skip: !slugPath,
    }
  );
  const placeMapLoaded = fetchPlaceQuery.isSuccess;
  const placeData = fetchPlaceQuery.data;
  const placeAddress = placeMapLoaded ? accesorPlaceAddress(placeData) : "";

  // get place breakdown data
  const fetchPlaceBreakdownQuery = useFetchCityIncidentTypeBreakdownQuery(
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
  const fetchIncidentQuery = useFetchCityIncidentsQuery(
    {
      slugPath: slugPath!,
      limit: ACTIVITIES_LIMIT,
    },
    {
      skip: !fetchPlaceQuery.isSuccess || !slugPath,
    }
  );
  const activitiesLoaded = fetchIncidentQuery.isSuccess;
  const activityItems = fetchIncidentQuery.isSuccess
    ? fetchIncidentQuery.data?.results
    : pulseObjectList(ACTIVITIES_LIMIT);

  const notFound = (fetchPlaceQuery?.error as any)?.status == 404;

  return {
    notFound,
    placeAddress,
    placeData,
    placeMapLoaded,
    breakdownLoaded,
    breakdownData,
    activityItems,
    activitiesLoaded,
  };
};
