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
import ActivityBreakDownList from "components/ActivityBreakdownList";

import { useTrans } from "lib/trans";
import { activityPath, explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";

import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { useSubscriptionManager } from "lib/subscriptionManager";

const AreaPage = ({ countrySlug, citySlug, areaSlug }) => {
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
          <Nav
            title={area?.display_name}
            backHref={city && explorePath(city.slug_path)}
          />

          <Bannerv2
            // title={area.display_name}
            description={
              city && country
                ? city.display_name + ", " + country.display_name
                : null
            }
            showSearch={false}
            searchCountry={null}
            dark={true}
          >
            <>
              <StaticMapImage src={area?.image_wide_url} />
              <InteractiveActions
                placeManager={placeManager}
                subscriptionManager={subscriptionManager}
              />
            </>
          </Bannerv2>
          <Main>
            <Col>
              <PlaceList
                name="area-activities"
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
                name="area-activity-breakdown"
                areaName={area?.display_name}
                items={activityBreakdown?.data}
                showPercentage={isAuthenticated}
                shimmerLimit={3}
              />
            </Col>
            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
};

export default AreaPage;

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
