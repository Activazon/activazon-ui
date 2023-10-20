import ContentGroup from "./Content/ContentGroup";

interface MapInfoProps {
  lead: string;
  title: string;
  description: string;
  imgUrl: string;
  pulse: boolean;
}

const MapInfo = ({ lead, title, description, imgUrl, pulse }: MapInfoProps) => {
  return (
    <ContentGroup>
      <div className="tw-bg-blue-dark tw-shadow-xl tw-rounded-2xl tw-aspect-[16/9] tw-w-full tw-overflow-hidden">
        {!pulse && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="tw-aspect-[16/9] tw-w-full tw-h-full"
              alt={`Map of ${title}`}
              src={imgUrl}
            />
          </>
        )}
      </div>

      {!pulse ? (
        <div>
          <p className="tw-m-0 tw-text-xs tw-text-gray-light tw-uppercase tw-font-semibold tw-text-blue-bright">
            {lead}
          </p>
          <p className="tw-m-0 tw-text-blue-dark tw-text-xl tw-font-semibold">
            {title}
          </p>
          <p className="tw-m-0 tw-text-gray-dark tw-font-normal">
            {description}
          </p>
        </div>
      ) : (
        <div className="tw-grid tw-grid-flow-row tw-grid-cols-6 tw-gap-1 tw-animate-pulse tw-flex-grow">
          <div className="tw-h-3 tw-bg-slate-200 tw-rounded-full tw-col-span-1"></div>
          <div className="tw-h-3tw-rounded-full tw-col-span-7"></div>

          <div className="tw-h-7 tw-bg-slate-200 tw-rounded-full tw-col-span-3"></div>

          <div className="tw-h-3 tw-bg-slate-200 tw-rounded-full tw-col-span-5"></div>
        </div>
      )}
    </ContentGroup>
  );
};

export default MapInfo;
