import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { trackLocaleChange } from "lib/track";
import { explorePath } from "lib/urls";
import { useSession, signOut } from "next-auth/react";

const Nav = ({ title, backHref }) => {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const localButtonLabel =
    router.locale === "en" ? "Verlo en Español" : "View in English";
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
        <button
          className="btn btn-nav-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-list" />
          )}
        </button>
      </div>
      <div className={`navigation-overlay${isMenuOpen ? " open" : ""}`}>
        <div className="container text-center">
          <div className="row mt-3 gy-3">
            <div className="col-12">
              <Link href="/" className="btn btn-menu w-100">
                <i className="bi bi-house-door-fill me-3" />
                Explore
              </Link>
            </div>

            {!isAuthenticated && (
              <div className="col-12">
                <Link href="/signin" className="btn btn-menu w-100">
                  <i className="bi bi-person-circle me-3" />
                  Sing In
                </Link>
              </div>
            )}

            <div className="col-12">
              <button onClick={toggleLocale} className="btn btn-menu w-100">
                <i className="bi bi-translate me-3" />
                {localButtonLabel}
              </button>
            </div>

            {isAuthenticated && (
              <div className="col-12">
                <button onClick={signOut} className="btn btn-menu w-100">
                  <i className="bi bi-person-circle me-3" />
                  Sing Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
