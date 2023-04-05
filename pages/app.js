import classNames from "classnames";
import { useTrans } from "lib/trans";
import { useCallback, useEffect, useState } from "react";
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
  //   const [requiredActions, setRequiredActions] = useState([]);
  const [currentAction, setCurrentAction] = useState("loading");
  const [previousAction, setPreviousAction] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const switchAction = useCallback(
    (action) => {
      setPreviousAction(currentAction);
      setCurrentAction(action);
    },
    [currentAction]
  );

  useEffect(() => {
    // this app has been added to the home screen
    // so we will check if we need the ask the user for notification permission
    // and sign up.
    // if (isDisplayModeStandalone()) {
    if (!user || pushNotificationPermission() !== "granted") {
      // setRequiredActions(_requiredActions);
      switchAction("askToSignIn");
    } else {
      // we are good to go
      //   TODO: redirect to home page
    }

    // }
  }, [user]);

  const onAskToSignIn = (e) => {
    e.preventDefault();
    switchAction("askToSignIn");
  };
  const onAskToSignUp = (e) => {
    e.preventDefault();
    switchAction("askToSignUp");
  };

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    switchAction("askForPermission");
  };
  const onSignInFormSubmit = (e) => {
    e.preventDefault();
    switchAction("askForPermission");
  };

  // keeps the current and previous action render so they can be animated
  const isOrWasAction = useCallback(
    (action) => {
      return currentAction === action || previousAction === action;
    },
    [currentAction, previousAction]
  );
  const wasAction = useCallback(
    (action) => {
      return previousAction === action;
    },
    [previousAction]
  );

  const isAction = useCallback(
    (action) => {
      return currentAction === action;
    },
    [currentAction]
  );

  const appContentClassNames = (action) => {
    return classNames("app-content", {
      "app-content-open-animate": isAction(action),
      "app-content-close-animate": wasAction(action),
    });
  };

  const brandIconClassNames = classNames("brand-icon bi bi-activity", {
    "brand-icon-animate": isBusy,
  });

  return (
    <>
      <Head />
      <div className="app-container">
        {/* loading/spinner screen */}
        {isOrWasAction("loading") && (
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
        )}

        {/* journey - sign up */}
        {isOrWasAction("askToSignUp") && (
          <div className={appContentClassNames("askToSignUp")}>
            <div className="brand mb-5">
              <i className={brandIconClassNames}></i>
              <p className="brand-text-title">{t("Sign Up to continue")}</p>
              <p className="brand-text">
                {t("Stay alert and stay safe with Activazon")}
              </p>
            </div>

            <div className="container">
              <form className="login-form" onSubmit={onSignUpFormSubmit}>
                <div className="d-flex">
                  <input
                    className="form-control w-50"
                    placeholder="First Name"
                  />
                  <input
                    className="form-control w-50"
                    placeholder="Last Name"
                  />
                </div>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                />

                <input
                  className="form-control form-control-last"
                  placeholder="Password"
                  type="password"
                />
              </form>
            </div>

            <div className="container mt-3">
              <input
                className="btn btn-primary btn-lg w-100"
                type="submit"
                value="Sign Up"
              />
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-clear text-white w-100"
                onClick={onAskToSignIn}
              >
                Already have an Account? Log In
              </button>
            </div>
          </div>
        )}

        {/* journey - login */}
        {isOrWasAction("askToSignIn") && (
          <div className={appContentClassNames("askToSignIn")}>
            <div className="brand mb-5">
              <i className={brandIconClassNames}></i>
              <p className="brand-text-title">{t("Sign In")}</p>
              <p className="brand-text">
                {t("Stay alert and stay safe with Activazon")}
              </p>
            </div>

            <div className="container">
              <form className="login-form" onSubmit={onSignInFormSubmit}>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                />

                <input
                  className="form-control form-control-last"
                  placeholder="Password"
                  type="password"
                />
              </form>
            </div>

            <div className="container mt-3">
              <input
                className="btn btn-primary btn-lg w-100"
                type="submit"
                value="Sign Up"
              />
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-clear text-white w-100"
                onClick={onAskToSignUp}
                type="submit"
                value={t("Sign In")}
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        )}

        {/* journey - ask for permission  */}
        {isOrWasAction("askForPermission") && (
          <div className={appContentClassNames("askForPermission")}>
            <div className="brand mb-5">
              <i className={brandIconClassNames}></i>
              <p className="brand-text-title">{t("Notifications, Yah!")}</p>
              <p className="brand-text">
                {t("Stay alert and stay safe with Activazon")}
              </p>
            </div>
            {/*  */}
          </div>
        )}
      </div>
    </>
  );
}
