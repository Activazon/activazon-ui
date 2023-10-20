import Content from "./Content/Content";
import ContentGroup from "./Content/ContentGroup";
import ContentGroupTitle from "./Content/ContentGroupTitle";
import Item from "./ItemList/Item";
import ItemListContainer from "./ItemList/ItemListContainer";
import TileItem from "./TileGrid/TileItem";
import TileGridContainer from "./TileGrid/TileGridContainer";
import { pulseObjectList } from "@/lib/pulse";
import { placesPath } from "@/lib/places";
import { useDictionary } from "@/dictionaries";
import {
  accesorPlaceSlugPath,
  accessorPlaceDisplayName,
  accessorPlaceIncidentMetricsLast3Months,
  accessorPlaceMapImagesSquareDefault,
} from "@/lib/placeAccessors";

interface SearchResultsProps {
  citiesPulse: boolean;
  areasPulse: boolean;
  citiesResults: any;
  areasResults: any;
}

const SearchResults = ({
  citiesPulse,
  areasPulse,
  citiesResults,
  areasResults,
}: SearchResultsProps) => {
  const { t } = useDictionary();
  const cityItems = citiesPulse ? pulseObjectList(4) : citiesResults;
  const areaItems = areasPulse ? pulseObjectList(10) : areasResults;

  return (
    <Content extraClasses="tw-mt-5">
      {/* only show cities during pulsing and if we have matches */}
      {cityItems?.length > 0 && (
        <ContentGroup>
          <ContentGroupTitle title={t("common:search_city_results")} />
          <TileGridContainer>
            {cityItems.map((data: any) => (
              <TileItem
                key={`search-city-${data.id}`}
                title={accessorPlaceDisplayName(data)}
                description={t("common:recent_activity", {
                  count: accessorPlaceIncidentMetricsLast3Months(data),
                })}
                url={placesPath(accesorPlaceSlugPath(data))}
                image={accessorPlaceMapImagesSquareDefault(data)}
                pulse={citiesPulse}
              />
            ))}
          </TileGridContainer>
        </ContentGroup>
      )}
      {areaItems?.length > 0 && (
        <ContentGroup>
          <ContentGroupTitle title={t("common:search_area_results")} />
          <ItemListContainer>
            {areaItems.map((data: any) => (
              <Item
                key={`search-area-${data.id}`}
                title={accessorPlaceDisplayName(data)}
                url={placesPath(accesorPlaceSlugPath(data))}
                description={t("common:recent_activity", {
                  count: accessorPlaceIncidentMetricsLast3Months(data),
                })}
                image={accessorPlaceMapImagesSquareDefault(data)}
                pulse={areasPulse}
              />
            ))}
          </ItemListContainer>
        </ContentGroup>
      )}
      <p className="tw-text-sm tw-text-gray-dark tw-text-center">
        {t("common:search_end_of_results")}
      </p>
    </Content>
  );
};

export default SearchResults;
