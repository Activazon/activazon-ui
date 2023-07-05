import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import Content from "components/Content/Content";

import PlaceList from "components/PlaceList";
import MapTile from "components/Map/MapTile";
import MapInfo from "components/Map/MapInfo";
import A2hsCtaTile from "components/A2hsCtaTile";
import UserCurrentCityWidget from "components/UserCurrentCityWidget";

// import Tip from "components/Tip";
import { useTrans } from "lib/trans";
import { getActivities, getCities, getCityNearby } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useApi } from "lib/api-helper";
import { useDate } from "lib/date";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";
import { isDisplayModeStandalone } from "lib/pwa";
import {
  canAllowGeoLocation,
  hasPermissionGeoLocation,
  getCurrentCoords,
} from "lib/permissions";

const getCoordsAndNearyCity = async () => {
  let coords = null;
  const canUseGeoLocation =
    canAllowGeoLocation() && (await hasPermissionGeoLocation());

  if (canUseGeoLocation) {
    coords = await getCurrentCoords();
  }
  return getCityNearby({ coords });
};

const Page = () => {
  const { i, t } = useTrans();
  const user = useUser();
  const { displayDate } = useDate();
  const isAuthenticated = !!user;
  useTrackOnce("page.explore", {
    isAuthenticated,
  });

  const activitiesLimit = 3;
  const citiesLimit = 10;
  const activities = useApi(() => getActivities(activitiesLimit));
  const cities = useApi(() => getCities(citiesLimit));
  const nearbyCity = useApi(() => getCoordsAndNearyCity());
  const ah2s = !isDisplayModeStandalone() && (
    <Col>
      <A2hsCtaTile />
    </Col>
  );

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />

          {/* <Content>
            <MapTile />
            <MapInfo />
          </Content> */}

          <Main>
            <>
              {nearbyCity.success && (
                <Col>
                  <UserCurrentCityWidget
                    city={nearbyCity.data.city}
                    activities={nearbyCity.data.activities}
                  />
                </Col>
              )}
              {ah2s}
              <Col>
                <PlaceList
                  title={i("Activities detected today")}
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
                  title={i("Cities we are watching")}
                  name="home-activities"
                  items={cities?.data?.results}
                  accessorHref={(city) => explorePath(city.slug_path)}
                  accessorImageUrl={(city) => city.image_square_url}
                  accessorLead={null}
                  accessorTitle={(city) => city.display_name}
                  // accessorDescription={(city) => city.activity_total_last7days}
                  accessorDescription={(city) =>
                    city.activity_total_last7days !== 0
                      ? t(
                          "{{ActivityCount}} activities detected in the last week",
                          {
                            ActivityCount: city.activity_total_last7days,
                          }
                        )
                      : t(
                          "{{ActivityCount}} activities detected in the last 5 months",
                          {
                            ActivityCount: city.activity_total_last5months,
                          }
                        )
                  }
                  shimmerLimit={activitiesLimit}
                />
              </Col>

              {ah2s}
            </>

            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default Page;
