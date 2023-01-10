import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTrans } from "../lib/trans";
import { trackBannerSearch } from "../lib/track";

let searchTimeout = null;

const Banner = ({
  title,
  description,
  showSearch,
  searchCountry,
  bottomContent,
}) => {
  const router = useRouter();
  const { i } = useTrans();
  const [hasStartedSearching, setHasStartedSearching] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    // track that the user has started searching
    if (hasStartedSearching) {
      trackBannerSearch(searchCountry ? true : false);
    }
  }, [hasStartedSearching]);

  const onSelectResult = (nid) => {
    router.push(`/n/${nid}`);
  };

  const onSearch = (e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      (async () => {
        if (e.target.value.trim() !== "") {
          setIsSearching(true);
          setHasStartedSearching(true);
          const searchResp = await fetch(
            `/api/search?country=${searchCountry || ""}&search=${
              e.target.value
            }`,
            {
              method: "GET",
            }
          );
          const searchRespJson = await searchResp.json();
          setSearchResults(searchRespJson);
        } else {
          setIsSearching(false);
          setSearchResults(null);
        }
      })();
    }, 800);
  };

  return (
    <div className="banner">
      <div className="container">
        <p className="banner-text banner-title text-capitalize">{title}</p>
        {description && (
          <p className="banner-text banner-description text-capitalize">
            {description}
          </p>
        )}
        {showSearch && (
          <div className="search-form rounded">
            <input
              type="text"
              placeholder={i("Search for your neighbourhood")}
              onChange={onSearch}
            />
            <button type="submit" className="btn">
              <i className="bi bi-search"></i>
            </button>
            {isSearching && (
              <ul className="list-group search-results-list-group">
                {searchResults &&
                  searchResults.count > 0 &&
                  searchResults.results.map((neighbourhood) => (
                    <li
                      key={`neighbourhood-result-${neighbourhood.id}`}
                      className="list-group-item text-capitalize"
                      onClick={() => onSelectResult(neighbourhood.id)}
                    >
                      {neighbourhood.name} {neighbourhood.city}{" "}
                      {neighbourhood.country}
                    </li>
                  ))}
                {searchResults && searchResults.count === 0 && (
                  <li className="list-group-item">
                    {i("No neighbourhoods found")}
                  </li>
                )}
                {!searchResults && (
                  <li className="list-group-item">{i("Searching...")}</li>
                )}
              </ul>
            )}
          </div>
        )}
        {bottomContent}
      </div>
    </div>
  );
};

export default Banner;
