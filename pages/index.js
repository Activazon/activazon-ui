import Head from "next/head";
import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
          <Nav />
          <main>
            <Banner
              title="AI-powered insights for your neighborhood"
              showSearch={true}
            />

            <div className="container pt-3">
              <p className="lead">Explore</p>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <CountryCard />
                </div>
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
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
