import { useSelector, useDispatch } from "react-redux";
import {
  selectArea,
  selectCity,
  selectCountry,
  selectPlaceDisplayName,
  selectActivities,
  selectActivityBreakdown,
  selectPlaceType,
  selectAreas,
  selectBrandImage,
  loadPlaceByArea,
  loadPlaceByCity,
  loadActivities,
  loadActivityBreakdown,
  loadBrandImage,
  loadAreas,
} from "lib/redux/features/place";

import { useEffect } from "react";

export const usePlaceManager = (countrySlug, citySlug, areaSlug, options) => {
  const dispatch = useDispatch();
  const area = useSelector(selectArea());
  const city = useSelector(selectCity());
  const country = useSelector(selectCountry());
  const placeType = useSelector(selectPlaceType());
  const activities = useSelector(selectActivities());
  const activityBreakdown = useSelector(selectActivityBreakdown());
  const placeDisplayName = useSelector(selectPlaceDisplayName());
  const brandImage = useSelector(selectBrandImage());
  const areas = useSelector(selectAreas());
  const placeId = {
    area: area?.id,
    city: city?.id,
  }[placeType];

  // load everything
  useEffect(() => {
    if (countrySlug && citySlug && areaSlug && !area) {
      // load area
      dispatch(loadPlaceByArea(countrySlug, citySlug, areaSlug));
    } else if (countrySlug && citySlug) {
      // load city
      dispatch(loadPlaceByCity(countrySlug, citySlug));
    }
  }, [countrySlug, citySlug, areaSlug]);

  useEffect(() => {
    if (placeType) {
      if (!activities && options?.includeActivities) {
        dispatch(
          loadActivities(
            placeType,
            placeId,
            options?.activitiesOptions?.limit || 5
          )
        );
      }
      if (!activityBreakdown && options?.includeActivityBreakdown) {
        dispatch(loadActivityBreakdown(placeType, placeId));
      }
      if (!brandImage && options?.includeBrandImage) {
        dispatch(loadBrandImage(placeType, placeId));
      }
      if (!areas && options?.includeAreas) {
        dispatch(
          loadAreas(placeType, placeId, options?.areasOptions?.limit || 5)
        );
      }
    }
  }, [placeType, area, city, activities, activityBreakdown]);

  return {
    isLoaded: !!placeType,
    area,
    city,
    country,
    placeType,
    activities,
    activityBreakdown,
    placeDisplayName,
    brandImage,
    areas,
  };
};
