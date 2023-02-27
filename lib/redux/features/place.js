import { createSlice } from "@reduxjs/toolkit";
import {
  getArea,
  getAreaActivities,
  getAreaActivityBreakdown,
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
      state.city = { ...action.payload, country: undefined };
      state.country = { ...action.payload?.country };
    },
    setActivityBreakdown: (state, action) => {
      state.activityBreakdown = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
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

// functions
export const { setByArea, setByCity } = placeSlice.actions;

export const loadPlaceByArea =
  (countrySlug, citySlug, areaSlug) => async (dispatch) => {
    const area = await getArea(countrySlug, citySlug, areaSlug);
    dispatch(setByArea(area));
  };

export const loadPlaceByCity = (countrySlug, citySlug) => async (dispatch) => {
  // TODO: complete
  // const city = await getArea(countrySlug, citySlug, areaSlug);
  // dispatch(setByCity(city));
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
      // activities = await getCityActivities(placeId);
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
      // activities = await getCityActivities(placeId);
    } else {
      throw new Error("Invalid place type: " + placeType);
    }
    dispatch(placeSlice.actions.setActivityBreakdown(activities));
  };
