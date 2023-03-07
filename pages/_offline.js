import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";

import { useTrans } from "lib/trans";

export default function Home() {
  const { i } = useTrans();

  return (
    <>
      <Head title={"Offline"} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <div className="container mt-3 lead">
              <p className="mt-5 text-center display-1">
                <i className="bi bi-wifi-off"></i>
              </p>
              <p className="text-center lead">
                {i("Seems like there is no internet connection")}
              </p>
            </div>

            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
