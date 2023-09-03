import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import ContentGroup from "components/Content/ContentGroup";
import FixCorrectionButton from "components/FixContent/FixCorrectionButton";
import { useState, useEffect, useRef } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWN0aXZhem9uIiwiYSI6ImNsY3ZtdHhwdzFsY2IzcGs2bGh5aDlqZmwifQ.wt_eBXNQzJXkJ-VOVKyPWA";

const FixContentLocation = ({ area, onSubmitCorrection }) => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/activazon/clcwih7xp002c14l6ealh9xmf",
    });
  });
  const handleOnSubmitCorrection = () => {
    onSubmitCorrection({
      area_id: area.id,
      correction_params: {},
    });
  };
  return (
    <>
      <ContentGroup>
        <p className="tw-m-0 tw-text-blue-dark tw-text-xl">
          <b>Find {area.display_name}</b> on the map
        </p>
        <p className="tw-m-0 tw-text-gray-dark">
          Use the map below to pin point where {area.display_name} is located.
        </p>
      </ContentGroup>
      <div className="tw-w-full tw-h-[500px] tw-rounded-2xl tw-overflow-hidden tw-bg-blue-dark">
        <div
          ref={mapContainer}
          className="map-container tw-shadow-xl tw-h-full tw-w-full"
        />
      </div>
      <FixCorrectionButton onClick={handleOnSubmitCorrection} />
    </>
  );
};

export default FixContentLocation;
