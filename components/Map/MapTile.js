const MapTile = ({ imgUrl }) => {
  return (
    <div className="">
      <img
        className="tw-rounded-lg tw-bg-slate-50 tw-aspect-[16/9] tw-w-full tw-bg-blue-dark"
        src={imgUrl}
      />
    </div>
  );
};

export default MapTile;
