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
import AreasTile, { AreaItem } from "components/AreasTile";
import StaticMapImage from "components/StaticMapImage";
import { useTrans } from "lib/trans";
import { useSession } from "next-auth/react";
import {
  getCity,
  getCityActivities,
  getCityActivityBreakdown,
  getCityBrandImage,
  getCityAreas,
} from "lib/api-v2";
import { explorePath, activityPath } from "lib/urls";
import { useDate } from "lib/date";
import { track } from "lib/track";
import { useEffect } from "react";

const Page = ({
  city,
  activities,
  activitesSurplus,
  activityBreakdown,
  brandImage,
  areas,
  areasSurplus,
}) => {
  const { status } = useSession();
  const { t, p, locale } = useTrans();
  const { displayDate } = useDate();
  const activitesText = p(
    "1 activity",
    "{{count}} activities",
    city.activity_total_last5months
  );
  const address = `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = `${address} (${activitesText})`;
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const seoImageUrl = city.image_wide_url;
  const isAuthenticated = status === "authenticated";
  useEffect(() => {
    track("page.explore.city", {
      authStatus: status,
      citySlug: city.slug,
    });
  }, [status, city]);

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
          <Nav title={city.display_name} backHref={explorePath()} />

          <Bannerv2
            // title={city.display_name}
            description={city.country.display_name}
            showSearch={false}
            searchCountry={null}
            dark={true}
          >
            <>
              <div className="row">
                <StaticMapImage
                  src={brandImage?.image_url || city.image_wide_url}
                />
              </div>
            </>
          </Bannerv2>
          <Main>
            <Col>
              <GeoWithImagesTileContainer description={activitesText}>
                {activities?.results?.map((activity) => (
                  <div className="col-12">
                    <GeoWithImagesTile
                      href={activityPath(activity.area.slug_path, activity.id)}
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
              {isAuthenticated && activitesSurplus > 0 && (
                <a
                  href={explorePath(city.slug_path + "/activities")}
                  className="btn btn-load-more w-100 mt-2"
                >
                  {t("Load {{count}} more", { count: activitesSurplus })}
                </a>
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
              <ActivityBreakdownTile areaName={city.display_name}>
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

            <Col>
              <AreasTile areaName={city.display_name}>
                <>
                  {areas?.results?.map((area) => (
                    <AreaItem
                      key={`area-item-${area.slug}`}
                      name={area.display_name}
                      href={explorePath(area.slug_path)}
                      description={p(
                        "1 activity in the last 5 months",
                        "{{count}} activities in the last 5 months",
                        area.activity_total_last5months
                      )}
                    />
                  ))}
                  {isAuthenticated && areasSurplus > 0 && (
                    <a
                      href={explorePath(city.slug_path + "/activities")}
                      className="btn btn-load-more w-100 mt-2"
                    >
                      {t("Load {{count}} more", { count: areasSurplus })}
                    </a>
                  )}
                </>
              </AreasTile>
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
        </div>
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { countrySlug, citySlug } = context.params;

  const city = await getCity(countrySlug, citySlug);

  if (isNaN(city.id)) {
    return {
      notFound: true,
    };
  }
  const activitiesLimit = 3;
  const areasLimit = 3;
  const [activities, activityBreakdown, brandImage, areas] = await Promise.all([
    getCityActivities(city.id, activitiesLimit),
    getCityActivityBreakdown(city.id),
    getCityBrandImage(city.id),
    getCityAreas(city.id, areasLimit),
  ]);

  const activitesSurplus = Math.max(activities.count - activitiesLimit, 0);
  const areasSurplus = Math.max(areas.count - areasLimit, 0);

  return {
    props: {
      city,
      activities,
      activitesSurplus,
      activityBreakdown,
      brandImage,
      areas,
      areasSurplus,
    },
  };
}
