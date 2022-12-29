import Head from "../../components/Head";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import ActivityTypeCard from "../../components/ActivityTypeCard";
import ActivityCard from "../../components/ActivityCard";
import Footer from "../../components/Footer";
import { useTrans } from "./../../lib/trans";
import { getNeighbourhoodSummary } from "../../lib/api";

export default function Home({ summary }) {
  const { i, pfs } = useTrans();
  return (
    <>
      <Head title={"Barrio Concepción, San Pedro Sula, Honduras"} />
      <body>
        <div className="page">
          <Nav pageTitle={"Honduras"} backUrl="/c/honduras" />
          <main>
            <Banner
              title={"Barrio Concepción"}
              description={"San Pedro Sula"}
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

              <ActivityCard
                href="/a/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/a/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/a/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/a/1"
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
  if (isNaN(context.params.id)) {
    return {
      notFound: true,
    };
  }

  const neighbourhoodId = parseInt(context.params.id);

  const summary = await getNeighbourhoodSummary(neighbourhoodId);

  // if (neighbourhoods.count === 0) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      summary,
    },
  };
}
