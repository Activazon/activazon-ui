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

import { useTrans } from "lib/trans";
import {
  getArea,
  getAreaActivities,
  getAreaActivityBreakdown,
} from "lib/api-v2";
import { activityPath } from "lib/urls";
import { isAuthenticatedFromContext } from "lib/auth";
import { useDate } from "lib/date";

const AreaPage = ({ isAuthenticated, area, activities, activityBreakdown }) => {
  const { t, p, locale } = useTrans();
  const { displayDate } = useDate();
  const activitesText = p(
    "1 activity",
    "{{count}} activities",
    area.activity_total_last5months
  );
  const address = `${area.display_name}, ${area.city.display_name}, ${area.city.country.display_name}`;
  const seoTitle = `${address} (${activitesText})`;
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const seoImageUrl = area.image_wide_url;

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

          <Bannerv2
            title={area.display_name}
            description={
              area.city.display_name + ", " + area.city.country.display_name
            }
            showSearch={false}
            searchCountry={null}
            dark={true}
          >
            <>
              <div className="row">
                <StaticMapImage src={area.image_wide_url} />
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
      </body>
    </>
  );
};

export default AreaPage;

export async function getServerSideProps(context) {
  const { countrySlug, citySlug, areaSlug } = context.params;

  const isAuthenticated = isAuthenticatedFromContext(context);
  const area = await getArea(countrySlug, citySlug, areaSlug);

  if (isNaN(area.id)) {
    return {
      notFound: true,
    };
  }

  const activitiesLimit = 3; // TODO: set to get from store, value can change automaticallty once authed
  const [activities, activityBreakdown] = await Promise.all([
    getAreaActivities(area.id, activitiesLimit),
    getAreaActivityBreakdown(area.id),
  ]);

  return {
    props: {
      isAuthenticated, // use to determine to show signin / login card
      area,
      activities,
      activityBreakdown,
    },
  };
}
