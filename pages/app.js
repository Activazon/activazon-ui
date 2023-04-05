import classNames from "classnames";
import { useTrans } from "lib/trans";
import { useEffect, useState } from "react";
import { isDisplayModeStandalone } from "lib/pwa";
import { useUser } from "lib/user";
import Head from "components/Head";

const pushNotificationPermission = () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported"; // why? just why???
  }

  return Notification.permission;
};

export default function Home({}) {
  const { t } = useTrans();
  const user = useUser();
  const [requiredActions, setRequiredActions] = useState([]);
  const [activeAction, setActiveAction] = useState(null);
  useEffect(() => {
    // this app has been added to the home screen
    // so we will check if we need the ask the user for notification permission
    // and sign up.
    // if (isDisplayModeStandalone()) {
    const _requiredActions = [];
    if (!user) {
      // we need to sign the user up
      _requiredActions.push("askToSignUp");
    }

    if (pushNotificationPermission() !== "granted") {
      // we need ask for permission
      _requiredActions.push("askForPermission");
    }

    setRequiredActions(_requiredActions);
    setActiveAction(_requiredActions[0] || null);
    // }
  }, [user]);

  const showWalkThrough = requiredActions.length > 0;

  return (
    <>
      <Head />
      <div className="app-container">
        {/* loading/spinner screen */}
        <div
          className={classNames("app-content", {
            "app-content-close-animate": showWalkThrough,
          })}
        >
          <div className="brand">
            <i className="brand-icon bi bi-activity"></i>
            <p className="brand-text-title">Activazon</p>
            <p className="brand-text">{t("Safety in your hands.")}</p>
          </div>
        </div>
        {/* journey - sign up */}
        {activeAction === "askToSignUp" && (
          <div className="app-content">
            <div className="brand">
              <i className="brand-icon bi bi-activity"></i>
              <p className="brand-text-title">{t("Sign Up to continue")}</p>
            </div>
            <div className="container">
              <div className="login-form">
                <input className="form-control" placeholder="Email" />
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
