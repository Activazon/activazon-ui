import { useTrans } from "lib/trans";

const { track } = require("lib/track");
const { useRouter } = require("next/router");
import { getAreasNearby } from "lib/client-api";

const ActionAskForPermissionLocation = ({
  isOrWasAction,
  appContentClassNames,
  setAreasNearby,
  switchAction,
  setIsBusy,
}) => {
  const { t } = useTrans();
  const router = useRouter();
  const onAllowLocation = (e) => {
    let watchId;
    e.preventDefault();
    setIsBusy(true);
    track("appentry.location.click");

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          track("appentry.location.granted");
          // fetch nearby areas
          switchAction("nearbyAreas");
          getAreasNearby({ coords: position.coords, limit: 4 })
            .then(setAreasNearby)
            .then(() => {
              setIsBusy(false);
              navigator.geolocation.clearWatch(watchId);
            });
        },
        (error) => {
          track("appentry.location.denied");
          router.push("/");
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }
      );
    } else {
      // TODO: error and go straight to website
      track("appentry.location.unsupported");
      router.push("/");
    }
  };
  const onAllowLocationLater = (e) => {
    e.preventDefault();
    setIsBusy(true);
    track("appentry.locationlater.click");
    router.push("/");
  };

  return (
    isOrWasAction("askForPermissionLocation") && (
      <div className={appContentClassNames("askForPermissionLocation")}>
        <div className="brand">
          <div className="brand-hero">
            <img src="/undraw/undraw_best_place_re_lne9.svg" />
          </div>
          <p className="brand-text-title">
            {t("Customize your alerts with personalized locations")}
          </p>
          <p className="brand-text">
            {t(
              "Personalize your alerts by sharing your location with Activazon."
            )}
          </p>
        </div>
        <div className="app-content-list">
          <form>
            <button className="btn btn-primary-light" onClick={onAllowLocation}>
              {t("Allow Location")}
            </button>
            <button className="btn btn-clear" onClick={onAllowLocationLater}>
              {t("I'll do it later")}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ActionAskForPermissionLocation;
