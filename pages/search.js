import Bannerv2 from "components/Bannerv2";
import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";
import SearchInput from "components/SearchInput";
import SearchTypeSelector from "components/SearchTypeSelector";
import Main from "components/Main";
import Col from "components/Col";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";
import GeoWithImagesTile from "components/GeoWithImagesTile";

import { explorePath } from "lib/urls";
import { useTrans } from "lib/trans";
import { useState } from "react";
import { searchCities, searchAreas } from "lib/client-api";

const SEARCH_LIMIT = 25;

export default function Home() {
  const { t, p } = useTrans();
  const [searchType, setSearchType] = useState("city");
  const [hasSearched, setHasSearched] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const onSearch = async (value) => {
    setIsBusy(true);
    setHasSearched(true);

    const [c, a] = await Promise.all([
      searchCities(value, SEARCH_LIMIT),
      searchAreas(value, SEARCH_LIMIT),
    ]);

    setCities(c);
    setAreas(a);

    // console.log("search results", {
    //   value,
    //   cities,
    //   areas,
    // });

    setIsBusy(false);
  };

  return (
    <>
      <Head title={t("Search for your neighbourhood")} />
      <body>
        <div className="page">
          <Nav />
          <Bannerv2 title={t("Search for your neighbourhood")} />
          <Main>
            <Col>
              <SearchInput onSearch={onSearch} />
              <SearchTypeSelector
                searchType={searchType}
                onSearchTypeChange={setSearchType}
              />
            </Col>

            {isBusy && (
              <div className="w-100 text-center mt-5">
                <div
                  class="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                ></div>
              </div>
            )}

            <Col>
              {searchType === "area" && (
                <GeoWithImagesTileContainer
                  description={
                    hasSearched &&
                    t("{{count}} results found", {
                      count: areas?.count || 0,
                    })
                  }
                >
                  {areas?.results?.map((area) => (
                    <div className="col-12 col-md-6">
                      <GeoWithImagesTile
                        href={explorePath(area.slug_path)}
                        key={`area-card-${area.id}`}
                        image={
                          area.image_square_red_url || area.image_square_url
                        }
                        title={area.display_name}
                        lead={area.city.display_name}
                      />
                    </div>
                  ))}
                </GeoWithImagesTileContainer>
              )}
              {searchType === "city" && (
                <GeoWithImagesTileContainer
                  description={
                    hasSearched &&
                    t("{{count}} results found", {
                      count: cities?.count || 0,
                    })
                  }
                >
                  {cities?.results?.map((c) => (
                    <div className="col-12 col-md-6">
                      <GeoWithImagesTile
                        href={explorePath(c.slug_path)}
                        key={`city-card-${c.id}`}
                        image={c.image_square_url}
                        lead={c.country.display_name}
                        title={c.display_name}
                        description={p(
                          "1 activity in the last 5 months",
                          "{{count}} activities in the last 5 months",
                          c.activity_total_last5months
                        )}
                      />
                    </div>
                  ))}
                </GeoWithImagesTileContainer>
              )}
            </Col>

            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
}
