"use client";
import { usePlaceParams } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import { useFetchCityQuery } from "@/store/api/cityApi";
import { accesorPlaceAddress } from "@/lib/placeAccessors";
import {
  useFetchCityIncidentTypeBreakdownQuery,
  useFetchCityIncidentsQuery,
} from "@/store/api/incidentApi";

const ACTIVITIES_LIMIT = 5;

export const useCityPageParams = () => {
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

  return {
    placeAddress,
    placeData,
    placeMapLoaded,
    breakdownLoaded,
    breakdownData,
    activityItems,
    activitiesLoaded,
  };
};
