import Nav from "components/Nav";
import Col from "components/Col";
import Main from "components/Main";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";

import { useTrans } from "lib/trans";
import { getCity, getCityAreas } from "lib/api-v2";
import { explorePath } from "lib/urls";
import { useTrackOnce } from "lib/track";
import { useUserRequired } from "lib/user";

const Page = ({ city, areas }) => {
  const { t } = useTrans();
  const user = useUserRequired();
  const areasText = t("Areas in {{city}} actively being tracked", {
    city: city.display_name,
  });
  const address = `${city.display_name}, ${city.country.display_name}`;
  const seoTitle = `${address} (${areasText})`;
  const seoDescription = t(
    "Get an in-depth analysis of crime trends in {{address}} with Activazon. Sign up for a free account to access personalized crime reports and stay informed about local activity.",
    {
      address,
    }
  );
  const seoImageUrl = city.image_wide_url;
  useTrackOnce("page.explore.city.areas", {
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
              <GeoWithImagesTileContainer description={areasText}>
                {areas?.results?.map((area) => (
                  <div className="col-12 col-md-6">
                    <GeoWithImagesTile
                      href={explorePath(area.slug_path)}
                      key={`area-card-${area.id}`}
                      image={area.image_square_red_url || area.image_square_url}
                      lead={city.display_date}
                      title={area.display_name}
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
  const [areas] = await Promise.all([getCityAreas(city.id, null)]);

  return {
    props: {
      city,
      areas,
    },
  };
}
