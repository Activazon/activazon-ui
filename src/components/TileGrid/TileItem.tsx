import Link from "next/link";

interface TileItemProps {
  title: string;
  description: string;
  url: string;
  image: string;
  pulse?: boolean;
}

const TileItem = ({ title, description, url, image, pulse }: TileItemProps) => {
  return (
    <Link href={url} className="tw-contents">
      <div className="hover:tw-bg-blue-light/10">
        <div className="tw-bg-blue-dark tw-aspect-square tw-rounded-lg tw-relative tw-shadow-md tw-overflow-hidden tw-cursor-pointer ">
          {!pulse && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={title}
                className="tw-object-cover tw-w-full tw-h-full"
              />
            </>
          )}
        </div>
        {!pulse ? (
          <div className="tw-mt-1">
            <p className="tw-text-lg tw-font-demibold tw-text-blue-dark tw-leading-6">
              {title}
            </p>
            <p className="tw-text-sm tw-text-[#7F7F7F]">{description}</p>
          </div>
        ) : (
          <div className="tw-mt-1 tw-animate-pulse tw-grid tw-grid-cols-3">
            <div className="tw-h-5 tw-bg-slate-200 tw-rounded-full tw-col-span-2 md:tw-mb-2"></div>
            <div className="tw-h-3 tw-bg-slate-200 tw-rounded-full tw-col-span-3 tw-mt-1"></div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TileItem;
