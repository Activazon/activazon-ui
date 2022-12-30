import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "../components/Head";
import { useTrans } from "../lib/trans";
import { getCountries } from "../lib/api";

export default function Home({ countries }) {
  const { i } = useTrans();
  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Banner
              title={i("AI-powered insights for your neighborhood")}
              showSearch={true}
            />

            <div className="container pt-3">
              <p className="lead">
                <i className="bi bi-binoculars-fill"></i>{" "}
                {i("Explore Countries")}
              </p>
              <p>
                {i(
                  "Explore the neighborhoods of countries, see what is going on"
                )}
                .
              </p>
              <div className="row">
                {countries.results.map((country) => (
                  <div className="col-12 col-md-6 col-lg-4">
                    <CountryCard
                      displayName={i(country.name)}
                      name={country.name}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-chat-fill" /> {i("What is Activazon")}
              </p>
              <p>
                {i(
                  "Activazon is an artificial intelligence service designed to keep you informed and safe with real-time updates on crimes in your neighborhood. Our advanced technology does all the work for you, without the need for human intervention. Relax and let Activazon take care of keeping you informed and safe. We're here to help!"
                )}
              </p>
            </div>
            <div className="container mt-3">
              <p className="lead">
                <i className="bi bi-chat-heart-fill" />{" "}
                {i("You don't need to fear AI")}
              </p>
              <p>
                {i(
                  "We understand that some people may have concerns about the increasing use of artificial intelligence in our society. But we want to assure you that Activazon is designed to be a useful and beneficial tool, not a harmful or disruptive one. Our AI service is designed to make your life easier and safer. Trust that Activazon is here to help."
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

export async function getServerSideProps(context) {
  const countries = await getCountries(100);

  return {
    props: {
      countries,
    },
  };
}
