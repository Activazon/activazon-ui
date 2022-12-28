import Head from "next/head";
import Nav from "../../../components/Nav";
import Banner from "../../../components/Banner";
import NeighbourhoodCard from "../../../components/NeighbourhoodCard";
import ActivityCard from "../../../components/ActivityCard";
import Footer from "../../../components/Footer";
import { useTrans } from "../../../lib/trans";

export default function Home() {
  const { i } = useTrans();
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
              title={i("Get to know your neighbourhood")}
              showSearch={true}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-activity"></i>{" "}
                {i("Most Active Neighbourhoods")}
              </p>

              <NeighbourhoodCard
                href="/n/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />

              <NeighbourhoodCard
                href="/n/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />
              <NeighbourhoodCard
                href="/n/1"
                title="Barrio Concepción"
                description="San Pedro Sula"
              />
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
