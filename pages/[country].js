import Head from "next/head";
import NeighbourhoodCard from "./../components/NeighbourhoodCard";
import ActivityCard from "./../components/ActivityCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Activazon</title>
        <meta name="description" content="Generated by create next app" />
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
          <p className="banner-text">Get to know your neighbourhood</p>
          <div class="row">
            <div class="search-form">
              <input type="text" placeholder="Search your neighbourhood" />
            </div>
          </div>
        </div>

        <div class="container mt-3">
          <p className="lead">
            <i className="bi bi-activity"></i> Most Active Neighbourhoods
          </p>

          <NeighbourhoodCard
            href="/honduras/neighbourhood/1"
            title="Barrio Concepción"
            description="San Pedro Sula"
          />

          <NeighbourhoodCard
            href="/honduras/neighbourhood/1"
            title="Barrio Concepción"
            description="San Pedro Sula"
          />
          <NeighbourhoodCard
            href="/honduras/neighbourhood/1"
            title="Barrio Concepción"
            description="San Pedro Sula"
          />
        </div>

        <div class="container mt-3">
          <p className="lead">
            <i className="bi bi-activity"></i> Recent Activity
          </p>
          <ActivityCard
            href="/honduras/activity/1"
            title="Arrest in Barrio Concepción"
            description="A robbery took place at a gas station"
          />
        </div>
      </body>
    </>
  );
}
