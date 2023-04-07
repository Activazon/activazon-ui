import classNames from "classnames";
import { useTrans } from "lib/trans";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { track } from "lib/track";

const ActionAskToSignIn = ({
  isOrWasAction,
  appContentClassNames,
  switchAction,
  isBusy,
  errorMessage,
  setIsBusy,
  setErrorMessage,
  errorMessageDisplay,
}) => {
  const { t, ts } = useTrans();
  const [signInForm, setSignInForm] = useState({
    username: "",
    password: "",
  });
  const onSignInFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignInForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

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

  const onAskToSignUp = (e) => {
    e.preventDefault();
    switchAction("askToSignUp");
  };

  return (
    isOrWasAction("askToSignIn") && (
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
    )
  );
};

export default ActionAskToSignIn;
