import Head from "../../components/Head";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import ActivityTypeCard from "../../components/ActivityTypeCard";
import ActivityCard from "../../components/ActivityCard";
import Footer from "../../components/Footer";
import { useTrans } from "./../../lib/trans";
import { useDate } from "./../../lib/date";
import {
  getNeighbourhood,
  getNeighbourhoodSummary,
  getNeighbourhoodActivities,
} from "../../lib/api";

export default function Home({ neighbourhood, summary, activities }) {
  const { i, pfs } = useTrans();
  const { displayDate } = useDate();
  return (
    <>
      <Head title={"Barrio Concepción, San Pedro Sula, Honduras"} />
      <body>
        <div className="page">
          <Nav
            pageTitle={i(neighbourhood.country)}
            backUrl={`/c/${neighbourhood.country}`}
          />
          <main>
            <Banner
              title={neighbourhood.name}
              description={neighbourhood.city}
              showSearch={true}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> {i("Summary")}
              </p>
              {summary.total > 0 &&
                summary.activities.map((activity) => (
                  <ActivityTypeCard
                    count={activity.count}
                    title={pfs(activity.activity_type_name, activity.count)}
                    description={i(
                      summary.activites_since === "total__last_5_months"
                        ? "Activities in the last 5 months"
                        : "Recent activities"
                    )}
                  />
                ))}
              {summary.total === 0 && (
                <p>
                  {i(
                    summary.activites_since === "total__last_5_months"
                      ? "No activity in the last 5 months"
                      : "No recent actvitiy"
                  )}
                </p>
              )}
            </div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i> {i("Activity in this area")}
              </p>

              {activities.results.map((activity) => (
                <ActivityCard
                  key={`activity-${activity.id}`}
                  href={`/a/${activity.id}`}
                  title={i("{{activity_type_name}} in {{neighbourhood_name}}", {
                    activity_type_name: i(activity.activity_type.name),
                    neighbourhood_name: activity.neighbourhood.name,
                  })}
                  description={i("Reported {{date}}", {
                    date: displayDate(activity.date_occured),
                  })}
                />
              ))}
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps(context) {
  if (isNaN(context.params.id)) {
    return {
      notFound: true,
    };
  }

  const neighbourhoodId = parseInt(context.params.id);
  const neighbourhood = await getNeighbourhood(neighbourhoodId);

  if (!neighbourhood.id) {
    return {
      notFound: true,
    };
  }

  const summary = await getNeighbourhoodSummary(neighbourhoodId);
  const activities = await getNeighbourhoodActivities(neighbourhoodId);

  return {
    props: {
      neighbourhood,
      summary,
      activities,
    },
  };
}
