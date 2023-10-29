import React from "react";
import ContentGroup from "./Content/ContentGroup";

interface MapInfoProps {
  lead: string;
  title: string;
  description: string;
  imgUrl: string;
  extraImgUrls?: string[];
  pulse: boolean;
  actionsElements: React.ReactNode;
}

const MapInfo = ({
  lead,
  title,
  description,
  imgUrl,
  extraImgUrls,
  pulse,
  actionsElements,
}: MapInfoProps) => {
  const imgUrls = [imgUrl, ...(extraImgUrls || [])];
  return (
    <ContentGroup>
      <div className="tw-bg-blue-dark tw-shadow-xl tw-rounded-2xl tw-aspect-[16/9] tw-w-full tw-overflow-hidden">
        {!pulse && (
          <div className="tw-snap-x tw-flex tw-flex-row tw-snap-mandatory tw-overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imgUrls.map((url, index) => (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={`map-info-${title}-${index}`}
                  className="tw-aspect-[16/9] tw-w-full tw-h-full tw-snap-start"
                  alt={`Image of ${title} (#${index})`}
                  src={url}
                />
              </>
            ))}
          </div>
        )}
      </div>
      <div className="tw-flex tw-justify-between">
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
        {actionsElements && (
          <div className="tw-flex tw-items-center tw-justify-start">
            {actionsElements}
          </div>
        )}
      </div>
    </ContentGroup>
  );
};

export default MapInfo;
