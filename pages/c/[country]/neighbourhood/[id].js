import Head from "next/head";
import ActivityTypeCard from "../../../../components/ActivityTypeCard";
import ActivityCard from "../../../../components/ActivityCard";

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
        <nav className="navbar sticky-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="bi bi-activity"></i> Activazon
            </a>

            <p className="page-title">Honduras</p>
          </div>
        </nav>
        <div class="container banner">
          <p className="banner-text">Barrio Concepción</p>
          <p className="banner-lead pb-4">San Pedro Sula</p>
        </div>

        <div class="container mt-3">
          <p className="lead">
            <i className="bi bi-card-text"></i> Summary
          </p>

          <ActivityTypeCard
            count={5}
            href="/honduras/activity/1"
            title="Arrests"
            description="Reported in the last 6 months"
          />
          <ActivityTypeCard
            count={2}
            href="/honduras/activity/1"
            title="Robberies"
            description="Reported in the last 6 months"
          />
          <ActivityTypeCard
            count={1}
            href="/honduras/activity/1"
            title="Murders"
            description="Reported in the last 6 months"
          />
        </div>

        <div class="container mt-3">
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
        <div class="container my-5 text-center">
          <p>&copy; Activazon 2023</p>
        </div>
      </body>
    </>
  );
}
