import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";
import SearchWidget from "components/SearchWidget";
import SpinnerWhenBusy from "components/SpinnerWhenBusy";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
// import Tip from "components/Tip";
import { useTrans } from "lib/trans";
import { getCities, getCachedCities, getActivities } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useApi } from "lib/api-helper";
import { useDate } from "lib/date";

const Page = () => {
  const { i, t, p } = useTrans();
  const user = useUser();
  const { displayDate } = useDate();
  const isAuthenticated = !!user;
  useTrackOnce("page.explore", {
    isAuthenticated,
  });

  // load initial cities, to improve time to interact
  // then after the user is authenticated, load more cities
  const cities = useApi(
    () => (isAuthenticated ? getCities(20) : getCachedCities()),
    null,
    [isAuthenticated]
  );
  const activites = useApi(() => getActivities(5), null);

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />
          {/* <Tip /> */}
          <Bannerv2 title={i("Get to know your neighbourhood")} dark={true}>
            <div className="row mt-4 mb-4">
              <div className="col-12">
                <SearchWidget />
              </div>
            </div>
          </Bannerv2>
          <Main>
            <SpinnerWhenBusy isBusy={!cities.ready}>
              <>
                {activites && (
                  <Col>
                    <GeoWithImagesTileContainer>
                      <p className="tile-title mb-0">
                        {i("Activities detected")}
                      </p>
                      {activites?.data?.results?.map((activity) => (
                        <div
                          key={`activiy-${activity.id}`}
                          className="col-12 col-md-6"
                        >
                          <GeoWithImagesTile
                            href={explorePath(
                              [
                                activity.area.slug_path,
                                "activities",
                                activity.id,
                              ].join("/")
                            )}
                            image={
                              activity.area.image_square_red_url ||
                              activity.area.image_square_url
                            }
                            lead={displayDate(activity.date_occured)}
                            title={t(
                              "{{activity_type_name}} in {{neighbourhood_name}}",
                              {
                                activity_type_name: t(
                                  activity.activity_type.name
                                ),
                                neighbourhood_name: activity.area.display_name,
                              }
                            )}
                          />
                        </div>
                      ))}
                    </GeoWithImagesTileContainer>
                  </Col>
                )}
                <Col>
                  <GeoWithImagesTileContainer>
                    <p className="tile-title mb=0">{i("Cities")}</p>
                    {cities?.data?.results?.map((c) => (
                      <div
                        key={`city-${c.slug_path}`}
                        className="col-12 col-md-6"
                      >
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
              </>
            </SpinnerWhenBusy>

            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
