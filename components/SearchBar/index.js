import { useState, useEffect } from "react";
import SearchBarInput from "./SearchBarInput";
import SearchBarResults from "./SearchBarResults";
import { searchPlaces } from "lib/client-api";
import { useTrans } from "lib/trans";

let timer = null;

const SearchBar = () => {
  const { t } = useTrans();
  const [searchInput, setSearchInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // clear timer
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // empty search input
    if (!searchInput || searchInput?.trim() == "") {
      setIsLoading(false);
      setNoResultsFound(false);
      setResults([]);
      return;
    }

    timer = setTimeout(() => {
      // start loading
      setIsLoading(true);
      setNoResultsFound(false);
      setResults([]);

      searchPlaces({ search: searchInput })
        .then((res) => {
          setNoResultsFound(res.count == 0);
          setResults(res.results);
        })
        .catch((err) => {
          setNoResultsFound(res.count == 0);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500);
  }, [searchInput]);

  return (
    <div className="tw-w-full tw-min-h-[3.0em] tw-rounded-3xl tw-bg-slate-200 tw-border-[1px] tw-border-slate-200  focus-within:tw-border-blue-bright">
      <SearchBarInput onSearchInputChange={setSearchInput} />
      {noResultsFound && (
        <p className="tw-text-center tw-py-3 tw-m-0 tw-text-sm">
          {t("{{count}} results found", { count: 0 })}
        </p>
      )}
      {isLoading && (
        <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-p-3 loader">
          <div className="tw-w-4 tw-h-4 tw-border-2 tw-border-blue-bright tw-border-solid tw-rounded-full tw-animate-spin" />
        </div>
      )}
      {!noResultsFound && results.length > 0 && (
        <SearchBarResults data={results} />
      )}
    </div>
  );
};

export default SearchBar;
