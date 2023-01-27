import Link from "next/link";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
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
  const session = useSession();
  console.log("session", session);

  const { i, t, p, locale } = useTrans();

  return (
    <>
      <Head title={t("Sign In")} />
      <body>
        <div className="page">
          <Nav pageTitle={t("Sign In")} />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <p className="banner-image-title">{t("Account")}</p>
                {/* <img className="banner-logo" src="/banner-bg/banner-logo.png" /> */}
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <div className="mt-3">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="id"
                    value={session.data.user.pk}
                    disabled={true}
                  />
                  <label htmlFor="email">ID</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={session.data.user.email}
                    disabled={true}
                  />
                  <label htmlFor="email">{t("Email address")}</label>
                </div>
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
