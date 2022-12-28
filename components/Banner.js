const Banner = ({ title, description, showSearch }) => (
  <div className="banner">
    <div className="container">
      <p className="banner-text banner-title">{title}</p>
      {description && (
        <p className="banner-text banner-description">{description}</p>
      )}
      {showSearch && (
        <div className="search-form rounded">
          <input type="text" placeholder="Search your neighbourhood" />
          <button type="submit" className="btn">
            <i className="bi bi-search"></i>
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Banner;
