import * as Panelbear from "@panelbear/panelbear-js";

export const trackLocaleChange = (locale) => {
  Panelbear.track("locale-change." + locale);
};

export const trackBannerSearch = () => {
  Panelbear.track("banner-search");
};
