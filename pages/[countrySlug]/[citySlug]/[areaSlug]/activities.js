import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import PlaceList from "components/PlaceList";

import { useTrans } from "lib/trans";
import { getAreaActivities } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useDate } from "lib/date";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";
import { useEffect, useState } from "react";
import {
  accessorActivityTitle,
  accessorActivityImageUrl,
} from "lib/activityAcessors";

const Page = ({ countrySlug, citySlug, areaSlug }) => {
  const { t, p } = useTrans();
  const user = useUserRequired();
  const { displayDate } = useDate();

  const placeManager = usePlaceManager(
    "area",
    countrySlug,
    citySlug,
    areaSlug,
    {}
  );
  const { area } = placeManager;
  const seoLoaded = !!area;

  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (area && !activities) {
      getAreaActivities(area.id, 30).then((resp) => setActivities(resp));
    }
  }, [area, activities]);

  const activitesText =
    seoLoaded && p("1 activity", "{{count}} activities", area.activity_total);
  const address =
    seoLoaded &&
    `${area.display_name}, ${area.city.display_name}, , ${area.city.country.display_name}`;
  const seoTitle = seoLoaded && `${address} (${activitesText})`;
  const seoDescription =
    seoLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = seoLoaded && area.image_wide_url;
  useTrackOnce("page.explore.area.activities", {
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
            backHref={area && explorePath(area.slug_path)}
            title={area?.display_name}
          />
          <Main>
            <Col>
              <PlaceList
                title={t("Activities detected in {{placeDisplayName}}", {
                  placeDisplayName: area?.display_name,
                })}
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
                  accessorActivityImageUrl(activity)
                }
                accessorLead={(activity) => displayDate(activity.date_occured)}
                accessorTitle={(activity) => accessorActivityTitle(t, activity)}
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
  const { countrySlug, citySlug, areaSlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
      areaSlug,
    },
  };
}
