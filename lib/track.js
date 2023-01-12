import mixpanel from "mixpanel-browser";
import process from "process";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: true });

export const trackHome = (locale) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanel.track("home", { locale });
};

export const trackLocaleChange = (locale) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN &&
    mixpanel.track("locale-change", { locale });
};

export const trackBannerSearch = (countryFilterEnabled) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN &&
    mixpanel.track("banner-search", {
      countryFilterEnabled,
    });
};

export const trackActivityView = (neighbourhoodId, activityId) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN &&
    mixpanel.track("activity-view", {
      neighbourhoodId,
      activityId,
    });
};

export const trackNeighbourhoodView = (neighbourHoodId) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN &&
    mixpanel.track("neighbourhood-view", {
      neighbourHoodId,
    });
};
