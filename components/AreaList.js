import AreasTile, { AreaItem, AreaItemShimmer } from "components/AreasTile";
import { useTrans } from "lib/trans";
import { explorePath } from "lib/urls";
import Link from "next/link";

const AreaList = ({
  areaName,
  areas,
  areasSurplus,
  areasSurplusHref,
  shimmerLimit,
  name,
}) => {
  const { t, p } = useTrans();
  const shimmerItems = Array.from(Array(shimmerLimit).keys());
  return (
    <AreasTile areaName={areaName}>
      {areas && (
        <>
          {areas?.results?.map((area, key) => (
            <AreaItem
              key={`${name}--${key}`}
              name={area.display_name}
              href={explorePath(area.slug_path)}
              description={p(
                "1 activity in the last 5 months",
                "{{count}} activities in the last 5 months",
                area.activity_total_last5months
              )}
            />
          ))}
          {areasSurplus > 0 && (
            <Link
              href={areasSurplusHref}
              className="btn btn-load-more w-100 mt-2"
            >
              {t("Load {{count}} more", { count: areasSurplus })}
            </Link>
          )}
        </>
      )}
      {!areas &&
        shimmerItems.map((_, key) => (
          <AreaItemShimmer key={`${name}--${key}`} />
        ))}
    </AreasTile>
  );
};

export default AreaList;
