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
  const [error, setError] = useState("");
  const { t, locale } = useTrans();

  useTrackOnce("page.signup");

  const { callbackUrl } = router.query;

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      const signUpResp = await signIn("signup", {
        redirect: false,
        username: email,
        usernameVerify: emailVerify,
        password,
      });

      if (signUpResp.error) {
        setError(signUpResp.error);
        return;
      }

      if (signUpResp.ok) {
        track("signup.complete", {});
        router.push(callbackUrl || "/");
      }
    },
    [email, emailVerify, password, emailVerify]
  );

  return (
    <>
      <Head title={t("Sign Up")} />
      <body>
        <div className="page">
          <Nav pageTitle={t("Sign Up")} hideMenu={true} />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("Sign Up")}</p>
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
                      className="alert alert-danger mb-3 border-0"
                      role="alert"
                    >
                      {t(error)}
                    </div>
                  )}

                  <div className="form-floating mb-3">
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

                  <div className="form-floating mb-3">
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

                  <div className="form-floating mb-3">
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
