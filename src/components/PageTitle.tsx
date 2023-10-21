import ContentGroup from "./Content/ContentGroup";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <ContentGroup>
      <p className="tw-m-0 tw-text-blue-dark tw-text-3xl tw-font-semibold">
        {title}
      </p>
      {description && (
        <p className="tw-m-0 tw-text-gray-dark tw-font-normal">{description}</p>
      )}
    </ContentGroup>
  );
};

export default PageTitle;
