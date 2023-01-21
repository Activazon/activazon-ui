import Banner from "components/Banner";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginFormTile from "components/LoginFormTile";
import { useTrans } from "lib/trans";
import { isAuthenticatedFromContext } from "lib/auth";
import Bannerv2 from "components/Bannerv2";

const Page = ({ cities, isAuthenticated }) => {
  const { i, t, p, locale } = useTrans();

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />
          <Bannerv2 dark={true}>
            <div className="row">
              <div className="banner-image">
                <img className="banner-logo" src="/banner-bg/banner-logo.png" />
              </div>
            </div>
          </Bannerv2>

          <Main>
            <Col>
              <LoginFormTile />
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
  const isAuthenticated = isAuthenticatedFromContext(context);

  return {
    props: {
      isAuthenticated, // use to determine to show signin / login card
    },
  };
}
