import Head from "next/head";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import ActivityTypeCard from "../../components/ActivityTypeCard";
import ActivityCard from "../../components/ActivityCard";
import Footer from "../../components/Footer";
import { useTrans } from "./../../lib/trans";

export default function Home() {
  const { i } = useTrans();
  return (
    <>
      <Head>
        <title>Barrio Concepción, San Pedro Sula, Honduras - Activazon</title>
        <meta
          name="description"
          content="AI-powered insights for your neighborhood"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                title={i("arrest")}
                description={i("Reported in the last 6 months")}
              />
              <ActivityTypeCard
                count={2}
                // href="/a/1"
                href="#"
                title={i("robbery")}
                description={i("Reported in the last 6 months")}
              />
              <ActivityTypeCard
                count={1}
                // href="/a/1"
                href="#"
                title={i("murder")}
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
