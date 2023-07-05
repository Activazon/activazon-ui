import { useTrans } from "lib/trans";
import ActivityBreakdownTile, {
  ActivityBreakDownItem,
  ActivityBreakDownItemShimmer,
} from "./ActivityBreakdownTileOld";

const ActivityBreakDownList = ({
  name,
  areaName,
  items,
  showPercentage,
  shimmerLimit,
}) => {
  const { t } = useTrans();
  const shimmerItems = Array.from(Array(shimmerLimit).keys());
  return (
    <ActivityBreakdownTile areaName={areaName}>
      <>
        {items?.map((breakdown, key) => (
          <ActivityBreakDownItem
            key={`${name}--${key}`}
            name={t(breakdown.activity_type_name + "__plural")}
            count={showPercentage ? breakdown.count : null}
            percentage={breakdown.percentage}
          />
        ))}
        {!items &&
          shimmerItems.map((_, key) => (
            <ActivityBreakDownItemShimmer key={`${name}--${key}`} />
          ))}
      </>
    </ActivityBreakdownTile>
  );
};

export default ActivityBreakDownList;
