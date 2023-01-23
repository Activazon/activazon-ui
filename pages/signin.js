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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { i, t, p, locale } = useTrans();

  const errorCredentials = error === "CredentialsSignin";

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/explore",
        username: email,
        password,
      });
    },
    [email, password]
  );

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav pageTitle="Sign Up" />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <img className="banner-logo" src="/banner-bg/banner-logo.png" />
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
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required={true}
                    />
                    <label htmlFor="email">Email address</label>
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
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 btn-lg fw-bolder"
                      id="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="mb-3">
                    <a className="btn btn-primary-outline w-100" href="">
                      Tap here to Sign Up
                    </a>
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
