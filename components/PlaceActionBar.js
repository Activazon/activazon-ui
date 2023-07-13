const PlaceActionBarButton = ({ icon, text }) => {
  return (
    <button className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-blue-dark tw-rounded-lg tw-p-2 tw-bg-blue-bright-trans tw-w-full">
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBarButtonStandout = ({ icon, text }) => {
  return (
    <button className="tw-flex tw-flex-row tw-items-center tw-text-sm tw-justify-center tw-gap-1 tw-text-white tw-rounded-lg tw-p-2 tw-bg-blue-bright tw-w-full">
      <i className={`bi bi-${icon}`}></i>
      <span>{text}</span>
    </button>
  );
};

const PlaceActionBar = () => {
  return (
    <div className="tw-w-full tw-gap-1 tw-flex tw-flex-row">
      {/* subscribe button */}
      <PlaceActionBarButtonStandout icon="bell" text="Subscribe" />
      <PlaceActionBarButton icon="share" text="Share" />
      <PlaceActionBarButton icon="flag" text="Report" />
    </div>
  );
};

export default PlaceActionBar;
