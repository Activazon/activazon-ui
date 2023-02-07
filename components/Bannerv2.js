const Bannerv2 = ({ title, description, dark, children }) => {
  return (
    <div className={`banner ${dark ? " banner-dark" : ""}`}>
      <div className="container">
        {title && (
          <p className="banner-text banner-title text-capitalize mb-1">
            {title}
          </p>
        )}
        {description && (
          <p className="banner-text banner-description text-capitalize mb-1">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Bannerv2;
