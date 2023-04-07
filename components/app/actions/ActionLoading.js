import classNames from "classnames";
import { useTrans } from "lib/trans";
const { useTrackOnce } = require("lib/track");

const ActionLoading = ({ isOrWasAction, wasAction }) => {
  const { t } = useTrans();
  useTrackOnce("appentry.loading");

  return (
    isOrWasAction("loading") && (
      <div
        className={classNames("app-content", {
          "app-content-close-animate": wasAction("loading"),
        })}
      >
        <div className="brand">
          <i className="brand-icon brand-icon-animate bi bi-activity"></i>
          <p className="brand-text-title">Activazon</p>
          <p className="brand-text">{t("Safety in your hands.")}</p>
        </div>
      </div>
    )
  );
};

export default ActionLoading;
