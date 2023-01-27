import { useState } from "react";
import Link from "next/link";
import { explorePath } from "lib/urls";
import NavMenu from "./NavMenu";

const Nav = ({ title, backHref, hideMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {!hideMenu && (
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
          )}
        </div>
      </nav>
      <NavMenu open={isMenuOpen} close={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default Nav;
