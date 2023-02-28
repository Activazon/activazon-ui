import { createSlice } from "@reduxjs/toolkit";
import {
  getArea,
  getAreaActivities,
  getAreaActivityBreakdown,
  getCity,
  getCityActivities,
  getCityActivityBreakdown,
  getCityAreas,
  getCityBrandImage,
} from "lib/client-api";

export const placeSlice = createSlice({
  name: "place",
  initialState: {
    placeType: null,
    area: null,
    city: null,
    country: null,

    activityBreakdown: null,
    activities: null,
    brandImage: null,
    areas: null,
  },
  reducers: {
    setByArea: (state, action) => {
      state.placeType = "area";
      state.area = { ...action.payload };
      state.city = { ...action.payload?.city };
      state.country = { ...action.payload?.city?.country };
    },
    setByCity: (state, action) => {
      state.placeType = "city";
      state.area = null;
      state.city = { ...action.payload };
      state.country = { ...action.payload?.country };
    },
    setActivityBreakdown: (state, action) => {
      state.activityBreakdown = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
    setBrandImage: (state, action) => {
      state.brandImage = action.payload;
    },
    setAreas: (state, action) => {
      state.areas = action.payload;
    },
  },
});

export default placeSlice.reducer;

// selectors
export const selectArea = () => (state) => state.place.area;
export const selectCity = () => (state) => state.place.city;
export const selectCountry = () => (state) => state.place.country;
export const selectPlaceType = () => (state) => state.place.placeType;
export const selectActivities = () => (state) => state.place.activities;
export const selectActivityBreakdown = () => (state) =>
  state.place.activityBreakdown;
export const selectPlaceDisplayName = () => (state) =>
  state.place.area?.displayName ||
  state.place.city?.displayName ||
  state.place.country?.displayName;
export const selectBrandImage = () => (state) => state.place.brandImage;
export const selectAreas = () => (state) => state.place.areas;

// functions
export const { setByArea, setByCity } = placeSlice.actions;

export const loadPlaceByArea =
  (countrySlug, citySlug, areaSlug) => async (dispatch) => {
    const area = await getArea(countrySlug, citySlug, areaSlug);
    dispatch(setByArea(area));
  };

export const loadPlaceByCity = (countrySlug, citySlug) => async (dispatch) => {
  // TODO: complete
  const city = await getCity(countrySlug, citySlug);
  dispatch(setByCity(city));
};

export const loadActivities =
  (placeType, placeId, limit = 5) =>
  async (dispatch) => {
    /**
     * load activities for area or city
     */
    let activities = [];
    if (placeType === "area") {
      activities = await getAreaActivities(placeId, limit);
    } else if (placeType === "city") {
      activities = await getCityActivities(placeId, limit);
    } else {
      throw new Error("Invalid place type: " + placeType);
    }
    dispatch(placeSlice.actions.setActivities(activities));
  };

export const loadActivityBreakdown =
  (placeType, placeId) => async (dispatch) => {
    /**
     * load activities for area or city
     */
    let activities = [];
    if (placeType === "area") {
      activities = await getAreaActivityBreakdown(placeId);
    } else if (placeType === "city") {
      activities = await getCityActivityBreakdown(placeId);
    } else {
      throw new Error("Invalid place type: " + placeType);
    }
    dispatch(placeSlice.actions.setActivityBreakdown(activities));
  };

export const loadBrandImage = (placeType, placeId) => async (dispatch) => {
  let brandImage = null;
  if (placeType === "city") {
    brandImage = await getCityBrandImage(placeId);
  } else {
    throw new Error("brand image not supported for place type: " + placeType);
  }
  dispatch(placeSlice.actions.setBrandImage(brandImage));
};

export const loadAreas =
  (placeType, placeId, limit = 5) =>
  async (dispatch) => {
    let areas = null;
    if (placeType === "city") {
      areas = await getCityAreas(placeId, limit);
    } else {
      throw new Error("area list not supported for place type: " + placeType);
    }
    dispatch(placeSlice.actions.setAreas(areas));
  };
