import { useTrans } from "lib/trans";

export const AreaItem = ({ name, description }) => (
  <div className="col-12">
    <div className="card-item">
      <p className="label-lg">{name}</p>
      <p className="label-sm">{description}</p>
    </div>
  </div>
);

const AreasTile = ({ children, areaName }) => {
  const { t } = useTrans();
  return (
    <div className="card card-body tile tile-areas">
      <div className="row text-center gy-3">
        <div className="col-12">
          <i className="tile-icon bi bi-houses-fill"></i>
        </div>
        <div className="col-12">
          <h2 className="tile-title">{t("Most Active Areas")}</h2>
        </div>
        <div className="col-12">
          <p className="tile-description">
            {t("Areas with the most activity in {{area_name}}", {
              area_name: areaName,
            })}
          </p>
        </div>
        <div className="row gy-1">{children}</div>
      </div>
    </div>
  );
};

export default AreasTile;