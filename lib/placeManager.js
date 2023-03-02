import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  getArea,
  getAreaActivities,
  getAreaActivityBreakdown,
  getCity,
  getCityActivities,
  getCityActivityBreakdown,
  getCityAreas,
  getCityBrandImage,
} from "./client-api";

export const PLACE_TYPES = {
  AREA: "area",
  CITY: "city",
};

export const usePlaceManager = (
  placeType,
  countrySlug,
  citySlug,
  areaSlug,
  options
) => {
  const router = useRouter(); // to redirect to 404 if place is not found

  const [area, setArea] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);

  const [activities, setActivities] = useState(null);
  const [activityBreakdown, setActivityBreakdown] = useState(null);
  const [placeDisplayName, setPlaceDisplayName] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [areas, setAreas] = useState(null);
  const [detailsLoaded, setDetailsLoaded] = useState(false); // when area, city, country load is complete
  const [assetsLoaded, setAssetsLoaded] = useState(false); // when the optional assets load is complete
  const [errors, setErrors] = useState(null);

  const loadResourcesForPlace = useCallback(
    (_placeId) => {
      const loaders = [];

      // activities loader
      if (options?.includeActivities) {
        const limit = options?.activitiesOptions?.limit || 3;
        const loaderFunc =
          placeType === "area" ? getAreaActivities : getCityActivities;
        const loader = loaderFunc(_placeId, limit).then((resp) => {
          setActivities(resp);
        });
        loaders.push(loader); // we are going to await this later
      }

      // activity breakdown loader
      if (options?.includeActivityBreakdown) {
        const loaderFunc =
          placeType === "area"
            ? getAreaActivityBreakdown
            : getCityActivityBreakdown;
        const loader = loaderFunc(_placeId).then((resp) => {
          setActivityBreakdown(resp);
        });
        loaders.push(loader); // we are going to await this later
      }

      // brand image loader (city only)
      if (options?.includeBrandImage) {
        if (placeType === "area") {
          // not supported for area
          console.warn("Brand image not supported for area resource");
        } else {
          const loader = getCityBrandImage(_placeId).then((resp) => {
            setBrandImage(resp);
          });
          loaders.push(loader); // we are going to await this later
        }
      }

      // areas loader (city only)
      if (options?.includeAreas) {
        const limit = options?.areasOptions?.limit || 3;
        if (placeType === "area") {
          // not supported for area
          console.warn("Area list not supported for area resource");
        } else {
          const loader = getCityAreas(_placeId, limit).then((resp) => {
            setAreas(resp);
          });
          loaders.push(loader); // we are going to await this later
        }
      }

      return Promise.all(loaders).finally(() => {
        setAssetsLoaded(true);
      });
    },
    [options, placeType]
  );

  // load everything on mount
  useEffect(() => {
    if (placeType === "area") {
      // load area
      getArea(countrySlug, citySlug, areaSlug).then((resp) => {
        if (!resp.id) {
          router.push("/404");
          return;
        }

        setArea({ ...resp });
        setCity({ ...resp?.city });
        setCountry({ ...resp?.city?.country });
        setDetailsLoaded(true);
        return loadResourcesForPlace(resp?.id);
      });
    } else if (placeType === "city") {
      // load city
      getCity(countrySlug, citySlug).then((resp) => {
        if (!resp.id) {
          router.push("/404");
          return;
        }
        setArea(null);
        setCity({ ...resp });
        setCountry({ ...resp?.country });
        setDetailsLoaded(true);
        return loadResourcesForPlace(resp?.id);
      });
    }
  }, []);

  return {
    // details
    area,
    city,
    country,
    placeType,
    detailsLoaded,

    // assets
    activities,
    activityBreakdown,
    placeDisplayName,
    brandImage,
    areas,
    assetsLoaded,
    // errors TODO:
    errors,
  };
};
