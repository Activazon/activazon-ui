interface ContentGroupTitleProps {
  title: string;
  description?: string;
}

const ContentGroupTitle = ({ title, description }: ContentGroupTitleProps) => {
  return (
    <div>
      <p className="tw-m-0 tw-text-blue-dark tw-text-xl tw-font-semibold">
        {title}
      </p>
      {description && <p className="tw-m-0 tw-text-sm">{description}</p>}
    </div>
  );
};

export default ContentGroupTitle;
