"use client";
import { useEffect, useState } from "react";
import { useDictionary } from "@/dictionaries";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults";
import Spinner from "./Spinner";
import { useLazySearchCitiesQuery } from "@/store/api/cityApi";
import { useLazySearchAreasQuery } from "@/store/api/areaApi";
import { usePathname } from "next/navigation";

let searchTimer: NodeJS.Timeout;

const CITIES_SEARCH_LIMIT = 4;
const AREAS_SEARCH_LIMIT = 15;

interface SearchManagerProps {
  alwaysShow: boolean;
}

const SearchManager = ({ alwaysShow }: SearchManagerProps) => {
  const routePathname = usePathname();
  const { t } = useDictionary();
  const [forcePulse, setForcePulse] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCitiesTrigger, searchCitiesResult, _] =
    useLazySearchCitiesQuery();
  const [searchAreasTrigger, searchAreasResult, __] = useLazySearchAreasQuery();

  useEffect(() => {
    if (searchCitiesResult.isFetching || searchAreasResult.isLoading) {
      setForcePulse(false);
    }
    if (searchCitiesResult.isSuccess && searchAreasResult.isSuccess) {
      // we have search succesfully
      setIsSearching(false);
    }
  }, [searchCitiesResult, searchAreasResult]);

  useEffect(() => {
    // clear timer if user empty search bar
    if (searchValue.trim() == "") {
      clearTimeout(searchTimer);
      setIsSearching(false); // might be buggy
      setForcePulse(true);
      return;
    }
    // set timer to search
    searchTimer = setTimeout(() => {
      // search
      setIsSearching(true);
      searchCitiesTrigger({
        search: searchValue,
        limit: CITIES_SEARCH_LIMIT,
      });
      searchAreasTrigger({
        search: searchValue,
        limit: AREAS_SEARCH_LIMIT,
      });
    }, 1000);

    // clear timer if user type more
    return () => clearTimeout(searchTimer);
  }, [searchValue, searchCitiesTrigger, searchAreasTrigger]);

  useEffect(() => {
    setSearchValue("");
  }, [routePathname]);

  const tailContent = isSearching ? <Spinner /> : null;
  const canShowResults = alwaysShow || searchValue.trim() != "";

  // get the high of the page (including inner content)
  const pageHeight =
    typeof document != "undefined" ? document.body.scrollHeight : 0;
  const resultsMinHeight = pageHeight;

  return (
    <>
      <div
        className={`tw-relative ${!alwaysShow ? "tw-hidden md:tw-block" : ""}`}
      >
        <SearchBar
          searchValue={searchValue}
          placeholder={t("common:search_placeholder")}
          onChangeSearchValue={setSearchValue}
          tailContent={tailContent}
        />
        {canShowResults && (
          <div
            className="tw-absolute tw-top-full tw-left-0 tw-w-full tw-backdrop-blur-lg tw-bg-white/80 tw-pb-7"
            style={{ minHeight: resultsMinHeight }}
          >
            <SearchResults
              citiesPulse={!searchCitiesResult.isSuccess || forcePulse}
              areasPulse={!searchAreasResult.isSuccess || forcePulse}
              citiesResults={searchCitiesResult.data}
              areasResults={searchAreasResult.data}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchManager;
