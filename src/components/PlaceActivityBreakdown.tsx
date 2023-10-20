import { useDictionary } from "@/dictionaries";

interface PlaceActivityBreakDownItemProps {
  activityCount: number;
  activityTypeName: string;
}

interface PlaceActivityBreakdownProps {
  pulse: boolean;
  areaDisplayName: string;
  data: any;
}

const PlaceActivityBreakdownItem = ({
  activityCount,
  activityTypeName,
}: PlaceActivityBreakDownItemProps) => {
  const { t } = useDictionary();
  return (
    <div className="tw-border-2 tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-2">
      <div>
        <p className="tw-text-blue-dark tw-text-6xl tw-font-bold tw-m-0 tw-inline">
          {activityCount}
        </p>
        <p className="tw-text-gray-dark tw-m-0 tw-inline tw-ml-1 tw-text-sm">
          {t("common:activities")}
        </p>
      </div>
      <p className="tw-text-blue-dark tw-m-0">
        <i className="bi bi-shield-fill-exclamation"></i> {activityTypeName}
      </p>
    </div>
  );
};

const PlaceActivityBreakdown = ({
  pulse,
  areaDisplayName,
  data,
}: PlaceActivityBreakdownProps) => {
  const { t, thtml } = useDictionary();
  const { t: t2 } = useDictionary("activity_types");
  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-3">
      <div>
        <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
          {t("activity_breakdown:title")}
        </p>
        <p className="tw-m-0">
          {thtml("activity_breakdown:description", { areaDisplayName })}
        </p>
      </div>
      <div className="tw-grid tw-grid-cols-2 tw-gap-3">
        {data?.map((item: any, index: number) => (
          <PlaceActivityBreakdownItem
            key={`activity-breakdown-${index}`}
            activityCount={item.count}
            activityTypeName={t2(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaceActivityBreakdown;
