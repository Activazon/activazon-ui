import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

interface PlaceParams extends Params {
  country_slug: string;
  city_slug: string;
  area_slug?: string;
  activity_id?: string;
}

export const placesPath = (path: string) => `/places${path}`;

export const joinAddress = (address: string[]) => address.join(", ");

export const usePlaceParams = () => {
  const {
    country_slug: countrySlug,
    city_slug: citySlug,
    area_slug: areaSlug,
    activity_id: activityId,
  } = useParams<PlaceParams>();

  const slugPath =
    "/" + [countrySlug, citySlug, areaSlug].filter((slug) => slug).join("/");

  return {
    countrySlug,
    citySlug,
    areaSlug,
    slugPath,
    activityId,
    hasSlugs: Boolean(countrySlug && citySlug),
  };
};
