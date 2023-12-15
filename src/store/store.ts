import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

// slices
import locale from "./slices/locale";
import modal from "./slices/modals";

// apis
import cityApi from "./api/cityApi";
import areasApi from "./api/areaApi";
import countryApi from "./api/countryApi";
import incidentApi from "./api/incidentApi";
import pushNotificationsApi from "./api/pushNotificationsApi";

const rootReducer = combineReducers({
  locale,
  modal,
  [cityApi.reducerPath]: cityApi.reducer,
  [areasApi.reducerPath]: areasApi.reducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [incidentApi.reducerPath]: incidentApi.reducer,
  [pushNotificationsApi.reducerPath]: pushNotificationsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cityApi.middleware)
        .concat(areasApi.middleware)
        .concat(countryApi.middleware)
        .concat(incidentApi.middleware)
        .concat(pushNotificationsApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
