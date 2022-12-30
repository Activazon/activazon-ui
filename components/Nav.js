import Link from "next/link";
import { useRouter } from "next/router";
import { trackLocaleChange } from "../lib/track";

const Nav = ({ pageTitle, backUrl }) => {
  const router = useRouter();
  const localButtonLabel = router.locale === "en" ? "ES" : "EN";
  const toggleLocale = () => {
    // switch to the other locale
    const nextLocale = router.locale === "en" ? "es" : "en";
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
    trackLocaleChange(locale);
  };

  return (
    <nav className="navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" href={backUrl || "/"}>
          {!backUrl ? (
            <i className="bi bi-activity"></i>
          ) : (
            <i className="bi bi-caret-left-fill"></i>
          )}{" "}
          Activazon
        </Link>

        <p className="page-title">{pageTitle}</p>
        <div className="flex-grow-1"></div>
        <button className="btn btn-locale-change" onClick={toggleLocale}>
          {" "}
          <i className="bi bi-translate" /> {localButtonLabel}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
