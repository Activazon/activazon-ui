const Nav = ({ pageTitle }) => (
  <nav className="navbar sticky-top">
    <div className="container">
      <a className="navbar-brand" href="#">
        <i className="bi bi-activity"></i> Activazon
      </a>

      <p className="page-title">{pageTitle}</p>
    </div>
  </nav>
);

export default Nav;
