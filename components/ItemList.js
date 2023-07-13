import Link from "next/link";
export const ItemList = ({ children }) => {
  return (
    <div className="tw-w-full tw-gap-3 tw-flex tw-flex-col">{children}</div>
  );
};

export const ItemActivityTypePill = ({ name }) => (
  <p className="tw-rounded-full tw-inline-block tw-mb-0 tw-text-sm tw-font-bold tw-mt-2 tw-uppercase tw-text-white tw-bg-blue-bright tw-px-3 tw-py-1">
    <i className="bi bi-shield-fill-exclamation"></i> {name}
  </p>
);

export const Item = ({ href, imgUrl, itemType, title, message, pill }) => {
  return (
    <Link href={href} className="tw-no-underline tw-text-gray-dark">
      <>
        <div className="tw-flex tw-flex-row tw-gap-3">
          <img
            className="tw-bg-blue-dark tw-rounded-lg tw-w-[110px] tw-h-[110px]"
            src={imgUrl}
          />
          <div>
            <p className="tw-m-0 tw-text-sm tw-text-gray-light tw-uppercase tw-font-bold">
              {itemType}
            </p>
            <p className="tw-m-0 tw-text-blue-dark tw-text-xl">{title}</p>
            {message && <p className="tw-m-0 tw-text-sm">{message}</p>}
            {pill}
          </div>
        </div>
      </>
    </Link>
  );
};
