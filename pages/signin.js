import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { signIn, getSession } from "next-auth/react";
// components
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import Bannerv2 from "components/Bannerv2";

// libs
import { useTrans } from "lib/trans";
import { useTrackOnce } from "lib/track";

const Page = ({}) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t, ts, locale } = useTrans();
  useTrackOnce("page.signin", {
    error,
  });

  const { callbackUrl } = router.query;

  const errorCredentials = error === "CredentialsSignin";

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await signIn("signin", {
        redirect: false,
        username: email,
        password,
      });

      if (resp.error) {
        setError(resp.error);
        return;
      }

      if (resp.ok) {
        router.push(callbackUrl || "/");
      }
    },
    [email, password]
  );

  return (
    <>
      <Head title={ts("Sign In")} />
      <body>
        <div className="page">
          <Nav pageTitle={t("Sign In")} />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("Sign In")}</p>
                {/* <img className="banner-logo" src="/banner-bg/banner-logo.png" /> */}
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <div className="mt-3">
                <form className="mt-0" onSubmit={onFormSubmit}>
                  {errorCredentials && (
                    <div
                      className="mb-3 border-0 alert alert-danger"
                      role="alert"
                    >
                      {t("Email/Password does not match, please try again.")}
                    </div>
                  )}

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
                      {t("Sign In")}
                    </button>
                    <Link
                      className="btn btn-primary-outline w-100"
                      href={{ pathname: "/signup", query: { callbackUrl } }}
                    >
                      {t("Or tap here to Sign Up")}
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
