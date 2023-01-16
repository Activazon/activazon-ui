import { useEffect } from "react";
import Banner from "components/Banner";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import GeoWithImagesCard from "components/GeoWithImagesCard";
import { useTrans } from "lib/trans";
import { getCities } from "lib/api-v2";
import { trackHome } from "lib/track";
import { explorePath } from "lib/urls";
import { isAuthenticatedFromContext } from "lib/auth";

const Page = ({ cities }) => {
  const { i, t, locale } = useTrans();
  useEffect(() => {
    trackHome(locale);
  }, []);
  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Banner
              title={i("Get to know your neighbourhood")}
              showSearch={true}
              searchCountry={null}
            />

            <div className="container pt-3">
              <div className="row gy-2">
                {cities?.results?.map((c) => (
                  <div className="col-12">
                    <GeoWithImagesCard
                      href={explorePath(c.slug_path)}
                      key={`city-card-${c.id}`}
                      image={c.image_square_url}
                      lead={c.country.display_name}
                      title={c.display_name}
                      description={
                        "15 reported activities in the last 5 months"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
};

export default Page;

export async function getServerSideProps(context) {
  const isAuthenticated = isAuthenticatedFromContext(context);
  const paginationLimit = isAuthenticated ? 15 : 6;
  const canLoadMore = isAuthenticated;
  const cities = await getCities(paginationLimit);

  return {
    props: {
      isAuthenticated, // use to determine to show signin / login card
      cities,
      canLoadMore,
    },
  };
}
