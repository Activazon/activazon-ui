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
import areasApi from "./api/area";
import incidentApi from "./api/incidentApi";

const rootReducer = combineReducers({
  locale,
  modal,
  [cityApi.reducerPath]: cityApi.reducer,
  [areasApi.reducerPath]: areasApi.reducer,
  [incidentApi.reducerPath]: incidentApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cityApi.middleware)
        .concat(areasApi.middleware)
        .concat(incidentApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
