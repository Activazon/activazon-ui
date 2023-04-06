import classNames from "classnames";
import { useTrans } from "lib/trans";
import { useCallback, useEffect, useState } from "react";
import Head from "components/Head";
import { useSession } from "next-auth/react";

const pushNotificationPermission = () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported"; // why? just why???
  }

  return Notification.permission;
};

export default function Home({}) {
  const { t } = useTrans();
  const session = useSession();
  //   const [requiredActions, setRequiredActions] = useState([]);
  const [currentAction, setCurrentAction] = useState("loading");
  const [previousAction, setPreviousAction] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [signInForm, setSignInForm] = useState({
    username: "",
    password: "",
  });

  // handle switching between actions
  const switchAction = useCallback(
    (action) => {
      setPreviousAction(currentAction);
      setCurrentAction(action);
      setErrorMessage(null);
    },
    [currentAction]
  );

  useEffect(() => {
    // this app has been added to the home screen
    // so we will check if we need the ask the user for notification permission
    // and sign up.
    // if (isDisplayModeStandalone()) {
    if (session.status === "unauthenticated") {
      // we need to ask the user to sign up
      switchAction("askToSignUp");
    } else if (pushNotificationPermission() !== "granted") {
      // we need to ask the user for permission
      switchAction("askForPermission");
    } else if (session.status === "authenticated") {
      // we are good to go
      //   TODO: redirect to home page
    }

    // }
  }, [session]);

  // buttons actions to switch between actions
  const onAskToSignIn = (e) => {
    e.preventDefault();
    switchAction("askToSignIn");
  };
  const onAskToSignUp = (e) => {
    e.preventDefault();
    switchAction("askToSignUp");
  };

  // form submissions
  const onSignUpFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsBusy(true);
      setErrorMessage(null);

      console.log("signUpForm", signUpForm);

      setTimeout(() => {
        switchAction("askForPermission");
        setIsBusy(false);
      }, 5000);
    },
    [signUpForm]
  );
  const onSignInFormSubmit = (e) => {
    e.preventDefault();
    setIsBusy(true);
    setErrorMessage(null);

    setTimeout(() => {
      setErrorMessage("Invalid email or password.");
      setIsBusy(false);
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

  const onSignUpFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSignInFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prev) => ({ ...prev, [name]: value }));
  };

  const appContentClassNames = (action) => {
    return classNames("app-content", {
      "app-content-open-animate": isAction(action),
      "app-content-close-animate": wasAction(action),
    });
  };

  // const brandIconClassNames = classNames("brand-icon bi bi-activity", {
  //   "brand-icon-animate": isBusy,
  // });

  return (
    <>
      <Head />
      <div className="app-container">
        <div className="app-header">
          <p className="app-header-title">
            <i className="bi bi-activity"></i>Activazon
          </p>
        </div>
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
              <div className="brand-hero">
                <img src="/undraw/undraw_welcoming_re_x0qo.svg" />
              </div>
            </div>

            <div className="app-content-list">
              <form onSubmit={onSignUpFormSubmit}>
                <div
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
                      name="firstName"
                      value={signUpForm.firstName}
                      onChange={onSignUpFormFieldChange}
                    />
                    <input
                      className="form-control w-50"
                      placeholder="Last Name"
                      disabled={isBusy}
                      name="lastName"
                      value={signUpForm.lastName}
                      onChange={onSignUpFormFieldChange}
                    />
                  </div>
                  <input
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    disabled={isBusy}
                    name="username"
                    value={signUpForm.username}
                    onChange={onSignUpFormFieldChange}
                  />

                  <input
                    className="form-control form-control-last"
                    placeholder="Password"
                    type="password"
                    disabled={isBusy}
                    name="password"
                    value={signUpForm.password}
                    onChange={onSignUpFormFieldChange}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  type="submit"
                  disabled={isBusy}
                >
                  Sign Up
                </button>

                <button
                  className="btn btn-clear text-white w-100"
                  onClick={onAskToSignIn}
                  disabled={isBusy}
                >
                  Already have an Account? Log In
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - sign in */}
        {isOrWasAction("askToSignIn") && (
          <div className={appContentClassNames("askToSignIn")}>
            <div className="brand mb-5">
              <div className="brand-hero">
                <img src="/undraw/undraw_login_re_4vu2.svg" />
              </div>
            </div>

            <div className="app-content-list">
              <form onSubmit={onSignInFormSubmit}>
                <div
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
                    name="username"
                    value={signInForm.username}
                    onChange={onSignInFormFieldChange}
                  />

                  <input
                    className="form-control form-control-last"
                    placeholder="Password"
                    type="password"
                    disabled={isBusy}
                    name="password"
                    value={signInForm.password}
                    onChange={onSignInFormFieldChange}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg w-100"
                  type="submit"
                  disabled={isBusy}
                >
                  Sign In
                </button>

                <button
                  className="btn btn-clear text-white w-100"
                  onClick={onAskToSignUp}
                  disabled={isBusy}
                >
                  Don't have an account Sign Up?
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - ask for permission  */}
        {isOrWasAction("askForPermission") && (
          <div className={appContentClassNames("askForPermission")}>
            <div className="brand mb-5">
              <div className="brand-hero">
                <img src="/undraw/undraw_push_notifications_re_t84m.svg" />
              </div>
              <p className="brand-text-title">{t("Notifications, Yah!")}</p>
              <p className="brand-text">
                {t("Stay alert and stay safe with Activazon")}
              </p>
              {/* TODO: probably ask for location too (like instagram) */}
              <p>
                Would you like to subscribe to activity alerts detected in
                Tegucigalpa
              </p>
            </div>
            {/*  */}
          </div>
        )}
      </div>
    </>
  );
}
