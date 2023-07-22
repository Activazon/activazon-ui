import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useTrackOnce, track } from "lib/track";
// components
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import Bannerv2 from "components/Bannerv2";

// libs
import { useTrans } from "lib/trans";

const Page = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const { t, ts, locale } = useTrans();

  useTrackOnce("page.signup", {
    ref: router.query.ref,
  });

  const { callbackUrl } = router.query;
  const mustSignUp = router.query.mustSignUp === "1";

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      const signUpResp = await signIn("signup", {
        redirect: false,
        username: email,
        usernameVerify: emailVerify,
        password,
        firstName,
        lastName,
        locale,
      });

      if (signUpResp.error) {
        setError(signUpResp.error);
        return;
      }
      if (signUpResp.ok) {
        track("signup.complete", { ref: router.query.ref });
        router.push(callbackUrl || "/");
      }
    },
    [email, emailVerify, password, emailVerify, firstName, lastName]
  );

  return (
    <>
      <Head title={ts("Sign Up")} />
      <body>
        <div className="page">
          <Nav pageTitle={t("Sign Up")} hideMenu={true} />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("Sign Up")}</p>
                {mustSignUp && <p>{t("You have to Sign Up to continue")}</p>}
                {/* <img className="banner-logo" src="/banner-bg/banner-logo.png" /> */}
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <div className="mt-3">
                <form className="mt-0" onSubmit={onFormSubmit}>
                  {error && (
                    <div
                      className="mb-3 border-0 alert alert-danger"
                      role="alert"
                    >
                      {t(error)}
                    </div>
                  )}
                  <div className="row">
                    <div className="mb-3 form-floating col-6">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                        autoFocus={true}
                      />
                      <label className="ms-2" htmlFor="first_name">
                        {t("First Name")}
                      </label>
                    </div>

                    <div className="mb-3 form-floating col-6">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                        autoFocus={true}
                      />
                      <label className="ms-2" htmlFor="last_name">
                        {t("Last Name")}
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                      autoFocus={true}
                    />
                    <label htmlFor="email">{t("Email address")}</label>
                  </div>

                  <div className="mb-3 form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={emailVerify}
                      onChange={(e) => setEmailVerify(e.target.value)}
                      required={true}
                    />
                    <label htmlFor="email">{t("Verify Email address")}</label>
                  </div>

                  <div className="mb-3 form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required={true}
                    />
                    <label htmlFor="password">{t("Password")}</label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-cta w-100 btn-lg fw-bolder"
                      id="submit"
                    >
                      {t("Sign Up")}
                    </button>
                    <Link
                      className="btn btn-primary-outline w-100"
                      href={{ pathname: "/signin", query: { callbackUrl } }}
                    >
                      {t("Or tap here to Sign In")}
                    </Link>
                  </div>
                </form>
              </div>
            </Col>
            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
