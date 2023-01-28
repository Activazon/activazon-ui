import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { getSession, getProviders, useSession } from "next-auth/react";
import { postVerifyPin } from "lib/client-api";
// components
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import Bannerv2 from "components/Bannerv2";

// libs
import { useTrans } from "lib/trans";
import { useUserRequired } from "lib/user";

const Page = ({}) => {
  const session = useSession();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(null);
  const user = useUserRequired();

  const { t } = useTrans();

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      const resp = await postVerifyPin(pin);

      if (resp.success) {
        router.push("/?welcome=1&new=1");
        return;
      }

      setError(resp.error || "UNKNOWN_ERROR");
    },
    [pin]
  );

  return (
    <>
      <Head title="Sign Up" />
      <body>
        <div className="page">
          <Nav pageTitle="Sign Up" hideMenu={true} />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("Almost there")}</p>
                <p>
                  {t(
                    "We've sent you a 6 digit pin to your email, enter it below to verify your email."
                  )}
                </p>
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
                      type="number"
                      className="form-control"
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required={true}
                      autoFocus={true}
                    />
                    <label htmlFor="email">{t("Verification Pin")}</label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-cta w-100 btn-lg fw-bolder"
                      id="submit"
                    >
                      {t("Verify")}
                    </button>
                    <Link
                      className="btn btn-primary-outline w-100"
                      href="/signin"
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

  return {
    props: {
      session,
    },
  };
}
