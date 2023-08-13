import SearchBarInput from "./SearchBarInput";
import SearchBarResults from "./SearchBarResults";
const SearchBar = () => {
  return (
    <div className="tw-w-full tw-min-h-[3.0em] tw-rounded-3xl tw-bg-slate-200 tw-border-[1px] tw-border-slate-200  focus-within:tw-border-blue-bright">
      <SearchBarInput />
      <SearchBarResults />
    </div>
  );
};

export default SearchBar;
