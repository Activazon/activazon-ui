const GeoWithImageTileContainer = ({ description, children }) => (
  <div className="tile tile-transparent">
    {description && <p className="mb-3">{description}</p>}
    {children}
  </div>
);

export default GeoWithImageTileContainer;
