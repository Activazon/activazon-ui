import Head from "next/head";
import Link from "next/link";

const CountryCard = () => (
  <Link href="/c/honduras" className="text-decoration-none">
    <div className="card card-body card-row-sm">
      <div className="card-content">
        <p className="card-title">Honduras</p>
      </div>
    </div>
  </Link>
);

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
          <nav className="navbar sticky-top">
            <div className="container">
              <a className="navbar-brand" href="#">
                <i className="bi bi-activity"></i> Activazon
              </a>

              <p className="page-title"></p>
            </div>
          </nav>

          <div class="container banner">
            <p className="banner-text">
              AI-powered insights for your neighborhood
            </p>
            <div class="row">
              <div class="search-form">
                <input type="text" placeholder="Search your neighbourhood" />
              </div>
            </div>
          </div>
          <main className="flex-grow-1">
            <div className="container pt-3">
              <p className="lead">Explore</p>
              <div className="row">
                <div className="col-12">
                  <CountryCard />
                </div>
                {/* <div className="col-6">
              <CountryCard />
            </div> */}
              </div>
            </div>
            <div class="container mt-3">
              <p className="lead">What is Activazon</p>
              <p>
                Activazon uses advanced AI to bring you customized, reliable
                information about the neighborhoods and communities you care
                about. Stay informed and feel secure with Activazon, whether
                you&apos;re a resident or a traveler.
              </p>
            </div>
          </main>
        </div>
      </body>
    </>
  );
}
