import { useRouter } from "next/router";
import { useRef, useState } from "react";

const PLACEHOLDER_TEXT = "Anywhere";

const SearchBarInput = () => {
  const router = useRouter();
  const ref = useRef(null);
  const [searchInput, setSearchInput] = useState(PLACEHOLDER_TEXT);
  const onClick = (e) => {
    e.preventDefault();
    ref.current.focus();
    if (ref.current.textContent === PLACEHOLDER_TEXT) {
      ref.current.textContent = "";
    }
  };
  const onBlur = (e) => {
    if (ref.current.textContent.trim() === "") {
      ref.current.textContent = PLACEHOLDER_TEXT;
    }
  };
  const onChange = (e) => {
    setSearchInput(e.target.textContent);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push({ pathname: "/search", query: { v: searchInput } });
    }
  };
  return (
    <div
      onClick={onClick}
      className={
        "tw-w-full tw-h-[3.0em] tw-flex tw-items-center focus-within:tw-justify-start tw-px-4" +
        (searchInput.trim() !== "" && searchInput !== PLACEHOLDER_TEXT
          ? " tw-justify-start"
          : " tw-justify-center")
      }
    >
      <i className="bi bi-search tw-me-2 tw-text-lg"></i>
      <p
        className="tw-m-0 tw-text-sm tw-outline-none after:content-['Anywhere']"
        contentEditable={true}
        ref={ref}
        onBlur={onBlur}
        onInput={onChange}
        onKeyDown={onKeyDown}
      >
        {PLACEHOLDER_TEXT}
      </p>
    </div>
  );
};

export default SearchBarInput;
