// components
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import Bannerv2 from "components/Bannerv2";
import SpinnerWhenBusy from "components/SpinnerWhenBusy";

// libs
import { useTrans } from "lib/trans";
import { useUserRequired } from "lib/user";
import { useTrackOnce } from "lib/track";

const Page = ({}) => {
  const user = useUserRequired();
  const { t, ts } = useTrans();
  useTrackOnce("page.account");

  return (
    <>
      <Head title={ts("Sign In")} />
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
              <SpinnerWhenBusy isBusy={!user}>
                <div className="mt-3">
                  <div className="row">
                    <div className="mb-3 form-floating col-6">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={user?.first_name}
                        disabled={true}
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
                        value={user?.last_name}
                        disabled={true}
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
                      id="id"
                      value={user?.pk}
                      disabled={true}
                    />
                    <label htmlFor="email">ID</label>
                  </div>

                  <div className="mb-3 form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={user?.email}
                      disabled={true}
                    />
                    <label htmlFor="email">{t("Email address")}</label>
                  </div>
                </div>
              </SpinnerWhenBusy>
            </Col>
            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
