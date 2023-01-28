import { useState } from "react";

const SearchInput = ({ onSearch, disableAutoSearch }) => {
  const [value, setValue] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const handleAutoSearch = (e) => {
    // will search after typing delay
    e.preventDefault();
    setValue(e.target.value);
    timeoutId && clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      onSearch(e.target.value);
    }, 500);
    setTimeoutId(timeout);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(value);
  };
  return (
    <div className="search">
      <input
        onChange={handleAutoSearch}
        className="search__input"
        type="text"
        placeholder="Search"
        value={value}
        autoFocus={true}
      />
      <div className="search__button">
        <button type="submit" className="btn" onClick={handleSearch}>
          <i class="bi bi-search" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
