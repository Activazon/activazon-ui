import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";

import { useTrans } from "lib/trans";
import { getArea, getAreaActivities } from "lib/api-v2";
import { explorePath, activityPath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useSession } from "next-auth/react";

const Page = ({ area, activities }) => {
  const { t, p, locale } = useTrans();
  const session = useSession();
  const { displayDate } = useDate();
  const activitesText = p(
    "1 activity",
    "{{count}} activities",
    area.activity_total
  );
  const address = `${area.display_name}, ${area.city.display_name}, , ${area.city.country.display_name}`;
  const seoTitle = `${address} (${activitesText})`;
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const seoImageUrl = area.image_wide_url;
  useTrackOnce("page.explore.area.activities", {
    authStatus: session.status,
    areaSlug: area.slug,
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
            backHref={explorePath(area.slug_path)}
            title={area.display_name}
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
  const { countrySlug, citySlug, areaSlug } = context.params;

  const area = await getArea(countrySlug, citySlug, areaSlug);

  if (isNaN(area.id)) {
    return {
      notFound: true,
    };
  }
  const [activities] = await Promise.all([getAreaActivities(area.id, null)]);

  return {
    props: {
      area,
      activities,
    },
  };
}
