import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const COLOR_WHITE = "#cdd7de";
const COLOR_PRIMARY = "#06d0f9";
const COLOR_SECONDARY = "#7176ed";
const COLOR_DARK = "#0b2442";
const COLOR_TEXT = "#6d6d7f";

const MAP_STYLES = [
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: COLOR_TEXT,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: COLOR_WHITE,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: COLOR_PRIMARY,
      },
      {
        visibility: "on",
      },
      {
        saturation: "0",
      },
      {
        lightness: "0",
      },
    ],
  },
];

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
      styles: MAP_STYLES,
    });
  });

  return <div ref={ref} id="map" />;
}

function Map() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="AIzaSyB-3HM0QHCiZqFO219zIbNP1jzWOsiDhKc" render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}

export default Map;
