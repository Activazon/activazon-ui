import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { trackLocaleChange } from "lib/track";
import { explorePath } from "lib/urls";
import { useSession, signOut } from "next-auth/react";
import NavMenu from "./NavMenu";

const Nav = ({ title, backHref }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="sticky-top">
      <nav className="navbar">
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
      </nav>
      <NavMenu open={isMenuOpen} close={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Nav;
