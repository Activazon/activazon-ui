import { useTrans } from "lib/trans";
import { useEffect, useState, useCallback } from "react";
import { useTrackOnce, track } from "lib/track";
import { getAreasNearby } from "lib/client-api";
import PlaceList from "components/PlaceList";
import { useRouter } from "next/router";

const ActionNearbyAreas = ({
  isOrWasAction,
  appContentClassNames,
  isBusy,
  coords,
  setIsBusy,
}) => {
  const router = useRouter();
  useTrackOnce("appentry.nearbyareas");
  const { t } = useTrans();
  const [areasNearby, setAreasNearby] = useState(null);
  const [subscribedAreas, setSubscribedAreas] = useState({});
  useTrackOnce("appentry.loading");

  useEffect(() => {
    if (coords && !areasNearby) {
      getAreasNearby({ coords, limit: 4 })
        .then(setAreasNearby)
        .then(() => {
          setIsBusy(false);
        });
    }
  }, [coords]);

  const isSubscribed = useCallback(
    (area) => {
      return subscribedAreas[area.id];
    },
    [subscribedAreas]
  );

  const onGoToActivazon = (e) => {
    e.preventDefault();
    track("appentry.gotoactivazon.click");
    router.push("/");
  };

  const onSubscribeToArea = (area) => {
    return async (e) => {
      e.preventDefault();
      setIsBusy(true);
      track("appentry.subscribearea.click", { areaId: area.id });
      const subscription = await createSubscription(area.city.id, area.id);
      setSubscribedAreas((prev) => ({ ...prev, [area.id]: subscription }));
      setIsBusy(false);
    };
  };

  const onUnsubscribeToArea = useCallback(
    (area) => {
      return async (e) => {
        e.preventDefault();
        setIsBusy(true);
        track("appentry.subscribearea.click", { areaId: area.id });
        await deleteSubscription(subscribedAreas[area.id]);
        setSubscribedAreas((prev) => ({ ...prev, [area.id]: undefined }));
        setIsBusy(false);
      };
    },
    [subscribedAreas]
  );

  return (
    isOrWasAction("nearbyAreas") && (
      <div className={appContentClassNames("nearbyAreas")}>
        <div className="brand">
          <p className="brand-text-title">{t("Subscribe to some areas")}</p>
          <p className="brand-text">
            {t(
              "We've found some areas closest to you. Subscribe to some of them to get notified of relevant activity."
            )}
          </p>
        </div>
        <div className="app-content-list">
          <PlaceList
            name="nearby-areas"
            shimmerLimit={4}
            items={areasNearby?.results}
            accessorHref={(item) => "#"}
            accessorImageUrl={(area) =>
              area.image_square_red_url || area.image_square_url
            }
            accessorTitle={(area) => area.display_name}
            accessorDescription={(area) => (
              <>
                {area.city.display_name}
                <br />
                {!isSubscribed(area) && (
                  <a href="#" onClick={onSubscribeToArea(area)}>
                    <i className="bi bi-bell me-1"></i>Subscribe
                  </a>
                )}
                {isSubscribed(area) && (
                  <a href="#" onClick={onUnsubscribeToArea(area)}>
                    <i className="bi bi-bell-fill me-1"></i>Subscribe
                  </a>
                )}
              </>
            )}
          />
        </div>
        <div className="container">
          <button
            className="btn btn-primary-light btn-lg w-100"
            type="submit"
            disabled={isBusy}
            onClick={onGoToActivazon}
          >
            {t("Go to Activazon")}
          </button>
        </div>
      </div>
    )
  );
};

export default ActionNearbyAreas;
