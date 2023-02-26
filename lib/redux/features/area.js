import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    setByArea: (state, action) => {
      state.placeType = "area";
      state.area = { ...action.payload, city: undefined };
      state.city = { ...action.payload?.city, country: undefined };
      state.cuntry = { ...action.payload?.city?.country };
    },
    setIsSubscribedProcessing: (state, action) => {
      state.subscriptionProcessing = action.payload;
    },
    setSubcription: (state, action) => {
      state.subscription = action.payload;
      state.isSubscribed = action.payload ? true : null;
    },
  },
});

export default areaSlice.reducer;

// selectors
export const selectArea = () => (state) => state.area.area;
export const selectCity = () => (state) => state.area.area;
export const selectCountry = () => (state) => state.area.country;
export const selectIsSubscribed = () => (state) => state.area.isSubscribed;
export const selectPlaceDisplayName = () => (state) =>
  state.area?.displayName ||
  state.city?.displayName ||
  state.country?.displayName;

// functions
export const { setByArea } = areaSlice.actions;

export const subscribeUserToArea = (userId, areaId) => (dispatch) => {
  dispatch(areaSlice.actions.setIsSubscribedProcessing(true));
  // make api request
  const subscription = {};
  dispatch(areaSlice.actions.setSubcription(subscription));
  dispatch(areaSlice.actions.setIsSubscribedProcessing(false));
};

export const unsubscribeUserFromArea = (userId, areaId) => (dispatch) => {
  dispatch(areaSlice.actions.setIsSubscribedProcessing(true));
  // make api request
  const subscription = {};
  dispatch(areaSlice.actions.setSubcription(null));
  dispatch(areaSlice.actions.setIsSubscribedProcessing(false));
};
