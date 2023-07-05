const ContentGroupTitle = ({ title, description }) => {
  return (
    <div>
      <p className="tw-m-0 tw-text-blue-dark tw-text-xl">{title}</p>
      <p className="tw-m-0 tw-text-sm">{description}</p>
    </div>
  );
};

export default ContentGroupTitle;
