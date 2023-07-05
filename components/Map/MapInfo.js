import { useTrans } from "lib/trans";

const MapInfo = ({ areaType, addressParts, activityCount }) => {
  const { t } = useTrans();
  return (
    <div>
      <p className="tw-m-0 tw-text-sm tw-text-gray-light tw-uppercase tw-font-bold">
        {areaType}
      </p>
      <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
        {addressParts.join(", ")}
      </p>
      <p className="tw-m-0 tw-text-sm">
        {t("{{ActivityCount}} activities detected in the last 5 months", {
          ActivityCount: activityCount,
        })}
      </p>
    </div>
  );
};

export default MapInfo;
