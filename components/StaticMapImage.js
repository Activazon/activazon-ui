import { track } from "lib/track";

const StaticMapImage = ({ src }) => {
  const onPointerMove = (e) => {
    e?.preventDefault();
    track("el.staticmap.pointer_move", {});
  };
  return (
    <img
      onPointerMove={onPointerMove}
      src={src}
      className="banner-static-map-image"
    />
  );
};

export default StaticMapImage;
