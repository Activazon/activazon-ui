"use client";
import { useDictionary } from "@/dictionaries";
import Link from "next/link";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

const Page = () => {
  const { t, locale } = useDictionary();
  const onChangeLanguage = (changeToLocale: string) => {};

  return (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <p className="tw-m-0 tw-text-gray-dark tw-text-xl tw-font-medium">
        {t("common:language")}
      </p>
      <div className="tw-w-full tw-bg-slate-100 tw-rounded-md">
        {LANGUAGES.map(({ value, label }) => {
          return (
            <Link
              href={`/${value}/menu`}
              className="tw-w-full tw-px-4 tw-text-left tw-border-b last:tw-border-b-0 tw-text-blue-dark tw-font-medium tw-flex tw-flex-row tw-items-center tw-cursor-pointer"
              key={`language-select-${value}`}
              // onClick={() => onChangeLanguage(value)}
            >
              <span className="tw-w-full tw-py-3">{label}</span>
              {locale == value && (
                <i className="bi bi-check-lg tw-text-2xl"></i>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
