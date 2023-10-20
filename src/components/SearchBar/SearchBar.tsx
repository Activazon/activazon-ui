import Content from "../Content/Content";
import SearchInput from "./SearchInput";

interface SearchBarProps {
  searchValue: string;
  placeholder: string;
  tailContent?: React.ReactNode;
  onChangeSearchValue: (value: string) => void;
}

const SearchBar = ({
  searchValue,
  placeholder,
  tailContent,
  onChangeSearchValue,
}: SearchBarProps) => {
  return (
    <Content>
      <div className="tw-bg-green tw-w-full tw-min-h-search-bar tw-bg-[#00000014] tw-rounded-3xl  tw-flex tw-flex-col">
        <SearchInput
          searchValue={searchValue}
          placeholder={placeholder}
          onChange={onChangeSearchValue}
          tailContent={tailContent}
        />
      </div>
    </Content>
  );
};

export default SearchBar;
