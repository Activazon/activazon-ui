import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import { useTrans } from "lib/trans";

export default function Home() {
  const { i } = useTrans();
  return (
    <>
      <Head title={"Page Not Found"} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Bannerv2 title={i("Try searching instead")} />

            <div className="container mt-3 lead">
              <p className="mt-5 text-center display-1">
                <i className="bi bi-binoculars-fill"></i>
              </p>
              <p className="text-center lead">
                {i("Whoops! Could not find the page you were looking for.")}
              </p>
            </div>

            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
