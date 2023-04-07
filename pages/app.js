import classNames from "classnames";
import { useTrans } from "lib/trans";
import { useCallback, useEffect, useState } from "react";
import Head from "components/Head";
import { useSession } from "next-auth/react";
import { track } from "lib/track";
import { useRouter } from "next/router";
import ActionAskForPermissionLocation from "components/app/actions/ActionAskForPermissionLocation";
import ActionAskForPermissionNotification from "components/app/actions/ActionAskForPermissionNotification";
import ActionLoading from "components/app/actions/ActionLoading";
import ActionAskToSignUp from "components/app/actions/ActionAskToSignUp";
import ActionAskToSignIn from "components/app/actions/ActionAskToSignIn";
import ActionNearbyAreas from "components/app/actions/ActionNearbyAreas";

const pushNotificationPermission = () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return "unsupported"; // why? just why???
  }

  return Notification.permission;
};

export default function Home({}) {
  const { t } = useTrans();
  const session = useSession();
  const router = useRouter();
  const [currentAction, setCurrentAction] = useState("loading");
  const [previousAction, setPreviousAction] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [coords, setCoords] = useState(null);

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

      switchAction("askForPermissionNotification");
    }
  }, [session]);

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
        <ActionLoading isOrWasAction={isOrWasAction} wasAction={wasAction} />

        {/* journey - sign up */}
        <ActionAskToSignUp
          isOrWasAction={isOrWasAction}
          appContentClassNames={appContentClassNames}
          errorMessageDisplay={errorMessageDisplay}
          isBusy={isBusy}
          switchAction={switchAction}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsBusy={setIsBusy}
        />

        {/* journey - sign in */}
        <ActionAskToSignIn
          isOrWasAction={isOrWasAction}
          appContentClassNames={appContentClassNames}
          switchAction={switchAction}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          errorMessageDisplay={errorMessageDisplay}
        />

        {/* journey - ask for permission (notification)  */}
        <ActionAskForPermissionNotification
          isOrWasAction={isOrWasAction}
          switchAction={switchAction}
          appContentClassNames={appContentClassNames}
          setIsBusy={setIsBusy}
        />
        {/* journey - ask for permission (location)  */}
        <ActionAskForPermissionLocation
          isOrWasAction={isOrWasAction}
          switchAction={switchAction}
          setIsBusy={setIsBusy}
          appContentClassNames={appContentClassNames}
          setCoords={setCoords}
        />

        {/* journey - nearby areas  */}
        <ActionNearbyAreas
          isOrWasAction={isOrWasAction}
          appContentClassNames={appContentClassNames}
          isBusy={isBusy}
          coords={coords}
          setIsBusy={setIsBusy}
        />
      </div>
    </>
  );
}
