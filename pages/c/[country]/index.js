import Head from "next/head";
import Nav from "../../../components/Nav";
import Banner from "../../../components/Banner";
import NeighbourhoodCard from "../../../components/NeighbourhoodCard";
import ActivityCard from "../../../components/ActivityCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Activazon</title>
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
              title={"Get to know your neighbourhood"}
              showSearch={true}
            />

            <div class="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i> Most Active Neighbourhoods
              </p>

              <NeighbourhoodCard
                href="/c/honduras/neighbourhood/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />

              <NeighbourhoodCard
                href="/c/honduras/neighbourhood/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />
              <NeighbourhoodCard
                href="/c/honduras/neighbourhood/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />
            </div>

            <div class="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i> Recent Activity
              </p>
              <ActivityCard
                href="#"
                // href="/c/honduras/activity/1"
                title="Arrest in Barrio Concepción"
                description="A robbery took place at a gas station"
              />
            </div>
          </main>
        </div>
      </body>
    </>
  );
}
