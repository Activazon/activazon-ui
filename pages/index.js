import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";

import PlaceList from "components/PlaceList";
import SearchWidget from "components/SearchWidget";
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
  const citiesLimit = 20;
  const cities = useApi(
    () => (isAuthenticated ? getCities(citiesLimit) : getCachedCities()),
    null,
    [isAuthenticated]
  );
  const activitiesLimit = 3;
  const activities = useApi(() => getActivities(activitiesLimit), null);

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
            <>
              <Col>
                <PlaceList
                  description={i("Activities detected")}
                  name="home-activities"
                  items={activities?.data?.results}
                  accessorHref={(activity) =>
                    explorePath(
                      [activity.area.slug_path, "activities", activity.id].join(
                        "/"
                      )
                    )
                  }
                  accessorImageUrl={(activity) =>
                    activity.area.image_square_red_url ||
                    activity.area.image_square_url
                  }
                  accessorLead={(activity) => displayDate(activity.date)}
                  accessorTitle={(activity) =>
                    t("{{activity_type_name}} in {{neighbourhood_name}}", {
                      activity_type_name: t(activity.activity_type.name),
                      neighbourhood_name: activity.area.display_name,
                    })
                  }
                  shimmerLimit={activitiesLimit}
                />
              </Col>

              <Col>
                <PlaceList
                  name="home-cities"
                  description={i("Cities")}
                  items={cities?.data?.results}
                  accessorHref={(city) => explorePath(city.slug_path)}
                  accessorImageUrl={(city) => city.image_square_url}
                  accessorLead={(city) => city.country.display_name}
                  accessorTitle={(city) => city.display_name}
                  accessorDescription={(city) =>
                    p(
                      "1 activity in the last 5 months",
                      "{{count}} activities in the last 5 months",
                      city.activity_total_last5months
                    )
                  }
                  shimmerLimit={activitiesLimit}
                />
              </Col>
              {!isAuthenticated && (
                <Col>
                  <LoginOrSignUpCtaTile
                    alternativeTitle={t("Sign Up To View More")}
                  />
                </Col>
              )}
            </>

            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
