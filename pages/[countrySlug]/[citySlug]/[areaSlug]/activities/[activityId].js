import { useRouter } from "next/router";
import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import { useTrans } from "lib/trans";
import { getActivity } from "lib/api-v2";
import { useDate } from "lib/date";
import { explorePath } from "lib/urls";
import { useSession } from "next-auth/react";
import { track } from "lib/track";
import { useEffect } from "react";

const StaticMapImage = ({ src }) => {
  return <img src={src} className="banner-static-map-image" />;
};

const Page = ({ activity }) => {
  const router = useRouter();
  const { status } = useSession();
  const { t, p, locale } = useTrans();
  const { displayDate } = useDate();
  const activitesText = p(
    "1 activity",
    "{{count}} activities",
    activity.area.activity_total_last5months
  );
  const address = activity.area.display_name;
  const seoTitle = `${address} (${activitesText})`;
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const isAuthenticated = status === "authenticated";
  const mapImageUrl = activity.area.image_wide_url;
  const summary = {
    en: activity.summary_en,
    es: activity.summary_es,
  }[locale];

  useEffect(() => {
    track("page.explore.area.activity", {
      authStatus: status,
      activityId: activity.id,
    });
  });

  if (status === "unauthenticated") {
    router.push("/signup?callbackUrl=" + router.asPath);
  }

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
            title={activity.area.display_name}
            backHref={explorePath(activity.area.slug_path)}
          />
          <main>
            <Bannerv2
              // title={activity.area.display_name}
              // description={p(
              //   "1 activity in the last 5 months",
              //   "{{count}} activities in the last 5 months",
              //   city.activity_total_last5months
              // )}
              description={activity.area.city.display_name}
              showSearch={false}
              searchCountry={null}
              dark={true}
            >
              <>
                <div className="row">
                  <StaticMapImage src={mapImageUrl} />
                </div>
              </>
            </Bannerv2>

            <div className="container pt-3">
              <p className="lead mb-1 text-capitalized">{t("Summary")}</p>
              <p className="text-capitalize mb-2">
                <b>{displayDate(activity.date_occured)}</b>
              </p>
              <p>{summary}</p>
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
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { activityId } = context.params;
  const activity = await getActivity(activityId);

  if (isNaN(activity.id)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activity,
    },
  };
}
