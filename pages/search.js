import Nav from "components/Nav";
import Footer from "components/Footer";
import Head from "components/Head";

import { useRouter } from "next/router";
import { explorePath } from "lib/urls";
import { useTrans } from "lib/trans";
import { useEffect, useState } from "react";
import { searchCities, searchAreas } from "lib/client-api";
import { useTrackOnce, track } from "lib/track";

const SEARCH_LIMIT = 25;

export default function Page() {
  const { t, ts } = useTrans();
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
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />
        </div>
      </body>
    </>
  );
}
