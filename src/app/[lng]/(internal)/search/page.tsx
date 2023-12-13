"use client";
import Content from "@/components/Content/Content";
import PageTitle from "@/components/PageTitle";
import SearchManager from "@/components/SearchManager";

const Page = () => {
  return (
    <>
      <Content extraClasses="tw-mb-4">
        <PageTitle title="Search" />
      </Content>
      <SearchManager alwaysShow={true} />
    </>
  );
};

export default Page;
