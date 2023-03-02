const GeoWithImagesTileShimmer = ({}) => {
  return (
    <div className="card card-body tile tile-geo-with-images with-shimmer">
      <div className="row">
        <div className="col-5 col-md-4 img-thumbnail-container">
          <div className="img-thumbnail" />
        </div>
        <div className="col-7 col-md-8 ps-0">
          <div className="row gy-2">
            <div className="col-12">
              <div className="line line-ws" />
            </div>
            <div className="col-12 gy-2">
              <div className="line line-primary line-wl" />
            </div>
            <div className="col-12 gy-2">
              <div className="line line-title line-ws" />
            </div>
            <div className="col-12">
              <div className="line line-wm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoWithImagesTileShimmer;
