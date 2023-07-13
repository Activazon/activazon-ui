import { useTrans } from "lib/trans";

const ActivityBreakDownItem = ({ activityCount, activityTypeName }) => {
  const { t } = useTrans();
  return (
    <div className="tw-border-2 tw-border-blue-dark tw-rounded-lg tw-p-2">
      <div>
        <p className="tw-text-blue-dark tw-text-6xl tw-font-bold tw-m-0 tw-inline">
          {activityCount}
        </p>
        <p className="tw-text-blue-dark tw-m-0 tw-inline tw-ms-1 tw-text-sm">
          {t("Activities")}
        </p>
      </div>
      <p className="tw-text-blue-dark tw-m-0">
        <i className="bi bi-shield-fill-exclamation"></i> {activityTypeName}
      </p>
    </div>
  );
};

const ActivityBreakDown = ({ areaDisplayName, data }) => {
  const { t } = useTrans();
  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-3">
      <div>
        <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
          {t("Type of activities")}
        </p>
        <p className="tw-m-0">
          {t("The type of activities detected in <b>{{areaDisplayName}}</b>", {
            areaDisplayName,
          })}
        </p>
      </div>
      <div className="tw-grid tw-grid-cols-2 tw-gap-3">
        {data?.data.map((item, index) => (
          <ActivityBreakDownItem
            key={`activity-breakdown-${index}`}
            activityCount={item.count}
            activityTypeName={t(item.activity_type_name)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityBreakDown;
