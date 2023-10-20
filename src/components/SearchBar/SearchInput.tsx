"use client";
import { useState, useRef, RefObject, FormEvent, useEffect } from "react";

interface SearchInputProps {
  searchValue: string;
  tailContent?: React.ReactNode;
  placeholder: string;
  onChange: (searchValue: string) => void;
}

const SearchInput = ({
  searchValue: parentSearchValue,
  tailContent,
  placeholder,
  onChange,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [showPlaceHolder, setShowPlaceHolder] = useState(true);
  const focusRef: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (parentSearchValue.trim() == "") {
      if (focusRef.current) {
        onChange("");
        setSearchValue("");
        setShowPlaceHolder(true);
        focusRef.current.textContent = "";
      }
    }
  }, [parentSearchValue, onChange]);

  const onSearchInputClick = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };
  const onFocus = () => {
    setShowPlaceHolder(false);
  };
  const onBlur = () => {
    if (searchValue.trim() == "") {
      setSearchValue("");
      setShowPlaceHolder(true);
    }
  };
  const onInputChange = (e: FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent || "";
    onChange(value);
    setSearchValue(value);
    setShowPlaceHolder(false);
  };

  return (
    <div
      className="tw-h-search-bar tw-full tw-bg-transparent tw-px-6 tw-outline-none tw-text-gray-dark tw-text-lg tw-flex tw-items-center tw-justify-left tw-cursor-text"
      onClick={onSearchInputClick}
    >
      {/*  Placeholder */}
      {showPlaceHolder && (
        <p className="tw-text-gray-dark tw-text-lg">
          <i className="bi bi-search tw-pr-3"></i>
          {placeholder}
        </p>
      )}
      {/* input itself */}
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck={false}
        className="tw-full tw-pr-3 tw-bg-transparent tw-outline-none tw-text-black tw-text-lg"
        ref={focusRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInputChange}
      />
      {tailContent}
    </div>
  );
};

export default SearchInput;
