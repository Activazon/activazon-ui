import { useState } from "react";

const SearchInput = ({ onSearch, disableAutoSearch }) => {
  const [value, setValue] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const handleSearch = (e) => {
    // will search after typing delay
    setValue(e.target.value);
    timeoutId && clearTimeout(timeoutId);
    const timeout = setTimeout(() => {
      onSearch(e.target.value);
    }, 500);
    setTimeoutId(timeout);
  };
  return (
    <div className="search">
      <input
        onChange={handleSearch}
        className="search__input"
        type="text"
        placeholder="Search"
        value={value}
        autoFocus={true}
      />
      <div className="search__button">
        <button type="submit" className="btn ">
          <i class="bi bi-search" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
