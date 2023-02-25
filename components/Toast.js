import { useTrans } from "lib/trans";
import { useEffect } from "react";

const Toast = ({ header, title, description, footer }) => {
  return (
    <div className="toast-container">
      <div className="toast-card card card-body row gap-3">
        {header}
        <p className="toast-title m-0">{title}</p>
        <p className="toast-text m-0">{description}</p>
        {footer}
      </div>
    </div>
  );
};

export default Toast;

export const ToastTurnOnPushNotifications = ({
  placeDisplayName,
  onCancel,
  onAccept,
}) => {
  const { t } = useTrans();
  return (
    <Toast
      header={<img src="/push-notification.png" className="img-fluid" />}
      title={t("Turn on push notifications")}
      description={t(
        "To receive alerts about activity that happens in {{placeDisplayName}}, turn on push notification. You'll also receive them when you are not on the site. You can turn them off at any time.",
        { placeDisplayName }
      )}
      footer={
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-primary btn-block toast-btn w-100"
              onClick={onAccept}
            >
              Turn On
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-clear w-100" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      }
    />
  );
};

export const ToastTurnOnPushNotificationsDenied = ({ onCancel, onAccept }) => {
  const { t } = useTrans();
  return (
    <Toast
      header={<img src="/push-notification.png" className="img-fluid" />}
      title={t("Can't turn on push notifications")}
      description={t(
        "It seems like we can't turn on push notifications for you. You can try turning them on manually in your browser settings or try a different device."
      )}
      footer={
        <div className="row">
          <div className="col-12">
            <button className="btn btn-clear w-100" onClick={onCancel}>
              Okay
            </button>
          </div>
        </div>
      }
    />
  );
};

export const TOASTS = {
  PUSH_NOTIFICATIONS_DEFAULT: "push-notifications-default",
  PUSH_NOTIFICATIONS_DENIED: "push-notifications-denied",
};
