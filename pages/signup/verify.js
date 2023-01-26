import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { signIn, getSession, getProviders } from "next-auth/react";
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
  const {
    query: { error },
  } = useRouter();
  const [pin, setPin] = useState("");

  const { i, t, p, locale } = useTrans();

  const errorCredentials = error === "CredentialsSignin";

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      //
    },
    [pin]
  );

  return (
    <>
      <Head title="Sign Up" />
      <body>
        <div className="page">
          <Nav pageTitle="Sign Up" />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">Almost there</p>
                <p>
                  We've sent you a 6 digit pin to your email, enter it below to
                  verify your email.
                </p>
                {/* <img className="banner-logo" src="/banner-bg/banner-logo.png" /> */}
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <div className="mt-3">
                <form className="mt-0" onSubmit={onFormSubmit}>
                  {errorCredentials && (
                    <div class="alert alert-danger mb-3 border-0" role="alert">
                      Email/Password does not match, please try again.
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
                      autofocus={true}
                    />
                    <label htmlFor="email">Verification Pin</label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-cta w-100 btn-lg fw-bolder"
                      id="submit"
                    >
                      Verify
                    </button>
                    <Link
                      className="btn btn-primary-outline w-100"
                      href="/signin"
                    >
                      Or tap here to <b>Sign In</b>
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
