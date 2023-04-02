import { useState } from "react";
import { useTrans } from "lib/trans";

const SearchInput = ({ onSearch, disableAutoSearch, setValue, value }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const { t } = useTrans();
  const handleAutoSearch = (e) => {
    // will search after typing delay
    e.preventDefault();
    setValue(e.target.value);
    timeoutId && clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      onSearch(e.target.value);
    }, 800);
    setTimeoutId(timeout);
  };
  const handleJustSetValue = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(value);
  };
  return (
    <div className="search">
      <div className="geo__icon">
        <i className="bi bi-geo-alt-fill" />
      </div>
      <input
        onChange={disableAutoSearch ? handleJustSetValue : handleAutoSearch}
        className="search__input safe"
        type="text"
        id="search__input"
        placeholder={t("Search for your city or neighbourhood", {}, true)}
        value={value}
        autoFocus={true}
      />

      <button
        type="submit"
        className="btn search__button"
        onClick={handleSearch}
      >
        <i className="bi bi-search" />
      </button>
    </div>
  );
};

export default SearchInput;
