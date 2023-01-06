import { useCallback } from "react";
import Head from "../../components/Head";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import ActivityTypeCard from "../../components/ActivityTypeCard";
import NeighbourhoodActivityCard from "../../components/NeighbourhoodActivityCard";
import Footer from "../../components/Footer";
import { useTrans } from "./../../lib/trans";
import { useDate } from "./../../lib/date";
import {
  getNeighbourhood,
  getNeighbourhoodSummary,
  getNeighbourhoodActivities,
} from "../../lib/api";
import { capitalizeWords } from "../../lib/words";

export default function Home({ neighbourhood, summary, activities }) {
  const { i, pfs, locale } = useTrans();
  const { displayDate } = useDate();

  const summaryLocale = useCallback(
    (activity) => {
      return locale === "en" ? activity.summary_en : activity.summary_es;
    },
    [locale]
  );

  return (
    <>
      <Head
        title={capitalizeWords(
          [neighbourhood.name, neighbourhood.city, neighbourhood.country].join(
            " "
          )
        )}
      />
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
              showSearch={false}
              // bottomContent={
              //   <img
              //     className="rounded shadow"
              //     width={"100%"}
              //     src={`/api/nmap?nid=${neighbourhood.id}`}
              //   />
              // }
            />

            <div className="container mt-3"></div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> {i("Summary")}
              </p>
              <div className="row">
                {summary.total > 0 &&
                  summary.activities.map((activity) => (
                    <div
                      key={`activity-type-${activity.activity_type_name}`}
                      className="col-12 col-sm-4 col-md-4 col-lg-4"
                    >
                      <ActivityTypeCard
                        count={activity.count}
                        title={pfs(activity.activity_type_name, activity.count)}
                        description={i(
                          summary.activites_since === "total__last_5_months"
                            ? "Activities in the last 5 months"
                            : "Recent activities"
                        )}
                      />
                    </div>
                  ))}
              </div>
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
                <NeighbourhoodActivityCard
                  key={`activity-${activity.id}`}
                  href={`/a/${activity.id}`}
                  title={i("{{activity_type_name}} in area", {
                    activity_type_name: i(activity.activity_type.name),
                    neighbourhood_name: activity.neighbourhood.name,
                  })}
                  description={summaryLocale(activity)}
                  dateLabel={displayDate(activity.date_occured)}
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
