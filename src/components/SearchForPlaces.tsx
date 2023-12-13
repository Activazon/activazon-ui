import { useDictionary } from "@/dictionaries";
import Link from "next/link";

const SearchForPlaces = () => {
  const { t } = useDictionary();
  return (
    <div className="tw-w-full tw-bg-blue-light-2 tw-rounded-lg tw-p-5 tw-border-2 tw-border-blue-light">
      <p className="tw-text-blue-dark tw-mb-4">{t("common:subscribe_cta")}</p>
      <Link
        href="/search"
        className="tw-bg-blue-light tw-py-2 tw-px-4 tw-rounded-md tw-text-white"
      >
        {t("common:search_placeholder")}
      </Link>
    </div>
  );
};

export default SearchForPlaces;
