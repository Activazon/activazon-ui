import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import StaticMapImage from "components/StaticMapImage";
import InteractiveActions from "components/InteractiveActions";
import ActivityDetail from "components/ActivityDetail";
import ActivityDetailShimmer from "components/ActivityDetailShimmer";
import { useTrans } from "lib/trans";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useEffect, useState } from "react";

import { useSubscriptionManager } from "lib/subscriptionManager";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { getActivity } from "lib/client-api";
import { useRouter } from "next/router";

const Page = ({ countrySlug, citySlug, areaSlug, activityId }) => {
  const router = useRouter();
  const [activity, setActivity] = useState(null);
  const user = useUser();
  const { t, locale } = useTrans();
  const placeManager = usePlaceManager(
    PLACE_TYPES.AREA,
    countrySlug,
    citySlug,
    areaSlug,
    {
      includeActivities: false,
      includeActivityBreakdown: false,
    }
  );
  const subscriptionManager = useSubscriptionManager(placeManager);
  const { area, detailsLoaded } = placeManager;

  useEffect(() => {
    if (!activity) {
      getActivity(activityId).then((resp) => {
        if (!resp.id) {
          router.push("/404");
          return;
        }
        setActivity(resp);
      });
      // TODO: handle 404
    }
  }, [activityId]);

  const address = detailsLoaded && area.display_name;
  const seoTitle =
    detailsLoaded &&
    activity &&
    t("{{activity_type_name}} in {{neighbourhood_name}}", {
      activity_type_name: t(activity.activity_type.name),
      neighbourhood_name: area.display_name,
    });
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const isAuthenticated = !!user;
  const mapImageUrl = detailsLoaded && area.image_wide_url;

  useTrackOnce("page.explore.area.activity", {
    isAuthenticated: !!user,
    activityId: activity?.id,
  });

  return (
    <>
      <Head
        title={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={[address]}
        seoImageUrl={mapImageUrl}
      />
      <body>
        <div className="page">
          <Nav
            title={area?.display_name}
            backHref={area && explorePath(area.slug_path)}
          />
          <main>
            <Bannerv2
              description={area?.city?.display_name}
              showSearch={false}
              searchCountry={null}
              dark={true}
            >
              <>
                <StaticMapImage src={mapImageUrl} />
                <InteractiveActions
                  placeManager={placeManager}
                  subscriptionManager={subscriptionManager}
                />
              </>
            </Bannerv2>

            {!activity && <ActivityDetailShimmer />}
            {activity && <ActivityDetail activity={activity} locale={locale} />}

            {!isAuthenticated && (
              <div className="container pt-3">
                <LoginOrSignUpCtaTile
                  alternativeTitle={t("Sign Up To View More")}
                />
              </div>
            )}

            <Footer />
          </main>
        </div>
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { activityId, countrySlug, citySlug, areaSlug } = context.params;

  return {
    props: {
      countrySlug,
      citySlug,
      areaSlug,
      activityId,
    },
  };
}
