import { useEffect } from "react";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "../components/Head";
import CountrySelector from "../components/CountrySelector";
import { useTrans } from "../lib/trans";
import { getCountries } from "../lib/api";
import { trackHome } from "../lib/track";

export default function Home({ countries }) {
  const { i, t, locale } = useTrans();
  useEffect(() => {
    trackHome(locale);
  }, []);
  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Banner
              title={i("Get to know your neighbourhood")}
              showSearch={true}
              searchCountry={null}
            />

            <div className="container pt-3">
              <CountrySelector countries={countries} />
            </div>
            {/* <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-chat-fill" /> {i("What is Activazon")}
              </p>
              <p>
                {i(
                  "Activazon is an artificial intelligence service designed to keep you informed and safe with real-time updates on crimes in your neighborhood. Our advanced technology does all the work for you, without the need for human intervention. Relax and let Activazon take care of keeping you informed and safe. We're here to help!"
                )}
              </p>
            </div> */}

            <div className="container mt-3">
              <div className="card card-body promo-card promo-card-light">
                <h2 className="lead text-center mb-4">
                  {t("Stay Safe and Informed with Activazon")}
                </h2>
                <p className="mb-0">
                  {t(
                    "We understand that staying informed and safe is a top priority, and that's where we come in. Our service analyzes and detects crime in neighborhoods to help residents and travelers stay informed and make informed decisions about where to go and when to be extra cautious."
                  )}
                </p>
              </div>
            </div>

            <div className="container mt-3">
              <div className="card card-body promo-card">
                <h2 className="lead text-center mb-4">
                  {t("We are always on the look out for you")}
                </h2>
                <p className="mb-0">
                  {t(
                    "Activazon is always analyzing and looking for updates on incidents to keep you informed and safe. We use publicly available information to generate summaries and alerts, so you can stay informed about crime in your neighborhood or destination."
                  )}
                </p>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}

export async function getServerSideProps(context) {
  const countries = await getCountries(100);

  return {
    props: {
      countries,
    },
  };
}
