import Nav from "components/Nav";
import MapTile from "components/Map/MapTile";
import MapInfo from "components/Map/MapInfo";
import { ItemList, Item, ItemActivityTypePill } from "components/ItemList";
import Head from "components/Head";
import ActivityBreakDown from "components/ActivityBreakdownTile";
import Content from "components/Content/Content";
import A2hsCtaTile from "components/A2hsCtaTile";
import PlaceActionBar from "components/PlaceActionBar";
import Footer from "components/Footer";
import { useTrans } from "lib/trans";

import { activityPath, explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { useSubscriptionManager } from "lib/subscriptionManager";
import Link from "next/link";

const Page = ({ countrySlug, citySlug, areaSlug }) => {
  const activitiesLimit = 3;
  const placeManager = usePlaceManager(
    PLACE_TYPES.AREA,
    countrySlug,
    citySlug,
    areaSlug,
    {
      includeActivities: true,
      includeActivityBreakdown: true,
      activitiesOptions: {
        limit: activitiesLimit,
      },
    }
  );
  const subscriptionManager = useSubscriptionManager(placeManager);
  const { area, city, country, activities, activityBreakdown, detailsLoaded } =
    placeManager;

  const activitesSurplus =
    activities && Math.max(activities.count - activitiesLimit, 0);

  const user = useUser();
  const { t, p } = useTrans();
  const { displayDate } = useDate();
  const activitesText =
    area &&
    p("1 activity", "{{count}} activities", area.activity_total_last5months);
  const address =
    area &&
    `${area.display_name}, ${city.display_name}, ${country.display_name}`;
  const seoTitle = detailsLoaded && `${address} (${activitesText})`;
  const seoDescription =
    detailsLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = area && area.image_wide_url;
  const isAuthenticated = !!user;

  useTrackOnce("page.explore.area", {
    isAuthenticated: !!user,
    areaSlug: areaSlug,
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
          {area && (
            <Content>
              <MapTile imgUrl={seoImageUrl} />
              <MapInfo
                areaType={t("Area")}
                addressParts={[
                  area.display_name,
                  city.display_name,
                  country.display_name,
                ]}
                activityCount={area.activity_total_last5months}
              />
              <PlaceActionBar />
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
                  href={explorePath(area?.slug_path + "/activities")}
                  className="tw-text-blue-bright tw-text-center tw-no-underline tw-p-3 tw-bg-blue-bright-trans tw-rounded-full"
                >
                  {t("View more from {{CityName}}", {
                    CityName: area.display_name,
                  })}
                </Link>
              </ItemList>
              <A2hsCtaTile />
              <ActivityBreakDown
                areaDisplayName={area.display_name}
                data={activityBreakdown}
              />
            </Content>
          )}
        </div>
        <Footer />
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { countrySlug, citySlug, areaSlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
      areaSlug,
    },
  };
}
