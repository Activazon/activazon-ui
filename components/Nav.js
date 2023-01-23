import Link from "next/link";
import { useRouter } from "next/router";
import { trackLocaleChange } from "lib/track";
import { explorePath } from "lib/urls";

const Nav = ({ title, backHref }) => {
  const router = useRouter();
  // const localButtonLabel = router.locale === "en" ? "ES" : "EN";
  const toggleLocale = () => {
    // switch to the other locale
    const nextLocale = router.locale === "en" ? "es" : "en";
    trackLocaleChange(nextLocale);
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
  };

  return (
    <nav className="navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" href={backHref || explorePath()}>
          {!backHref ? (
            <i className="bi bi-activity"></i>
          ) : (
            <i className="bi bi-chevron-left"></i>
          )}{" "}
          {title || "Activazon"}
        </Link>

        <div className="flex-grow-1"></div>
        {/* <button className="btn btn-locale-change" onClick={toggleLocale}>
          <i className="bi bi-translate" /> {localButtonLabel}
        </button> */}
        <button className="btn btn-nav-menu" onClick={toggleLocale}>
          <i className="bi bi-list" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
