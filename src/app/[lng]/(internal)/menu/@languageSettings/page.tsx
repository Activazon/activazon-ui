"use client";
import { useDictionary } from "@/dictionaries";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const Page = () => {
  const { t, locale } = useDictionary();
  const onChangeLocale = (targetedLocale: string) => {
    console.log("onChangeLocale", onChangeLocale);
    document.cookie = `NEXT_LOCALE=${targetedLocale}; max-age=31536000; path=/`;
    window.location.href = "/menu"; // to force redirect
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <p className="tw-m-0 tw-text-gray-dark tw-text-xl tw-font-medium">
        {t("common:language")}
      </p>
      <div className="tw-w-full tw-bg-slate-100 tw-rounded-md">
        {LANGUAGES.map(({ value, label }) => {
          return (
            <button
              onClick={() => onChangeLocale(value)}
              className="tw-w-full tw-px-4 tw-text-left tw-border-b last:tw-border-b-0 tw-text-blue-dark tw-font-medium tw-flex tw-flex-row tw-items-center tw-cursor-pointer"
              key={`language-select-${value}`}
            >
              <span className="tw-w-full tw-py-3">{label}</span>
              {locale == value && (
                <i className="bi bi-check-lg tw-text-2xl"></i>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
