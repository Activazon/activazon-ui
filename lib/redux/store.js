import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./features/area";

export default configureStore({
  reducer: {
    area: areaReducer,
  },
});
