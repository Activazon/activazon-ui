import Banner from "components/Banner";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import { useTrans } from "lib/trans";
import { getCities } from "lib/api-v2";
import { explorePath } from "lib/urls";
import { isAuthenticatedFromContext } from "lib/auth";

const Page = ({ cities, isAuthenticated }) => {
  const { i, t, p, locale } = useTrans();

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />

          <Banner
            title={i("Get to know your neighbourhood")}
            showSearch={true}
            searchCountry={null}
          />
          <Main>
            <Col>
              <GeoWithImagesTileContainer>
                {cities?.results?.map((c) => (
                  <div className="col-12">
                    <GeoWithImagesTile
                      href={explorePath(c.slug_path)}
                      key={`city-card-${c.id}`}
                      image={c.image_square_url}
                      lead={c.country.display_name}
                      title={c.display_name}
                      description={p(
                        "1 activity in the last 5 months",
                        "{{count}} activities in the last 5 months",
                        c.activity_total_last5months
                      )}
                    />
                  </div>
                ))}
              </GeoWithImagesTileContainer>
            </Col>
            {!isAuthenticated && (
              <Col>
                <LoginOrSignUpCtaTile
                  alternativeTitle={t("Sign Up To View More")}
                />
              </Col>
            )}
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
  const paginationLimit = isAuthenticated ? 15 : 6;
  const canLoadMore = isAuthenticated;
  const cities = await getCities(paginationLimit);

  return {
    props: {
      isAuthenticated, // use to determine to show signin / login card
      cities,
      canLoadMore,
    },
  };
}
