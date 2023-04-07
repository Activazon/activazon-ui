import classNames from "classnames";
import { useTrans } from "lib/trans";
import { useCallback, useEffect, useState } from "react";
import Head from "components/Head";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { track } from "lib/track";
import { useRouter } from "next/router";
import PlaceList from "components/PlaceList";
import {
  createSubscription,
  deleteSubscription,
  getAreasNearby,
  storePushSubscription,
} from "lib/client-api";

const pushNotificationPermission = () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported"; // why? just why???
  }

  return Notification.permission;
};

export default function Home({}) {
  const { t, ts, locale } = useTrans();
  const session = useSession();
  const router = useRouter();
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
  const [areasNearby, setAreasNearby] = useState([]);
  const [subscribedAreas, setSubscribedAreas] = useState({});

  // handle switching between actions
  const switchAction = useCallback(
    (action) => {
      if (action === currentAction) return;
      track("appentry." + action, {});
      setPreviousAction(currentAction);
      setCurrentAction(action);
      setErrorMessage(null);
    },
    [currentAction]
  );

  // facilitate switching between actions / screens
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

  const isSubscribed = useCallback(
    (area) => {
      return subscribedAreas[area.id];
    },
    [subscribedAreas]
  );

  const appContentClassNames = (action) => {
    return classNames("app-content", {
      "app-content-open-animate": isAction(action),
      "app-content-close-animate": wasAction(action),
    });
  };

  useEffect(() => {
    // this app has been added to the home screen
    // so we will check if we need the ask the user for notification permission
    // and sign up.

    if (isAction("loading")) {
      if (session.status === "loading") {
        //  do nothing
      } else if (session.status === "authenticated") {
        // we are good to go
        router.push("/");
      } else if (session.status === "unauthenticated") {
        // we need to ask the user to sign up
        switchAction("askToSignUp");
      } else if (pushNotificationPermission() !== "granted") {
        // we need to ask the user for permission

        switchAction("askForPermissionNotification");
      }
    }
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

  // form field changes
  const onSignUpFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const onSignInFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // form submit actions
  const onSignUpFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsBusy(true);
      setErrorMessage(null);
      track("appentry.signup.submit");

      if (
        signUpForm.username === "" ||
        signUpForm.password === "" ||
        signUpForm.firstName === "" ||
        signUpForm.lastName === ""
      ) {
        setErrorMessage("INVALID_FORM_DATA");
        track("appentry.signup.error", {
          error: "INVALID_FORM_DATA",
        });
      } else {
        const resp = await signIn("signup", {
          redirect: false,
          username: signUpForm.username,
          usernameVerify: signUpForm.username,
          password: signUpForm.password,
          firstName: signUpForm.firstName,
          lastName: signUpForm.lastName,
          locale,
        });

        if (resp.error) {
          track("appentry.signup.error", {
            error: resp.error,
          });
          setErrorMessage(resp.error || "UNKNOWN_ERROR");
        } else if (resp.ok) {
          track("appentry.signup.complete");
          switchAction("askForPermissionNotification");
        }
      }
      setIsBusy(false);
    },
    [signUpForm]
  );
  const onSignInFormSubmit = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    setErrorMessage(null);
    track("appentry.signin.submit");

    if (signInForm.username === "" || !signInForm.password === "") {
      track("appentry.signin.error", {
        error: "INVALID_FORM_DATA",
      });
      setErrorMessage("INVALID_FORM_DATA");
    } else {
      const resp = await signIn("signin", {
        redirect: false,
        username: signInForm.username,
        password: signInForm.password,
      });

      if (resp.error) {
        track("appentry.signin.error", {
          error: resp.error,
        });
        setErrorMessage(resp.error || "UNKNOWN_ERROR");
      } else if (resp.ok) {
        track("appentry.signin.complete");
        switchAction("askForPermissionNotification");
      }
    }
    setIsBusy(false);
  };
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
        await storePushSubscription({
          endpoint: subscription.endpoint,
          expiration_time: subscription.expirationTime,
          auth: subscriptionJson.keys.auth,
          p256dh: subscriptionJson.keys.p256dh,
          user_agent: navigator.userAgent,
        });
        switchAction("askForPermissionLocation");
        setIsBusy(false);
      } else {
        // switch to location
        switchAction("askForPermissionLocation");
        setIsBusy(false);
      }
    });
  };
  const onAllowLocation = (e) => {
    e.preventDefault();
    setIsBusy(true);
    track("appentry.location.click");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          track("appentry.location.granted");
          // fetch nearby areas
          switchAction("nearbyAreas");
          setAreasNearby(
            await getAreasNearby({ coords: position.coords, limit: 4 })
          );
          setIsBusy(false);
        },
        () => {
          track("appentry.location.denied");
          router.push("/");
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

  // const brandIconClassNames = classNames("brand-icon bi bi-activity", {
  //   "brand-icon-animate": isBusy,
  // });

  const errorMessageDisplay =
    {
      INVALID_FORM_DATA: t("Please fill in all the fields."),
      INVALID_CREDENTIALS: t("Invalid username or password."),
      USER_ALREADY_EXISTS: t("User already exists with that email."),
      USERNAME_MISMATCH: t("Email addresses do not match."),
      CredentialsSignin: t("Invalid email or password."),
    }[errorMessage] || t("An unknown error occurred.");

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
            <div className="brand">
              <div className="brand-hero">
                <img src="/undraw/undraw_welcoming_re_x0qo.svg" />
              </div>
              <p className="brand-text-title">{t("Sign Up")}</p>
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
                      <p>{errorMessageDisplay}</p>
                    </div>
                  )}
                  <div className="d-flex">
                    <input
                      className="form-control w-50"
                      placeholder={ts("First Name")}
                      disabled={isBusy}
                      name="firstName"
                      value={signUpForm.firstName}
                      onChange={onSignUpFormFieldChange}
                      required={true}
                    />
                    <input
                      className="form-control w-50"
                      placeholder={ts("Last Name")}
                      disabled={isBusy}
                      name="lastName"
                      value={signUpForm.lastName}
                      onChange={onSignUpFormFieldChange}
                      required={true}
                    />
                  </div>
                  <input
                    className="form-control"
                    placeholder={ts("Email address")}
                    type="email"
                    disabled={isBusy}
                    name="username"
                    value={signUpForm.username}
                    onChange={onSignUpFormFieldChange}
                    required={true}
                  />

                  <input
                    className="form-control form-control-last"
                    placeholder={ts("Password")}
                    type="password"
                    disabled={isBusy}
                    name="password"
                    value={signUpForm.password}
                    onChange={onSignUpFormFieldChange}
                    required={true}
                  />
                </div>

                <button
                  className="btn btn-primary-light btn-lg w-100"
                  type="submit"
                  disabled={isBusy}
                >
                  {t("Sign Up")}
                </button>

                <button
                  className="btn btn-clear text-white w-100"
                  onClick={onAskToSignIn}
                  disabled={isBusy}
                >
                  {t("Or tap here to Sign In")}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - sign in */}
        {isOrWasAction("askToSignIn") && (
          <div className={appContentClassNames("askToSignIn")}>
            <div className="brand">
              <div className="brand-hero">
                <img src="/undraw/undraw_login_re_4vu2.svg" />
              </div>
              <p className="brand-text-title">{t("Sign In")}</p>
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
                      <p>{errorMessageDisplay}</p>
                    </div>
                  )}

                  <input
                    className="form-control"
                    placeholder={ts("Email address")}
                    type="email"
                    disabled={isBusy}
                    name="username"
                    value={signInForm.username}
                    onChange={onSignInFormFieldChange}
                    required={true}
                  />

                  <input
                    className="form-control form-control-last"
                    placeholder={ts("Password")}
                    type="password"
                    disabled={isBusy}
                    name="password"
                    value={signInForm.password}
                    onChange={onSignInFormFieldChange}
                    required={true}
                  />
                </div>

                <button
                  className="btn btn-primary-light btn-lg w-100"
                  type="submit"
                  disabled={isBusy}
                >
                  {t("Sign In")}
                </button>

                <button
                  className="btn btn-clear text-white w-100"
                  onClick={onAskToSignUp}
                  disabled={isBusy}
                >
                  {t("Or tap here to Sign Up")}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - ask for permission (notification)  */}
        {isOrWasAction("askForPermissionNotification") && (
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
                >
                  {t("Allow Notifications")}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - ask for permission (location)  */}
        {isOrWasAction("askForPermissionLocation") && (
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
                <button
                  className="btn btn-primary-light"
                  onClick={onAllowLocation}
                >
                  {t("Allow Location")}
                </button>
                <button
                  className="btn btn-clear"
                  onClick={onAllowLocationLater}
                >
                  {t("I'll do it later")}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* journey - nearby areas  */}
        {isOrWasAction("nearbyAreas") && (
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
        )}
      </div>
    </>
  );
}
