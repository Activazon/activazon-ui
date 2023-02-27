import { createSlice } from "@reduxjs/toolkit";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
} from "lib/client-api";

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    // subscription stuff (should probably be in its own store)
    isSubscribed: false,
    subscriptionProcessing: false,
    subscription: null,
  },
  reducers: {
    setIsSubscribedProcessing: (state, action) => {
      state.subscriptionProcessing = action.payload;
    },
    setSubcription: (state, action) => {
      state.subscription = action.payload;
      state.isSubscribed = !!action.payload;
    },
    setActivityBreakdown: (state, action) => {
      state.activityBreakdown = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
  },
});

export default subscriptionSlice.reducer;

// selectors
export const selectIsSubscribed = () => (state) =>
  state.subscription.isSubscribed;
export const selectSubscription = () => (state) =>
  state.subscription.subscription;

// functions

export const subscribeUser = (city, area) => async (dispatch) => {
  dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(true));
  // make api request
  const subscription = await createSubscription({
    city_id: city.id,
    area_id: area?.id || null,
  });

  dispatch(subscriptionSlice.actions.setSubcription(subscription));
  dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(false));
};

export const unsubscribeUser = (city, area) => async (dispatch, getState) => {
  dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(true));
  const subscription = selectSubscription()(getState());

  deleteSubscription(subscription).finally(() => {
    dispatch(subscriptionSlice.actions.setSubcription(null));
    dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(false));
  });
};

export const fetchSubscription = (city, area) => async (dispatch) => {
  dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(true));
  const subscription = await getSubscription(city.id, area?.id || null);
  if (subscription.id) {
    dispatch(subscriptionSlice.actions.setSubcription(subscription));
  }
  dispatch(subscriptionSlice.actions.setIsSubscribedProcessing(false));
};
