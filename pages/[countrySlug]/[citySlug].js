import Link from "next/link";
import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import StaticMapImage from "components/StaticMapImage";
import InteractiveActions from "components/InteractiveActions";
import PlaceList from "components/PlaceList";
import AreaList from "components/AreaList";
import ActivityBreakDownList from "components/ActivityBreakdownList";
import { useTrans } from "lib/trans";

import { explorePath, activityPath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { useSubscriptionManager } from "lib/subscriptionManager";

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
          <Nav title={city?.display_name} backHref={explorePath()} />

          <>
            <Bannerv2
              // title={city.display_name}
              description={city?.country.display_name}
              showSearch={false}
              searchCountry={null}
              dark={true}
            >
              <>
                <StaticMapImage src={brandImage?.image_url} />
                <InteractiveActions
                  placeManager={placeManager}
                  subscriptionManager={subscriptionManager}
                />
              </>
            </Bannerv2>
            <Main>
              <Col>
                <PlaceList
                  name="city-activities"
                  description={activitesText}
                  items={activities?.results}
                  accessorHref={(activity) =>
                    activityPath(activity.area.slug_path, activity.id)
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
                {isAuthenticated && activitesSurplus > 0 && (
                  <Link
                    href={explorePath(city?.slug_path + "/activities")}
                    className="btn btn-load-more w-100 mt-2"
                  >
                    {t("Load {{count}} more", { count: activitesSurplus })}
                  </Link>
                )}
              </Col>

              {!isAuthenticated && (
                <Col>
                  <LoginOrSignUpCtaTile
                    alternativeTitle={t("Sign Up To View More")}
                  />
                </Col>
              )}

              <Col>
                <ActivityBreakDownList
                  name="city-activity-breakdown"
                  areaName={city?.display_name}
                  items={activityBreakdown?.data}
                  showPercentage={isAuthenticated}
                  shimmerLimit={3}
                />
              </Col>

              <Col>
                <AreaList
                  name="city-areas"
                  areaName={city?.display_name}
                  areas={areas}
                  areasSurplus={isAuthenticated && areasSurplus}
                  areasSurplusHref={explorePath(city?.slug_path + "/areas")}
                  shimmerLimit={areasLimit}
                />
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
          </>
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
