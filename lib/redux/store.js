import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./features/place";
import subscriptionSlice from "./features/subscription";

export default configureStore({
  reducer: {
    place: placeReducer,
    subscription: subscriptionSlice,
  },
});
