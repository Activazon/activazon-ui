import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginFormTile from "components/LoginFormTile";
import { useTrans } from "lib/trans";
import Bannerv2 from "components/Bannerv2";

const Page = ({}) => {
  const { i, t, p, locale } = useTrans();

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
  return {
    props: {},
  };
}
