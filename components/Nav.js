import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { explorePath } from "lib/urls";
import NavMenu from "./NavMenu";
import { useUser } from "lib/user";

const Nav = ({ title, backHref, hideMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useUser();
  const navMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  useEffect(() => {
    if (isMenuOpen) {
      const handleClick = (event) => {
        if (
          navMenuRef.current &&
          !navMenuRef.current.contains(event.target) &&
          menuIconRef.current &&
          !menuIconRef.current.contains(event.target)
        ) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [isMenuOpen]);

  return (
    <div className="tw-sticky tw-top-0 tw-w-full tw-z-50 ">
      <nav className="tw-py-2 tw-w-full tw-px-3 tw-flex tw-flex-row tw-justify-between tw-max-w-4xl tw-mx-auto tw-bg-white tw-rounded-lg">
        <Link
          className="tw-text-[1.5rem] tw-no-underline"
          href={backHref || explorePath()}
        >
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
            className={"tw-ps-3 tw-text-blue-bright tw-text-[1.5rem]"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuIconRef}
          >
            {user && <i className="bi bi-person-circle" />}
            {!user && <i className="bi bi-list" />}
          </button>
        )}
      </nav>
      <NavMenu
        ref={navMenuRef}
        open={isMenuOpen}
        close={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default Nav;
