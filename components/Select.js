import React, { useState, useRef, useEffect } from "react";

const Select = ({ placeholder, options, onSelect }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(null);
  const selectRef = useRef(null);

  const onSelectOption = (optionValue) => () => {
    setSelectedOptionValue(optionValue);
    setIsOptionsOpen(false);
    onSelect && onSelect(optionValue);
  };

  const handleToggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (isOptionsOpen) {
      if (e.key === "ArrowUp" && focusedOptionIndex > 0) {
        setFocusedOptionIndex(focusedOptionIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        focusedOptionIndex < options.length - 1
      ) {
        setFocusedOptionIndex(focusedOptionIndex + 1);
      } else if (e.key === "Enter" && focusedOptionIndex !== null) {
        onSelectOption(options[focusedOptionIndex].value)();
        setIsOptionsOpen(false);
      }
    } else {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOptionsOpen(true);
      }
    }
  };

  useEffect(() => {
    // Close options when clicking outside
    const handleOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedOptionLabel = options.find(
    (option) => option.value === selectedOptionValue
  )?.label;

  return (
    <div className="tw-relative" ref={selectRef}>
      <button
        className="tw-border tw-border-gray-400 tw-py-3 tw-px-3 tw-rounded-xl tw-text-left tw-w-full"
        onClick={handleToggleOptions}
        onKeyDown={handleKeyDown}
        aria-expanded={isOptionsOpen}
        aria-haspopup="listbox"
      >
        <div className="tw-flex tw-flex-row">
          <div className="tw-flex-1">
            {!selectedOptionValue && (
              <span className="tw-text-gray-400">
                {placeholder || "Select one"}
              </span>
            )}
            {selectedOptionValue && (
              <span className="tw-text-blue-dark">{selectedOptionLabel}</span>
            )}
          </div>
          <div className="">
            <i className="bi bi-chevron-down"></i>
          </div>
        </div>
      </button>
      {isOptionsOpen && (
        <div
          className="tw-absolute tw-top-[100%] tw-left-0 tw-right-0 tw-bg-white tw-border tw-border-gray-400 tw-rounded-xl tw-shadow-lg tw-mt-1 tw-flex tw-flex-col tw-overflow-hidden"
          role="listbox"
        >
          {options.map(({ value, label }, index) => (
            <button
              key={value}
              className={`tw-p-3 tw-text-left hover:tw-bg-gray-200 ${
                focusedOptionIndex === index ? "tw-bg-gray-200" : ""
              }`}
              onClick={onSelectOption(value)}
              onMouseEnter={() => setFocusedOptionIndex(index)}
              role="option"
              aria-selected={focusedOptionIndex === index}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
