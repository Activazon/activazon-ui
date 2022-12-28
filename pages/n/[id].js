import Head from "../../components/Head";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import ActivityTypeCard from "../../components/ActivityTypeCard";
import ActivityCard from "../../components/ActivityCard";
import Footer from "../../components/Footer";
import { useTrans } from "./../../lib/trans";

export default function Home() {
  const { i, p } = useTrans();
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

              <ActivityTypeCard
                count={5}
                // href="/a/1"
                href="#"
                title={p("arrest", "arrests", 5)}
                description={i("Reported in the last 6 months")}
              />
              <ActivityTypeCard
                count={2}
                // href="/a/1"
                href="#"
                title={p("robbery", "robberies", 2)}
                description={i("Reported in the last 6 months")}
              />
              <ActivityTypeCard
                count={1}
                // href="/a/1"
                href="#"
                title={p("murder", "murders", 1)}
                description={i("Reported in the last 6 months")}
              />
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
