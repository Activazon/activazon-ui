import Link from "next/link";

const Nav = ({ pageTitle, backUrl }) => (
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
    </div>
  </nav>
);

export default Nav;
