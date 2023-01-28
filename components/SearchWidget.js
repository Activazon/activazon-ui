import SearchInput from "components/SearchInput";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { track } from "lib/track";

const SearchWidget = () => {
  const router = useRouter();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const onSearch = (value) => {
    router.push({ pathname: "/search", query: { v: value } });
  };
  useEffect(() => {
    if (!hasSearched && searchValue.trim() != "") {
      setHasSearched(true);
      track("searchwidget");
    }
  }, [searchValue]);
  return (
    <SearchInput
      onSearch={onSearch}
      setValue={setSearchValue}
      value={searchValue}
      disableAutoSearch={true}
    />
  );
};

export default SearchWidget;
