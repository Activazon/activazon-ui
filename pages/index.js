import Head from "next/head";
import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useTrans } from "../lib/trans";

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
          <Nav />
          <main>
            <Banner
              title={i("AI-powered insights for your neighborhood")}
              showSearch={true}
            />

            <div className="container pt-3">
              <p className="lead">{i("Explore Countries")}</p>
              <p>
                {i(
                  "Explore the neighborhoods of countries, see what is going on"
                )}
                .
              </p>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <CountryCard />
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <p className="lead">{i("What is Activazon")}</p>
              <p>
                {i(
                  "Activazon uses advanced AI to bring you customized, reliable information about the neighborhoods and communities you care about. Stay informed and feel secure with Activazon, whether you&apos;re a resident or a traveler."
                )}
              </p>
            </div>
            {/* <div className="container mt-3">
              <p className="lead">Message from the Creator</p>
              <p>
                I&apos;ve noticed that some countries get such a bad rap for
                being dangerous just because of the side that stream on main
                stream media. But in truth, these places are so much more than
                that – they have amazing food, friendly people, and rich
                cultures that are worth exploring. I understand why people might
                be hesitant to visit. That&apos;s where Activazon comes in. We
                want to help people feel at ease and confident while they are in
                these countries. With Activazon, you can discover all the beauty
                and wonder that these places have to offer without worrying with
                security and confidence. - Creator of Activazon
              </p>
            </div> */}
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
