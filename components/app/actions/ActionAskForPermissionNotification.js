import { useTrans } from "lib/trans";
const { track } = require("lib/track");
import { storePushSubscription } from "lib/client-api";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const ActionAskForPermissionNotification = ({
  isOrWasAction,
  appContentClassNames,
  isBusy,
  switchAction,
  setIsBusy,
}) => {
  const { t } = useTrans();

  const onAllowNotifications = (e) => {
    e.preventDefault();
    setIsBusy(true);
    track("appentry.notification.click");

    window?.Notification.requestPermission(async (permission) => {
      if (permission === "granted") {
        track("appentry.notification.granted");
        // store subscription
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
          ),
        });

        const subscriptionJson = subscription.toJSON();

        storePushSubscription({
          endpoint: subscription.endpoint,
          expiration_time: subscription.expirationTime,
          auth: subscriptionJson.keys.auth,
          p256dh: subscriptionJson.keys.p256dh,
          user_agent: navigator.userAgent,
          send_test_notification: false,
        });

        switchAction("askForPermissionLocation");
      } else {
        // switch to location
        switchAction("askForPermissionLocation");
      }
      setIsBusy(false);
    });
  };

  return (
    isOrWasAction("askForPermissionNotification") && (
      <div className={appContentClassNames("askForPermissionNotification")}>
        <div className="brand">
          <div className="brand-hero">
            <img src="/undraw/undraw_push_notifications_re_t84m.svg" />
          </div>
          <p className="brand-text-title">
            {t("Get Notified of Relevant Activity Near You")}
          </p>
          <p className="brand-text">
            {t(
              "Activazon notifications will keep you informed of important events in your community. Allow them now to stay in the know."
            )}
          </p>
        </div>
        <div className="app-content-list">
          <form>
            <button
              className="btn btn-primary-light"
              onClick={onAllowNotifications}
              disabled={isBusy}
            >
              {t("Allow Notifications")}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ActionAskForPermissionNotification;
