import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import PlaceList from "components/PlaceList";

import { useTrans } from "lib/trans";
import { explorePath, activityPath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";
import { useEffect, useState } from "react";
import { getCityActivities } from "lib/client-api";
import { useApi } from "lib/api-helper";

const Page = ({ countrySlug, citySlug }) => {
  const { t, p } = useTrans();
  const user = useUserRequired();
  const { displayDate } = useDate();

  const placeManager = usePlaceManager("city", countrySlug, citySlug, null, {});
  const { city } = placeManager;
  const isSeoReady = !!city;
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (city && !activities) {
      getCityActivities(city.id).then((resp) => setActivities(resp));
    }
  }, [city, activities]);

  const activitesText =
    isSeoReady &&
    p("1 activity", "{{count}} activities", city.activity_total_last5months);
  const address =
    isSeoReady && `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = isSeoReady && `${address} (${activitesText})`;
  const seoDescription =
    isSeoReady &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = isSeoReady && city.image_wide_url;
  useTrackOnce("page.explore.city.activities", {
    citySlug: citySlug,
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
            backHref={city && explorePath(city.slug_path)}
            title={city?.display_name}
          />
          <Main>
            <Col>
              <PlaceList
                description={t("Activities detected")}
                name="home-activities"
                items={activities?.results}
                accessorHref={(activity) =>
                  explorePath(
                    [activity.area.slug_path, "activities", activity.id].join(
                      "/"
                    )
                  )
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
                shimmerLimit={10}
              />
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

  return {
    props: {
      countrySlug,
      citySlug,
    },
  };
}
