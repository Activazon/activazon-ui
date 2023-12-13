"use client";
import Content from "@/components/Content/Content";
import PageTitle from "@/components/PageTitle";
import SearchManager from "@/components/SearchManager";
import { useDictionary } from "@/dictionaries";

const Page = () => {
  const { t } = useDictionary();
  return (
    <>
      <Content extraClasses="tw-mb-4">
        <PageTitle title={t("common:search")} />
      </Content>
      <SearchManager alwaysShow={true} />
    </>
  );
};

export default Page;
