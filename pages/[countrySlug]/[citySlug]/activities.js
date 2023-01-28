import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";

import { useTrans } from "lib/trans";
import { getCity, getCityActivities } from "lib/api-v2";
import { explorePath, activityPath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";

const Page = ({ city, activities }) => {
  const { t, p } = useTrans();
  const user = useUserRequired();
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
  useTrackOnce("page.explore.city.activities", {
    citySlug: city.slug,
    isAuthenticated: !!user,
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
            backHref={explorePath(city.slug_path)}
            title={city.display_name}
          />
          <Main>
            <Col>
              <GeoWithImagesTileContainer description={activitesText}>
                {activities?.results?.map((activity) => (
                  <div className="col-12 col-md-6">
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
  const [activities] = await Promise.all([getCityActivities(city.id, null)]);

  return {
    props: {
      city,
      activities,
    },
  };
}
