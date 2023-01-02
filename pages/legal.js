import Banner from "../components/Banner";
import CountryCard from "../components/CountryCard";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "../components/Head";
import ReactMarkdown from "react-markdown";
import { useTrans } from "../lib/trans";
import { getCountries } from "../lib/api";

import TermsOfUseEs from "../contents/legal_es.md";
import TermsOfUseEn from "../contents/legal_en.md";

export default function Home({ countries }) {
  const { i, locale } = useTrans();
  const content = locale === "es" ? TermsOfUseEs : TermsOfUseEn;

  return (
    <>
      <Head title={i("Terms of Use")} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Banner title={i("Terms of Use")} showSearch={false} />

            <div className="container pt-3">
              <ReactMarkdown>{content}</ReactMarkdown>
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
