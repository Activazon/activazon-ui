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
      <div
        className={
          "tw-bg-blue-dark tw-aspect-[16/9] tw-rounded-lg tw-relative tw-shadow-md tw-border-2 tw-overflow-hidden tw-cursor-pointer " +
          (pulse ? "tw-border-blue-dark" : "tw-border-blue-light")
        }
      >
        {!pulse && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="tw-object-cover tw-w-full tw-h-full"
            />
            <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-3 tw-pb-1 tw-bg-gradient-to-t tw-from-blue-dark tw-to-transparent">
              <p className="tw-text-white tw-font-medium sm:tw-text-lg tw-shadow-sm">
                {title}
              </p>
              <p className="tw-text-white tw-hidden md:tw-block tw-text-sm">
                {description}
              </p>
            </div>
          </>
        )}
        {pulse && (
          <>
            <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-3 tw-pb-2 tw-animate-pulse tw-grid tw-grid-cols-3">
              <div className="tw-h-5 tw-bg-[#FFFFFF50] tw-rounded-full tw-col-span-2 md:tw-mb-2"></div>
              <div className="tw-h-3 tw-bg-[#FFFFFF50] tw-rounded-full tw-col-span-3 tw-hidden md:tw-block"></div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default TileItem;
