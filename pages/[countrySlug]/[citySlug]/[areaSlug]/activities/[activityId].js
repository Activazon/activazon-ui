import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import ChangeLanguageLink from "components/ChangeLaugageLink";
import StaticMapImage from "components/StaticMapImage";
import InteractiveActions from "components/InteractiveActions";
import { useTrans } from "lib/trans";
import { getActivity } from "lib/api-v2";
import { useDate } from "lib/date";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";

import { useSubscriptionManager } from "lib/subscriptionManager";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";

const Page = ({ countrySlug, citySlug, areaSlug, activity }) => {
  const user = useUserRequired();
  const { t, locale } = useTrans();
  const { displayDate } = useDate();
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

  const address = detailsLoaded && area.display_name;
  const seoTitle = t("{{activity_type_name}} in {{neighbourhood_name}}", {
    activity_type_name: t(activity.activity_type.name),
    neighbourhood_name: detailsLoaded && area.display_name,
  });
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const isAuthenticated = !!user;
  const mapImageUrl = detailsLoaded && area.image_wide_url;
  const summary = {
    en: activity.summary_en,
    es: activity.summary_es,
  }[locale];

  useTrackOnce("page.explore.area.activity", {
    isAuthenticated: !!user,
    activityId: activity.id,
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
        {detailsLoaded && (
          <div className="page">
            <Nav
              title={area.display_name}
              backHref={explorePath(area.slug_path)}
            />
            <main>
              <Bannerv2
                description={area.city.display_name}
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

              <div className="container pt-3">
                <p className="lead mb-1 text-capitalized">{t("Summary")}</p>
                <p className="text-capitalize mb-2">
                  <b>{displayDate(activity.date_occured)}</b>
                </p>
                <p>{summary}</p>

                <ChangeLanguageLink />

                <p className="mt-4">
                  <b>
                    {t(
                      "Learn more about this incident with these in-depth news articles"
                    )}
                  </b>
                </p>
                <GeoWithImagesTile
                  image={
                    "/sources/" + activity.source_article.source_name + ".jpg"
                  }
                  title={activity.source_article.source_display_name}
                  description={activity.source_article.source_title}
                  href={activity.source_article.source_url}
                />
              </div>

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
        )}
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { activityId, countrySlug, citySlug, areaSlug } = context.params;
  const activity = await getActivity(activityId);

  if (isNaN(activity.id)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      countrySlug,
      citySlug,
      areaSlug,
      activity,
    },
  };
}
