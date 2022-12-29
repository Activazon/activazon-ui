import { useRouter } from "next/router";
import { useState } from "react";
import { useTrans } from "../lib/trans";

let searchTimeout = null;

const Banner = ({ title, description, showSearch, searchCountry }) => {
  const router = useRouter();
  const { i } = useTrans();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
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
        <p className="banner-text banner-title">{title}</p>
        {description && (
          <p className="banner-text banner-description">{description}</p>
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
                      key={`neighbourhood-${neighbourhood.id}`}
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
      </div>
    </div>
  );
};

export default Banner;
