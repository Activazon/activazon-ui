import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import A2hsCtaTile from "components/A2hsCtaTile";
import UserCurrentCityWidget from "components/UserCurrentCityWidget";
import SearchBar from "components/SearchBar";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import ContentGroupTitle from "components/Content/ContentGroupTitle";
import ContentGroup from "components/Content/ContentGroup";

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
import Content from "components/Content/Content";

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

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />
          <Content>
            <SearchBar />

            {nearbyCity.success && (
              <UserCurrentCityWidget
                city={nearbyCity.data.city}
                activities={nearbyCity.data.activities}
              />
            )}

            {!isDisplayModeStandalone() && <A2hsCtaTile />}
            <ContentGroup>
              <ContentGroupTitle
                title={i("Activities detected today")}
                description={i(
                  "Most recent activities detected in your country"
                )}
              />
              <ItemList>
                {activities?.data?.results?.map((activity) => (
                  <Item
                    key={`activity-${activity.id}`}
                    href={explorePath(
                      [activity.area.slug_path, "activities", activity.id].join(
                        "/"
                      )
                    )}
                    imgUrl={accessorActivityImageUrl(activity)}
                    itemType={t("Activity")}
                    title={accessorActivityTitle(t, activity)}
                    message={displayDate(activity.date_occured)}
                    pill={
                      <ItemActivityTypePill
                        name={t(activity.activity_type.name)}
                      />
                    }
                  />
                ))}
              </ItemList>
            </ContentGroup>
            <ContentGroup>
              <ContentGroupTitle
                title={i("Cities we are watching")}
                description={i(
                  "Cities where we have detected activities in the last 5 months"
                )}
              />
              <ItemList>
                {cities?.data?.results?.map((city) => (
                  <Item
                    key={`city-${city.id}`}
                    href={explorePath(city.slug_path)}
                    imgUrl={city.image_square_url}
                    itemType={t("City")}
                    title={city.display_name}
                    message={
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
                  />
                ))}
              </ItemList>
            </ContentGroup>
          </Content>
        </div>
        <Footer />
      </body>
    </>
  );
};

export default Page;
