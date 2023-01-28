import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import SearchInput from "components/SearchInput";
import SearchTypeSelector from "components/SearchTypeSelector";
import { useTrans } from "lib/trans";
import { useState } from "react";
import { searchCities, searchAreas } from "lib/client-api";

const SEARCH_LIMIT = 15;

export default function Home() {
  const { t } = useTrans();
  const [searchType, setSearchType] = useState("city");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const onSearch = async (value) => {
    setIsBusy(true);

    const [cities, areas] = await Promise.all([
      searchCities(value, SEARCH_LIMIT),
      searchAreas(value, SEARCH_LIMIT),
    ]);

    console.log("search results", {
      value,
      cities,
      areas,
    });

    setIsBusy(false);
  };

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav />
          <main>
            <Bannerv2 title={t("Search for your neighbourhood")} dark={true}>
              <div className="row mt-4" />
            </Bannerv2>

            <div className="container mt-3">
              <SearchInput onSearch={onSearch} />
              <SearchTypeSelector
                searchType={searchType}
                onSearchTypeChange={setSearchType}
              />
            </div>

            <Footer />
          </main>
        </div>
      </body>
    </>
  );
}
