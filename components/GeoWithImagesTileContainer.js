const GeoWithImageTileContainer = ({ description, children }) => (
  <div className="row gy-2">
    {description && <p className="mb-0">{description}</p>}
    {children}
  </div>
);

export default GeoWithImageTileContainer;
