import React, { useEffect, useRef, useState } from "react";
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

function MyMapComponent({ center, zoom, bounds }) {
  const [map, setMap] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const m = new window.google.maps.Map(ref.current, {
      // center,
      // zoom,
      disableDefaultUI: true,
      styles: MAP_STYLES,
    });
    setMap(m);
  }, []);
  useEffect(() => {
    if (map) {
      if (bounds) {
        const latlngbounds = new google.maps.LatLngBounds();
        Object.values(bounds).forEach((coords) => {
          latlngbounds.extend(new google.maps.LatLng(coords.lat, coords.lng));
        });
        map.fitBounds(latlngbounds);
      } else {
        map.setCenter(center);
        map.setZoom(zoom);
      }

      //  set marker
      new google.maps.Marker({
        position: new google.maps.LatLng(center.lat, center.lng),
        map: map,
        icon: {
          url: "/map/marker-1.svg",
          scaledSize: new google.maps.Size(80, 80),
          anchor: { x: 40, y: 40 },
        },
      });
    }
  }, [map, bounds, center, zoom]);

  return <div ref={ref} id="map" />;
}

function Map({ coordinates, bounds }) {
  const center = { lat: coordinates.latitude, lng: coordinates.longitude };
  const zoom = 15;

  return (
    <Wrapper apiKey="AIzaSyB-3HM0QHCiZqFO219zIbNP1jzWOsiDhKc" render={render}>
      <MyMapComponent center={center} zoom={zoom} bounds={bounds} />
    </Wrapper>
  );
}

export default Map;
