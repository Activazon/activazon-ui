import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import A2hsCtaTile from "components/A2hsCtaTile";
import MapTile from "components/Map/MapTile";
import MapInfo from "components/Map/MapInfo";
import { ItemActivityTypePill } from "components/ItemList";
import { useTrans } from "lib/trans";
import { useTrackOnce } from "lib/track";
import { useUser } from "lib/user";
import { useEffect, useState } from "react";
import { useSubscriptionManager } from "lib/subscriptionManager";
import { usePlaceManager, PLACE_TYPES } from "lib/placeManager";
import { getActivity } from "lib/client-api";
import { useRouter } from "next/router";
import { isDisplayModeStandalone } from "lib/pwa";
import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import PlaceActionBar from "components/PlaceActionBar";
import SearchBar from "components/SearchBar";
import { useDate } from "lib/date";
import Link from "next/link";

const Page = ({ countrySlug, citySlug, areaSlug, activityId }) => {
  const router = useRouter();
  const [activity, setActivity] = useState(null);
  const user = useUser();
  const { t, ts, locale } = useTrans();
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
    ts("{{activity_type_name}} in {{neighbourhood_name}}", {
      activity_type_name: ts(activity.activity_type.name),
      neighbourhood_name: area.display_name,
    });
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );

  const mapImageUrl = detailsLoaded && area.image_wide_url;

  const summary = activity
    ? {
        en: activity.summary_en,
        es: activity.summary_es,
      }[locale]
    : null;

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
          <Nav />
          <Content>
            <SearchBar />
            {area && activity && (
              <>
                <ContentGroup>
                  <MapTile imgUrl={mapImageUrl} />
                  <MapInfo
                    areaType={t("Area")}
                    addressParts={[
                      area.display_name,
                      area.city.display_name,
                      area.city.country.display_name,
                    ]}
                    activityCount={area.activity_total_last5months}
                  />
                  <PlaceActionBar
                    placeManager={placeManager}
                    subscriptionManager={subscriptionManager}
                  />
                  <div>
                    <ItemActivityTypePill name={activity.activity_type.name} />
                    <span className="ms-3">
                      {displayDate(activity.date_occured)}
                    </span>
                  </div>
                  <div>
                    <p className="tw-text-gray-dark tw-m-0">{summary}</p>
                  </div>
                </ContentGroup>

                {activity.source_article && (
                  <Link
                    href={activity.source_article.source_url}
                    className="tw-no-underline"
                  >
                    <div className="tw-bg-blue-bright-trans tw-p-3 tw-rounded-full tw-flex tw-gap-3 tw-items-center">
                      <img
                        src={
                          "/sources/" +
                          activity.source_article.source_name +
                          ".jpg"
                        }
                        className="tw-h-[40px] tw-w-[40px] tw-rounded-full"
                      />
                      <div>
                        <p className="tw-m-0 tw-text-blue-bright">
                          {activity.source_article.source_title}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {!isDisplayModeStandalone() && <A2hsCtaTile />}
              </>
            )}
          </Content>
          <Footer />
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
