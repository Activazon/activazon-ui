const GeoWithImageTileContainer = ({ description, children }) => (
  <div className="row gy-3">
    {description && <p className="mb-0">{description}</p>}
    {children}
  </div>
);

export default GeoWithImageTileContainer;
