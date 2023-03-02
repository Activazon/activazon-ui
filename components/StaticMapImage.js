import classNames from "classnames";
const StaticMapImage = ({ src }) => {
  return (
    <div className="row">
      <div
        className={classNames("banner-static-map-image-container p-0", {
          shimmer: !src,
        })}
      >
        {src && <img src={src} className="banner-static-map-image" />}
      </div>
    </div>
  );
};

export default StaticMapImage;
