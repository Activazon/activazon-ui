import { createSlice } from "@reduxjs/toolkit";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
} from "lib/client-api";

export const areaSlice = createSlice({
  name: "area",
  initialState: {
    placeType: null,
    area: null,
    city: null,
    country: null,
    isSubscribed: false,
    subscriptionProcessing: false,
    subscription: null,
    activityBreakdown: null,
    activities: null,
  },
  reducers: {
    setByArea: (state, action) => {
      state.placeType = "area";
      state.area = { ...action.payload, city: undefined };
      state.city = { ...action.payload?.city, country: undefined };
      state.country = { ...action.payload?.city?.country };
    },
    setByCity: (state, action) => {
      state.placeType = "city";
      state.city = { ...action.payload, country: undefined };
      state.country = { ...action.payload?.country };
    },
    setIsSubscribedProcessing: (state, action) => {
      state.subscriptionProcessing = action.payload;
    },
    setSubcription: (state, action) => {
      state.subscription = action.payload;
      state.isSubscribed = action.payload ? true : null;
    },
    setActivityBreakdown: (state, action) => {
      state.activityBreakdown = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
  },
});

export default areaSlice.reducer;

// selectors
export const selectArea = () => (state) => state.area.area;
export const selectCity = () => (state) => state.area.city;
export const selectCountry = () => (state) => state.area.country;
export const selectIsSubscribed = () => (state) => state.area.isSubscribed;
export const selectSubscription = () => (state) => state.area.subscription;
export const selectPlaceDisplayName = () => (state) =>
  state.area?.displayName ||
  state.city?.displayName ||
  state.country?.displayName;
export const selectActivityBreakdown = () => (state) =>
  state.area.activityBreakdown;
export const selectActivities = () => (state) => state.area.activities;

// functions
export const { setByArea, setByCity } = areaSlice.actions;

export const subscribeUser = (city, area) => async (dispatch) => {
  dispatch(areaSlice.actions.setIsSubscribedProcessing(true));
  // make api request
  const subscription = await createSubscription({
    city_id: city.id,
    area_id: area?.id || null,
  });

  dispatch(areaSlice.actions.setSubcription(subscription));
  dispatch(areaSlice.actions.setIsSubscribedProcessing(false));
};

export const unsubscribeUser = (city, area) => async (dispatch, getState) => {
  dispatch(areaSlice.actions.setIsSubscribedProcessing(true));
  const subscription = selectSubscription()(getState());
  await deleteSubscription(subscription);
  dispatch(areaSlice.actions.setSubcription(null));
  dispatch(areaSlice.actions.setIsSubscribedProcessing(false));
};

export const fetchSubscription = (city, area) => async (dispatch) => {
  dispatch(areaSlice.actions.setIsSubscribedProcessing(true));
  const subscription = await getSubscription(city.id, area?.id || null);
  if (subscription.id) {
    dispatch(areaSlice.actions.setSubcription(subscription));
  }
  dispatch(areaSlice.actions.setIsSubscribedProcessing(false));
};
