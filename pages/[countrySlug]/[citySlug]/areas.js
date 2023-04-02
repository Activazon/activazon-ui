import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import PlaceList from "components/PlaceList";

import { useTrans } from "lib/trans";
import { getCityAreas } from "lib/client-api";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";
import { usePlaceManager } from "lib/placeManager";
import { useCallback, useEffect, useState } from "react";

const Page = ({ countrySlug, citySlug }) => {
  const { t } = useTrans();
  const user = useUserRequired();

  const { city } = usePlaceManager("city", countrySlug, citySlug, null, {});
  const seoLoaded = !!city;

  const [areas, setAreas] = useState(null);
  useEffect(() => {
    if (city && !areas) {
      getCityAreas(city.id, 30).then((resp) => setAreas(resp));
    }
  }, [city, areas]);

  const areasText =
    seoLoaded &&
    t("Areas in {{city}} actively being tracked", {
      city: city.display_name,
    });
  const address =
    seoLoaded && `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = seoLoaded && `${address} (${areasText})`;
  const seoDescription =
    seoLoaded &&
    t(
      "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
      {
        address,
      }
    );
  const seoImageUrl = seoLoaded && city.image_wide_url;
  useTrackOnce("page.explore.city.areas", {
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
            backHref={city && explorePath(city?.slug_path)}
            title={city?.display_name}
          />
          <Main>
            <Col>
              <PlaceList
                name="city-areas"
                title={t("Areas in {{city}}", {
                  city: city?.display_name,
                })}
                items={areas?.results}
                accessorHref={(area) => explorePath(area.slug_path)}
                accessorImageUrl={(area) =>
                  area.image_square_red_url || area.image_square_url
                }
                accessorLead={useCallback((area) => city.display_name, [city])}
                accessorTitle={(area) => area.display_name}
                accessorDescription={null}
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
