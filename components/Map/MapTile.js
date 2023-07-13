const MapTile = ({ imgUrl }) => {
  return (
    <div className="">
      <img
        className="tw-bg-blue-dark tw-shadow-xl tw-rounded-lg tw-aspect-[16/9] tw-w-full "
        src={imgUrl}
      />
    </div>
  );
};

export default MapTile;
