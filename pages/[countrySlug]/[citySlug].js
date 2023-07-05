import Nav from "components/Nav";
import MapTile from "components/Map/MapTile";
import MapInfo from "components/Map/MapInfo";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import Head from "components/Head";
import ActivityBreakDown from "components/ActivityBreakdownTile";
import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import ContentGroupTitle from "components/Content/ContentGroupTitle";
import { useTrans } from "lib/trans";

import { activityPath, explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { useSubscriptionManager } from "lib/subscriptionManager";
import Link from "next/link";

const Page = ({ countrySlug, citySlug }) => {
  const areasLimit = 3;
  const activitiesLimit = 3;

  const placeManager = usePlaceManager(
    PLACE_TYPES.CITY,
    countrySlug,
    citySlug,
    null,
    {
      includeActivities: true,
      includeActivityBreakdown: true,
      includeAreas: true,
      includeBrandImage: true,
      areasOptions: {
        limit: areasLimit,
      },
      activitiesOptions: {
        limit: activitiesLimit,
      },
    }
  );
  const subscriptionManager = useSubscriptionManager(placeManager);
  const {
    city,
    activities,
    areas,
    activityBreakdown,
    brandImage,
    detailsLoaded,
  } = placeManager;

  const activitesSurplus =
    activities && Math.max(activities.count - activitiesLimit, 0);
  const areasSurplus = areas && Math.max(areas.count - areasLimit, 0);

  const user = useUser();
  const { t, p } = useTrans();
  const { displayDate } = useDate();
  const activitesText =
    detailsLoaded &&
    p("1 activity", "{{count}} activities", city.activity_total_last5months);
  const address =
    detailsLoaded && `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = detailsLoaded && `${address} (${activitesText})`;
  const seoDescription =
    detailsLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = detailsLoaded && city.image_wide_url;
  const isAuthenticated = !!user;

  useTrackOnce("page.explore.city", {
    isAuthenticated: !!user,
    citySlug: citySlug,
  });

  return (
    <>
      <Head
        title={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={[address]}
        seoImageUrl={seoImageUrl}
      />
      <body>
        <div className="page">
          <Nav />
          {city && (
            <Content>
              <MapTile imgUrl={seoImageUrl} />
              <MapInfo
                areaType={t("City")}
                addressParts={[city.display_name, city.country.display_name]}
                activityCount={city.activity_total_last5months}
              />
              <ItemList>
                {activities?.results.map((activity) => (
                  <Item
                    href={activityPath(activity.area.slug_path, activity.id)}
                    imgUrl={activity.area.image_square_red_url}
                    itemType={t("Activity")}
                    title={activity.area.display_name}
                    message={displayDate(activity.date_occured)}
                    pill={
                      <ItemActivityTypePill
                        name={t(activity.activity_type.name)}
                      />
                    }
                  />
                ))}
                <Link
                  href={explorePath(city?.slug_path + "/activities")}
                  className="tw-text-blue-bright tw-text-center tw-no-underline tw-p-3 tw-bg-blue-bright-trans tw-rounded-full"
                >
                  View more
                </Link>
              </ItemList>
              <ActivityBreakDown
                areaDisplayName={city.display_name}
                data={activityBreakdown}
              />
              <ContentGroup>
                <ContentGroupTitle
                  title={t("Areas")}
                  description={t(
                    "Areas in {{cityDisplayName}} where activity has been detected",
                    {
                      cityDisplayName: city.display_name,
                    }
                  )}
                />
                <ItemList>
                  {areas?.results.map((area) => (
                    <Item
                      href={area.slug_path}
                      imgUrl={area.image_square_red_url}
                      itemType={t("Activity")}
                      title={area.display_name}
                      message={t(
                        "{{ActivityCount}} activities detected in the last 5 months",
                        {
                          ActivityCount: area.activity_total_last5months,
                        }
                      )}
                    />
                  ))}
                  <Link
                    href={explorePath(city?.slug_path + "/areas")}
                    className="tw-text-blue-bright tw-text-center tw-no-underline tw-p-3 tw-bg-blue-bright-trans tw-rounded-full"
                  >
                    View more
                  </Link>
                </ItemList>
              </ContentGroup>
            </Content>
          )}
        </div>
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { countrySlug, citySlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
    },
  };
}
