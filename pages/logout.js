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
      <Head title={ts("Logged Out")} />
      <body>
        <div className="page">
          <Nav />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("See yah!")}</p>
                <p>{t("Stay Informed, Stay Safe.")}</p>
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <div className="mt-3">
                <Link
                  href={"/signin"}
                  className="btn btn-cta w-100 btn-lg fw-bolder"
                  id="submit"
                >
                  {t("Sign In")}
                </Link>
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
