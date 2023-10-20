import Link from "next/link";

interface ItemProps {
  title: string;
  descriptionMd?: string;
  description?: string;
  badge?: React.ReactNode;
  url: string;
  image: string;
  pulse?: boolean;
}

const Item = ({
  title,
  descriptionMd,
  description,
  badge,
  url,
  image,
  pulse,
}: ItemProps) => {
  return (
    <Link href={url}>
      <div className="tw-flex tw-flex-row tw-gap-4">
        <div
          className={
            "tw-aspect-square tw-w-[120px] tw-h-[120px] md:tw-w-[150px] md:tw-h-[150px]  tw-bg-blue-dark tw-border-2 tw-rounded-xl tw-shadow-md tw-overflow-hidden tw-inline-table " +
            (pulse ? "tw-border-blue-dark" : "tw-border-blue-light")
          }
        >
          {!pulse && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img
                src={image}
                alt={title}
                className="tw-object-cover tw-w-[120px] tw-h-[120px] md:tw-w-[150px] md:tw-h-[150px]"
              />
            </>
          )}
        </div>
        {!pulse ? (
          <div className="tw-flex tw-flex-col tw-gap-1">
            <p className="tw-text-xl tw-font-demibold tw-text-blue-dark">
              {title}
            </p>
            {descriptionMd && (
              <p className="tw-text-gray-dark">{descriptionMd}</p>
            )}
            {description && (
              <p className="tw-text-gray-dark tw-text-sm">{description}</p>
            )}
            {badge}
          </div>
        ) : (
          <div className="tw-grid tw-grid-cols-6 tw-gap-0 tw-animate-pulse tw-flex-grow">
            <div className="tw-h-7 tw-bg-slate-200 tw-rounded-full tw-col-span-4"></div>

            <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-3"></div>

            <div className="tw-h-4 tw-bg-slate-200 tw-rounded-full tw-col-span-5"></div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Item;
