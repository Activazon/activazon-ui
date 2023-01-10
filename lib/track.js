import mixpanel from "mixpanel-browser";
import process from "process";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);

export const trackHome = (locale) => {
  mixpanel.track("home", { locale });
};

export const trackLocaleChange = (locale) => {
  mixpanel.track("locale-change", { locale });
};

export const trackBannerSearch = (countryFilterEnabled) => {
  mixpanel.track("banner-search", {
    countryFilterEnabled,
  });
};

export const trackActivityView = (neighbourhoodId, activityId) => {
  mixpanel.track("activity-view", {
    neighbourhoodId,
    activityId,
  });
};

export const trackNeighbourhoodView = (neighbourHoodId) => {
  mixpanel.track("neighbourhood-view", {
    neighbourHoodId,
  });
};
