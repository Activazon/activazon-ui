import { useTrans } from "lib/trans";

const SearchTypeSelector = ({ searchType, onSearchTypeChange }) => {
  const { t } = useTrans();
  const onChange = (st) => (e) => {
    e.preventDefault();
    onSearchTypeChange(st);
  };
  return (
    <ul class="nav justify-content-center search-type-select mt-4">
      <li class="nav-item">
        <a
          class={`nav-link${searchType === "city" ? " active" : ""}`}
          aria-current="page"
          href="#"
          onClick={onChange("city")}
        >
          {t("Cities")}
        </a>
      </li>
      <li class="nav-item">
        <a
          class={`nav-link${searchType === "area" ? " active" : ""}`}
          href="#"
          onClick={onChange("area")}
        >
          {t("Neighbourhoods")}
        </a>
      </li>
    </ul>
  );
};

export default SearchTypeSelector;
