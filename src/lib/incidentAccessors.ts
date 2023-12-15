import { dateDisplay } from "./datetime";
import {
  accesorPlaceAddress,
  accessorPlaceMapImagesSquareDefault,
  accessorPlaceMapImagesWideDefault,
} from "./placeAccessors";

export const accesorIncidentBannerImage = (incident: any) => {
  const place = incident?.place_area || incident?.place_city;
  return accessorPlaceMapImagesWideDefault(place);
};

export const accesorIncidentExtraBannerImages = (incident: any) => {
  return [incident?.source?.top_image].filter((x) => x);
};

export const accesorIncidentTitle = (incident: any, locale: string) => {
  if (incident?.contents) {
    return incident.contents[locale].title;
  }
};

export const accesorIncidentSummary = (incident: any, locale: string) => {
  if (incident?.contents) {
    return incident.contents[locale].summary;
  }
};

export const accesorIncidentListImage = (incident: any) => {
  const place = incident?.place_area || incident?.place_city;
  return accessorPlaceMapImagesSquareDefault(place);
};

export const accesorIncidentAddress = (incident: any) => {
  const place = incident?.place_area || incident?.place_city;
  return accesorPlaceAddress(place);
};

export const accesorIncidentType = (incident: any) => {
  return incident.type?.name;
};

export const accesorIncidentAreaDisplayName = (incident: any) => {
  if (incident?.place_area) {
    return incident.place_area.display_name;
  }
  return incident?.place_city?.display_name || "";
};

export const accesorIncidentCityDisplayName = (incident: any) => {
  return incident?.place_city?.display_name || "";
};

export const accesorIncidentDate = (incident: any, locale: string) => {
  return incident ? dateDisplay(incident.date_detected, locale) || "-" : "-";
};
