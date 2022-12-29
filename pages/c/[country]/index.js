import Head from "../../../components/Head";
import Nav from "../../../components/Nav";
import Banner from "../../../components/Banner";
import NeighbourhoodCard from "../../../components/NeighbourhoodCard";
import ActivityCard from "../../../components/ActivityCard";
import Footer from "../../../components/Footer";
import { useTrans } from "../../../lib/trans";
import { useDate } from "../../../lib/date";

import { getNeighbourhoods, getCountryRecentActivity } from "../../../lib/api";

export default function Home({ country, neighbourhoods, activities }) {
  const { i, p } = useTrans();
  const { displayDate } = useDate();
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
                <i className="bi bi-activity"></i> {i("Neighbourhoods")}
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

            {activities.count > 0 && (
              <div className="container mt-3">
                <p className="lead">
                  <i className="bi bi-activity"></i> {i("Recent Activity")}
                </p>
                {activities.results.map((activity) => (
                  <ActivityCard
                    key={`activity-${activity.id}`}
                    href={`/a/${activity.id}`}
                    // href="/a/1"
                    title={i(
                      "{{activity_type_name}} in {{neighbourhood_name}}",
                      {
                        activity_type_name: activity.activity_type.name,
                        neighbourhood_name: activity.neighbourhood.name,
                      }
                    )}
                    description={i("Reported {{date}}", {
                      date: displayDate(activity.activities),
                    })}
                  />
                ))}
              </div>
            )}
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
  const activities = await getCountryRecentActivity(country, 3); // hard limit of 3, not filterable

  if (neighbourhoods.count === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      country,
      neighbourhoods,
      activities,
    },
  };
}
