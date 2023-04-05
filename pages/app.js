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
  const [errorMessage, setErrorMessage] = useState(null);

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
    if (!user) {
      // we need to ask the user to sign up
      switchAction("askToSignUp");
    } else if (pushNotificationPermission() !== "granted") {
      // we need to ask the user for permission
      switchAction("askForPermission");
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
    setIsBusy(true);
    setTimeout(() => {
      setIsBusy(false);
      setErrorMessage("Invalid email or password.");
    }, 5000);
    // switchAction("askForPermission");
  };
  const onSignInFormSubmit = (e) => {
    e.preventDefault();
    setIsBusy(true);
    setTimeout(() => {
      setIsBusy(false);
      setErrorMessage("Invalid email or password.");
    }, 5000);

    // switchAction("askForPermission");
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
              <form
                className={classNames("login-form", {
                  "login-form-disabled": isBusy,
                })}
              >
                {errorMessage && (
                  <div className="login-form-error">
                    <p>{errorMessage}</p>
                  </div>
                )}
                <div className="d-flex">
                  <input
                    className="form-control w-50"
                    placeholder="First Name"
                    disabled={isBusy}
                  />
                  <input
                    className="form-control w-50"
                    placeholder="Last Name"
                    disabled={isBusy}
                  />
                </div>
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  disabled={isBusy}
                />

                <input
                  className="form-control form-control-last"
                  placeholder="Password"
                  type="password"
                  disabled={isBusy}
                />
              </form>
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-primary btn-lg w-100"
                type="submit"
                onClick={onSignUpFormSubmit}
                disabled={isBusy}
              >
                Sign Up
              </button>
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-clear text-white w-100"
                onClick={onAskToSignIn}
                disabled={isBusy}
              >
                Already have an Account? Log In
              </button>
            </div>
          </div>
        )}

        {/* journey - sign in */}
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
              <form
                className={classNames("login-form", {
                  "login-form-disabled": isBusy,
                })}
              >
                {errorMessage && (
                  <div className="login-form-error">
                    <p>{errorMessage}</p>
                  </div>
                )}
                <input
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  disabled={isBusy}
                />

                <input
                  className="form-control form-control-last"
                  placeholder="Password"
                  type="password"
                  disabled={isBusy}
                />
              </form>
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={onSignInFormSubmit}
                disabled={isBusy}
              >
                Sign In
              </button>
            </div>

            <div className="container mt-3">
              <button
                className="btn btn-clear text-white w-100"
                onClick={onAskToSignUp}
                type="submit"
                disabled={isBusy}
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
