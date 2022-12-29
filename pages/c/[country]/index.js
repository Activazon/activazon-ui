import Head from "../../../components/Head";
import Nav from "../../../components/Nav";
import Banner from "../../../components/Banner";
import NeighbourhoodCard from "../../../components/NeighbourhoodCard";
import ActivityCard from "../../../components/ActivityCard";
import Footer from "../../../components/Footer";
import { useTrans } from "../../../lib/trans";

import { getNeighbourhoods } from "../../../lib/api";

export default function Home({ country, neighbourhoods }) {
  const { i, p } = useTrans();
  return (
    <>
      <Head title={i(country)} />
      <body>
        <div className="page">
          <Nav pageTitle={i(country)} />
          <main>
            <Banner
              title={i("Get to know your neighbourhood")}
              showSearch={true}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i>{" "}
                {i("Most Active Neighbourhoods")}
              </p>
              {neighbourhoods.results.map((neighbour) => (
                <NeighbourhoodCard
                  key={`neighbourhood-${neighbour.id}`}
                  href={`/n/${neighbour.id}`}
                  title={neighbour.name}
                  description={neighbour.city}
                  description2={p(
                    "1 report in the last 5 months",
                    "{{count}} reports in the last 5 months",
                    neighbour.activity_metrics.total__last_5_months
                  )}
                />
              ))}
            </div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i> {i("Recent Activity")}
              </p>
              <ActivityCard
                href="#"
                // href="/a/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps(context) {
  const country = context.params.country.toLowerCase();
  const limit = parseInt(context.query.neihbourhood_limit || "3");

  const neighbourhoods = await getNeighbourhoods(country, limit);

  if (neighbourhoods.count === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
      neighbourhoods,
    },
  };
}
