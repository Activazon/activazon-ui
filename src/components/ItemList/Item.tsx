import Link from "next/link";
import { MouseEvent } from "react";

interface ItemProps {
  title: string;
  attrLabels?: [string, string];
  description?: string;
  content?: React.ReactNode;
  url: string;
  image: string;
  pulse?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const Item = ({
  title,
  description,
  attrLabels,
  content,
  url,
  image,
  pulse,
  onClick,
}: ItemProps) => {
  return (
    <Link href={url} onClick={onClick}>
      <div className="tw-flex tw-flex-row tw-gap-4 hover:tw-bg-blue-light/10">
        {!pulse ? (
          <div className="tw-flex tw-flex-col tw-gap-0 tw-w-full">
            {attrLabels && (
              <p className="tw-text-sm">
                <span className="tw-text-blue-dark">{attrLabels[0]}</span>
                <span className="tw-text-[#7F7F7F] tw-ml-1 tw-mr-1">
                  {attrLabels[1]}
                </span>
              </p>
            )}
            <p className="tw-text-lg tw-font-demibold tw-text-blue-dark tw-leading-6">
              {title}
            </p>

            {description && (
              <p className="tw-text-gray-dark tw-text-sm">{description}</p>
            )}
            {content}
          </div>
        ) : (
          <div className="tw-grid tw-grid-cols-6 tw-gap-0 tw-animate-pulse tw-flex-grow tw-w-full">
            <div className="tw-h-5 tw-bg-slate-200 tw-rounded-full tw-col-span-4"></div>

            <div className="tw-h-3 tw-bg-slate-200 tw-rounded-full tw-col-span-3"></div>

            <div className="tw-h-3 tw-bg-slate-200 tw-rounded-full tw-col-span-5"></div>
          </div>
        )}
        {/* image */}
        <div className="tw-aspect-square tw-w-[90px] tw-h-[90px] md:tw-w-[120px] md:tw-h-[120px]  tw-bg-blue-dark tw-rounded-xl tw-shadow-md tw-overflow-hidden tw-flex-shrink-0">
          {!pulse && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img
                src={image}
                alt={title}
                className="tw-object-cover tw-w-full tw-h-full"
              />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Item;
