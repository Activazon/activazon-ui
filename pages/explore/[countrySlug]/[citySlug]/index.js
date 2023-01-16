import { useEffect } from "react";
import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import LoginOrSignUpCtaTile from "components/LoginOrSignUpCtaTile";
import { useTrans } from "lib/trans";
import { getCity } from "lib/api-v2";
import { trackHome } from "lib/track";
import { explorePath } from "lib/urls";
import { isAuthenticatedFromContext } from "lib/auth";

const StaticMapImage = ({ src }) => {
  return <img src={src} className="banner-static-map-image" />;
};

const Page = ({ city, isAuthenticated }) => {
  const { t, p, locale } = useTrans();
  const activitesText = p(
    "1 activity",
    "{{count}} activities",
    city.activity_total_last5months
  );
  const bannerDescription = (
    <>
      {city.country.display_name} &ndash; {activitesText}
    </>
  );
  const address = `${city.display_name}, ${city.country.display_name}`;
  const headTitle = `${address} (${activitesText})`;
  const metaDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );

  return (
    <>
      <Head
        title={headTitle}
        descriptionText={metaDescription}
        keywordsExtras={[address]}
      />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Bannerv2
              title={city.display_name}
              // description={p(
              //   "1 activity in the last 5 months",
              //   "{{count}} activities in the last 5 months",
              //   city.activity_total_last5months
              // )}
              description={bannerDescription}
              showSearch={false}
              searchCountry={null}
              dark={true}
            >
              <>
                <div className="row">
                  <StaticMapImage src={city.image_wide_url} />
                </div>
              </>
            </Bannerv2>

            <div className="container pt-3">{/*  */}</div>
            {!isAuthenticated && (
              <div className="container pt-3">
                <LoginOrSignUpCtaTile />
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
  const { countrySlug, citySlug } = context.params;

  console.log("params", { countrySlug, citySlug });

  const isAuthenticated = isAuthenticatedFromContext(context);

  const city = await getCity(countrySlug, citySlug);

  if (isNaN(city.id)) {
    return {
      notFound: true,
    };
  }

  console.log("city", city);

  return {
    props: {
      isAuthenticated, // use to determine to show signin / login card
      city,
    },
  };
}
