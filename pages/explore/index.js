import Bannerv2 from "components/Bannerv2";
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
import { getSessionFromContext } from "lib/auth";
import { useSession } from "next-auth/react";
import { track } from "lib/track";
import { useEffect } from "react";

const Page = ({ cities }) => {
  const { status } = useSession();
  const { i, t, p } = useTrans();
  useEffect(() => {
    track("page.explore", {
      authStatus: status,
    });
  }, [status]);

  const isAuthenticated = status === "authenticated";

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />

          <Bannerv2 dark={true} title={i("Get to know your neighbourhood")}>
            <div className="p-2" />
          </Bannerv2>
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
  const session = await getSessionFromContext(context);
  const paginationLimit = session.isAuthenticated ? 15 : 6;
  const canLoadMore = session.isAuthenticated;
  const cities = await getCities(paginationLimit);

  return {
    props: {
      cities,
      canLoadMore,
    },
  };
}
