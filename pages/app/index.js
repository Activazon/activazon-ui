import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";

import PlaceList from "components/PlaceList";
import SearchWidget from "components/SearchWidget";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import PlaceItemSmall, {
  PlaceItemSmallShimmer,
} from "components/PlaceItemSmall";

// import Tip from "components/Tip";
import { useTrans } from "lib/trans";
import { getCities, getCachedCities, getActivities } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useApi } from "lib/api-helper";
import { useDate } from "lib/date";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";

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
                  title={i("Activities detected")}
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
                    accessorActivityImageUrl(activity)
                  }
                  accessorLead={(activity) =>
                    displayDate(activity.date_occured)
                  }
                  accessorTitle={(activity) =>
                    accessorActivityTitle(t, activity)
                  }
                  shimmerLimit={activitiesLimit}
                />
              </Col>

              <Col>
                <PlaceList
                  name="home-cities"
                  title={i("Cities")}
                  items={cities?.data?.results}
                  accessorHref={(city) => explorePath(city.slug_path)}
                  accessorImageUrl={(city) => city.image_square_url}
                  accessorLead={(city) => city.country.display_name}
                  accessorTitle={(city) => city.display_name}
                  accessorDescription={(city) =>
                    p(
                      "1 activity",
                      "{{count}} activities",
                      city.activity_total_last5months
                    )
                  }
                  shimmerLimit={activitiesLimit}
                  itemWrapperClassName="col-6 col-md-3 mb-4"
                  ItemComponent={PlaceItemSmall}
                  ShimmerComponent={PlaceItemSmallShimmer}
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
