import { useTrans } from "lib/trans";

export const ActivityBreakDownItem = ({ name, count, percentage }) => (
  <div className="col-12">
    <div className="activity-slide">
      <div className="text-content">
        <p className="label-lg">{name}</p>
        <p className="label-sm">{count}</p>
        <p className="label-sm">{percentage}%</p>
      </div>
      <div className="bar-content">
        <div className="bar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  </div>
);

const ActivityBreakdownTile = ({ children, areaName }) => {
  const { t } = useTrans();
  return (
    <div className="card card-body tile tile-activity-breakdown">
      <div className="row text-center gy-3">
        <div className="col-12">
          <i className="tile-icon bi bi-activity"></i>
        </div>
        <div className="col-12">
          <h2 className="tile-title">{t("Activity Breakdown")}</h2>
        </div>
        <div className="col-12">
          <p className="tile-description">
            {t("Top 3 activities detected in {{area_name}}", {
              area_name: areaName,
            })}
          </p>
        </div>
        <div className="row gy-1">{children}</div>
      </div>
    </div>
  );
};

export default ActivityBreakdownTile;
