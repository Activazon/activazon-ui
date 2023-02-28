import GeoWithImagesTileShimmer from "components/GeoWithImagesTileShimmer";

const ActivityDetailShimmer = () => {
  return (
    <div className="container pt-3">
      <div className="row gy-3">
        <div className="col-12">
          <div className="line line-title-bg-color line-wl" />
        </div>

        <div className="col-12">
          <div className="line line-small line-wl" />
        </div>

        <div className="col-12">
          <div className="line w-100 mb-1" />
          <div className="line w-100 mb-1" />
          <div className="line w-100 mb-1" />
          <div className="line w-50" />
        </div>

        <div className="col-12">
          <div className="line line-wl shimmer-primary" />
        </div>

        <div className="col-12">
          <div className="line line-small line-wxl" />
        </div>

        <GeoWithImagesTileShimmer />
      </div>
    </div>
  );
};

export default ActivityDetailShimmer;
