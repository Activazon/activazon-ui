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
import Link from "next/link";

import { useRouter } from "next/router";
import { explorePath } from "lib/urls";
import { useTrans } from "lib/trans";
import { useEffect, useState } from "react";
import { searchCities, searchAreas } from "lib/client-api";
import { useTrackOnce, track } from "lib/track";

const SEARCH_LIMIT = 25;

const AreaList = ({ areas, t }) => (
  <Col>
    <GeoWithImagesTileContainer
      description={t("{{count}} results found", {
        count: areas?.count || 0,
      })}
    >
      {areas?.results?.map((area) => (
        <div className="col-12 col-md-6">
          <GeoWithImagesTile
            href={explorePath(area.slug_path)}
            key={`area-card-${area.id}`}
            image={area.image_square_red_url || area.image_square_url}
            title={area.display_name}
            lead={area.city.display_name}
          />
        </div>
      ))}
    </GeoWithImagesTileContainer>
  </Col>
);

const CityList = ({ cities, t }) => (
  <Col>
    <GeoWithImagesTileContainer
      description={t("{{count}} results found", {
        count: cities?.count || 0,
      })}
    >
      {cities?.results?.map((c) => (
        <div className="col-12 col-md-6">
          <GeoWithImagesTile
            href={explorePath(c.slug_path)}
            key={`city-card-${c.id}`}
            image={c.image_square_url}
            lead={c.country.display_name}
            title={c.display_name}
          />
        </div>
      ))}
    </GeoWithImagesTileContainer>
  </Col>
);

const CtaSafe = ({}) => {
  const { t } = useTrans();

  return (
    <Col>
      <div className="card card-body tile tile-login-or-signup-cta">
        <div className="row text-center gy-3">
          <div className="col-12">
            <i className="tile-icon bi bi-binoculars-fill" />
          </div>
          <div className="col-12">
            <h2 className="tile-title">
              {t("Don't see your neighborhood? Help us expand!")}
            </h2>
          </div>
          <div className="col-12">
            <p className="tile-description">
              {t(
                "We're sorry that we don't currently have information for your desired location, but you can help us change that! By signing up, you'll become a part of our community of users who are working to make Activazon the most comprehensive resource for community safety."
              )}
            </p>
          </div>
          <div className="col-12">
            <Link
              href={{
                pathname: "/signup",
                query: { callbackUrl: "/", ref: "activazon.search" },
              }}
              className="btn btn-tile"
            >
              {t("Sign Up")}
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default function Page() {
  const { t } = useTrans();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("city");
  const [hasSearched, setHasSearched] = useState(false);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  useTrackOnce("page.search", {});

  useEffect(() => {
    // search on page load if there is a querystring
    const searchQuery = router.query.v;
    if (searchQuery) {
      setSearchValue(searchQuery);
      onSearch(searchQuery);
    }
  }, [router.query.v]);

  const onSearch = async (value) => {
    if (value.trim() === "") {
      return;
    }
    setIsBusy(true);
    setHasSearched(true);

    track("search", { query: value });

    const [c, a] = await Promise.all([
      searchCities(value, SEARCH_LIMIT),
      searchAreas(value, SEARCH_LIMIT),
    ]);

    setCities(c);
    setAreas(a);

    if (c.count > 0 && a.count === 0) {
      setSearchType("city");
    }
    if (c.count === 0 && a.count > 0) {
      setSearchType("area");
    }
    if (c.count === 0 && a.count === 0) {
      setSearchType("cta_safe");
    }

    setIsBusy(false);
  };

  return (
    <>
      <Head title={t("Search for your neighbourhood")} />
      <body>
        <div className="page">
          <Nav />
          <Bannerv2 title={t("Search for your neighbourhood")}>
            <div className="row mt-3">
              <div className="col-12">
                <SearchInput
                  onSearch={onSearch}
                  setValue={setSearchValue}
                  value={searchValue}
                />
              </div>
            </div>
          </Bannerv2>
          <Main>
            {hasSearched && searchType !== "cta_safe" && (
              <Col>
                <SearchTypeSelector
                  searchType={searchType}
                  onSearchTypeChange={setSearchType}
                />
              </Col>
            )}

            {isBusy && (
              <div className="w-100 text-center mt-5">
                <div
                  className="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                ></div>
              </div>
            )}
            {hasSearched && searchType === "area" && (
              <AreaList areas={areas} t={t} />
            )}
            {hasSearched && searchType === "city" && (
              <CityList cities={cities} t={t} />
            )}
            {searchType === "cta_safe" && <CtaSafe />}
            <Footer />
          </Main>
        </div>
      </body>
    </>
  );
}
