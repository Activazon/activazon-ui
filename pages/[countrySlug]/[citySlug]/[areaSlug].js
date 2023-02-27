import Link from "next/link";
import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";
import ActivityBreakdownTile, {
  ActivityBreakDownItem,
} from "components/ActivityBreakdownTile";
import StaticMapImage from "components/StaticMapImage";
import InteractiveActions from "components/InteractiveActions";
import { useTrans } from "lib/trans";
import { activityPath, explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";

import { usePlaceManager } from "lib/placeManager";
import { useSubscriptionManager } from "lib/subscriptionManager";

const AreaPage = ({ countrySlug, citySlug, areaSlug }) => {
  const placeManager = usePlaceManager(countrySlug, citySlug, areaSlug, {
    includeActivities: true,
    includeActivityBreakdown: true,
  });
  const subscriptionManager = useSubscriptionManager(placeManager);
  const { area, city, country, activityBreakdown, activities, isLoaded } =
    placeManager;
  const user = useUser();
  const { t, p } = useTrans();
  const { displayDate } = useDate();
  const activitesText =
    isLoaded &&
    p("1 activity", "{{count}} activities", area.activity_total_last5months);
  const address =
    isLoaded &&
    `${area.display_name}, ${city.display_name}, ${country.display_name}`;
  const seoTitle = isLoaded && `${address} (${activitesText})`;
  const seoDescription =
    isLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = isLoaded && area.image_wide_url;
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
        {isLoaded && (
          <div className="page">
            <Nav
              title={area.display_name}
              backHref={explorePath(city.slug_path)}
            />

            <Bannerv2
              // title={area.display_name}
              description={city.display_name + ", " + country.display_name}
              showSearch={false}
              searchCountry={null}
              dark={true}
            >
              <>
                <div className="row">
                  <StaticMapImage src={area.image_wide_url} />
                </div>
                <InteractiveActions
                  placeManager={placeManager}
                  subscriptionManager={subscriptionManager}
                />
              </>
            </Bannerv2>
            <Main>
              <Col>
                <GeoWithImagesTileContainer description={activitesText}>
                  {activities?.results?.map((activity) => (
                    <div className="col-12 col-md-6">
                      <GeoWithImagesTile
                        href={activityPath(
                          activity.area.slug_path,
                          activity.id
                        )}
                        key={`activity-card-${activity.id}`}
                        image={
                          activity.area.image_square_red_url ||
                          activity.area.image_square_url
                        }
                        lead={displayDate(activity.date_occured)}
                        title={t(
                          "{{activity_type_name}} in {{neighbourhood_name}}",
                          {
                            activity_type_name: t(activity.activity_type.name),
                            neighbourhood_name: activity.area.display_name,
                          }
                        )}
                      />
                    </div>
                  ))}
                </GeoWithImagesTileContainer>
                {/* {isAuthenticated && activitesSurplus > 0 && (
                  <Link
                    href={explorePath(area.slug_path + "/activities")}
                    className="btn btn-load-more w-100 mt-2"
                  >
                    {t("Load {{count}} more", { count: activitesSurplus })}
                  </Link>
                )} */}
              </Col>

              {!isAuthenticated && (
                <Col>
                  <LoginOrSignUpCtaTile
                    alternativeTitle={t("Sign Up To View More")}
                  />
                </Col>
              )}

              <Col>
                <ActivityBreakdownTile areaName={area.display_name}>
                  <>
                    {activityBreakdown?.data?.map((breakdown) => (
                      <ActivityBreakDownItem
                        key={`ab-item-${breakdown.activity_type_name}`}
                        name={t(breakdown.activity_type_name + "__plural")}
                        count={isAuthenticated ? breakdown.count : null}
                        percentage={breakdown.percentage}
                      />
                    ))}
                  </>
                </ActivityBreakdownTile>
              </Col>

              <Footer />
            </Main>
          </div>
        )}
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
