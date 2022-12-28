import Head from "next/head";
import Image from "next/image";
import Nav from "../../../../components/Nav";
import Banner from "../../../../components/Banner";
import Footer from "../../../../components/Footer";

const Source = () => (
  <li className="list-group-item d-flex align-items-center">
    <Image
      src="/sources/elheraldo.jpg"
      width={80}
      height={80}
      alt="El Heraldo Logo"
      className="me-3"
    />
    <div>
      <p className="mb-0">
        Diana Rivera: sobreviviente de violencia que ahora clama ayuda para
        convertirse en ingeniera
      </p>
      <p className="mb-0">
        <small>El Heraldo</small>
      </p>
    </div>
  </li>
);

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
          <Nav pageTitle={"Honduras"} backUrl="/c/honduras" />
          <main>
            <Banner
              title={"Arrest in Barrio Concepción"}
              description={"Reported Yesterday"}
              showSearch={false}
            />

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> Summary
              </p>

              <p className="lh-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse at justo in risus tincidunt mollis. Aliquam porta
                semper neque, sed pellentesque velit sagittis at. Sed gravida,
                nisl at viverra aliquet, elit mauris vulputate urna, eget
                egestas metus turpis in libero. Nulla rutrum dictum congue.
                Etiam vestibulum, ex a cursus feugiat, est mi posuere nisi, quis
                blandit risus libero nec felis. Nulla aliquet ultrices tortor,
                id scelerisque ante luctus non. Etiam neque enim, consectetur ac
                tortor nec, auctor faucibus orci. Phasellus elementum leo
                vulputate posuere congue. Donec id ante ultrices nisi tristique
                mattis.
              </p>
            </div>

            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-card-text"></i> Sources
              </p>
              <p>
                This activity was detected by analyzing the following sources
                using AI.
              </p>

              <ul className="list-group">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                  href="https://elheraldo.hn/honduras/diana-rivera-sobreviviente-violencia-clama-ayuda-convertirse-ingeniera-forestal-unacifor-honduras-beca-siguatepeque-AG11535317"
                >
                  <Source />
                  <Source />
                  <Source />
                </a>
              </ul>
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
