"use client";
import { usePlaceParams } from "@/lib/places";
import { pulseObjectList } from "@/lib/pulse";
import { accesorPlaceAddress } from "@/lib/placeAccessors";
import {
  useFetchCountryIncidentsQuery,
  useFetchCountryIncidentTypeBreakdownQuery,
} from "@/store/api/incidentApi";
import { useFetchCountryQuery } from "@/store/api/countryApi";
import { useFetchCitiesQuery } from "@/store/api/cityApi";

const ACTIVITIES_LIMIT = 15;

export const useCountryPageParams = () => {
  const { slugPath } = usePlaceParams();

  console.log("slugPath", slugPath);

  // get place data
  const fetchPlaceQuery = useFetchCountryQuery(
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

  // // get place breakdown data
  const fetchPlaceBreakdownQuery = useFetchCountryIncidentTypeBreakdownQuery(
    {
      slugPath: slugPath!,
    },
    {
      skip: !fetchPlaceQuery.isSuccess || !slugPath,
    }
  );
  const breakdownLoaded = fetchPlaceBreakdownQuery.isSuccess;
  const breakdownData = fetchPlaceBreakdownQuery.data;

  // // get activities
  const fetchIncidentQuery = useFetchCountryIncidentsQuery(
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

  // fetch cities
  const countrySlug = placeData?.slug;
  const citiesLimit = 4;
  const fetchCitiesQuery = useFetchCitiesQuery(
    {
      limit: citiesLimit,
      countrySlug: countrySlug,
    },
    {
      skip: !countrySlug,
    }
  );
  const citiesLoaded = fetchCitiesQuery.isSuccess;
  const cityItems = fetchCitiesQuery.isSuccess
    ? fetchCitiesQuery.data?.results
    : pulseObjectList(citiesLimit);

  return {
    placeAddress,
    placeData,
    placeMapLoaded,
    breakdownLoaded,
    breakdownData,
    activityItems,
    activitiesLoaded,
    cityItems,
    citiesLoaded,
  };
};
