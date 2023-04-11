import classNames from "classnames";
import { useCallback, useState } from "react";
import { useTrans } from "lib/trans";
import { track, useTrackOnce } from "lib/track";
import { signIn } from "next-auth/react";

const ActionAskToSignUp = ({
  isOrWasAction,
  appContentClassNames,
  errorMessageDisplay,
  isBusy,
  switchAction,
  errorMessage,
  setErrorMessage,
  setIsBusy,
}) => {
  const { t, ts } = useTrans();
  useTrackOnce("appentry.signup");
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const onSignUpFormFieldChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const onAskToSignIn = (e) => {
    e.preventDefault();
    switchAction("askToSignIn");
  };

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

  return (
    isOrWasAction("askToSignUp") && (
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
                autocomplete="username"
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
                autocomplete="new-password"
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
    )
  );
};

export default ActionAskToSignUp;
