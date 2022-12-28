import Head from "next/head";
import Nav from "../../../../components/Nav";
import Banner from "../../../../components/Banner";
import ActivityTypeCard from "../../../../components/ActivityTypeCard";
import ActivityCard from "../../../../components/ActivityCard";
import Footer from "../../../../components/Footer";

export default function Home() {
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
          <Nav pageTitle={"Honduras"} />
          <main>
            <Banner
              title={"Barrio Concepción"}
              description={"San Pedro Sula"}
              showSearch={true}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> Summary
              </p>

              <ActivityTypeCard
                count={5}
                // href="/c/honduras/activity/1"
                href="#"
                title="Arrests"
                description="Reported in the last 6 months"
              />
              <ActivityTypeCard
                count={2}
                // href="/c/honduras/activity/1"
                href="#"
                title="Robberies"
                description="Reported in the last 6 months"
              />
              <ActivityTypeCard
                count={1}
                // href="/c/honduras/activity/1"
                href="#"
                title="Murders"
                description="Reported in the last 6 months"
              />
            </div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i> Activity in this area
              </p>

              <ActivityCard
                href="/honduras/activity/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/honduras/activity/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/honduras/activity/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
              <ActivityCard
                href="/honduras/activity/1"
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
