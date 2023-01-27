import { useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const NavMenuItem = ({ icon, label, active, href, onClick }) => {
  return (
    <Link
      className={`nav-link${active ? " active" : ""}`}
      id="v-pills-home-tab"
      data-toggle="pill"
      href={href}
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      onClick={onClick}
    >
      <p>
        {icon}
        {label}
      </p>
    </Link>
  );
};

const NavMenu = ({ open, close }) => {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const localButtonLabel =
    router.locale === "en"
      ? "Cambiar idioma a Español"
      : "Change Language to English";
  const toggleLocale = () => {
    // switch to the other locale
    const nextLocale = router.locale === "en" ? "es" : "en";
    // trackLocaleChange(nextLocale);
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
  };
  const isActive = useCallback(
    (path) => {
      return path === router.pathname;
    },
    [router.pathname]
  );

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="nav nav-menu-dropdown flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <div className="container">
          <NavMenuItem
            icon={<i className="bi bi-binoculars me-3" />}
            label="Explore"
            active={isActive("/explore")}
            href="/explore"
          />
          {!isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-box-arrow-in-right me-3" />}
              label="Sign Up"
              active={isActive("/signup")}
              href="/signup"
            />
          )}
          {isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-person-circle me-3" />}
              label="Account"
              href="/account"
              active={isActive("/account")}
            />
          )}
          <NavMenuItem
            icon={<i className="bi bi-translate me-3" />}
            label={localButtonLabel}
            href="#"
            active={false}
            onClick={toggleLocale}
          />
          {isAuthenticated && (
            <NavMenuItem
              icon={<i className="bi bi-box-arrow-left me-3" />}
              label="Sign Out"
              href="#"
              active={false}
              onClick={() => signOut()}
            />
          )}
        </div>
      </div>
      <div className="nav-overlay" onClick={close}></div>
    </>
  );
};

export default NavMenu;
