import { useRef, useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Nav from "components/Nav";
import SearchBar from "components/SearchBar";
import Head from "components/Head";
import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import ContentGroupTitle from "components/Content/ContentGroupTitle";
import { ItemList, Item } from "components/ItemList";

import { useRouter } from "next/router";
import { explorePath } from "lib/urls";
import { useTrans } from "lib/trans";

import { searchCities, searchAreas } from "lib/client-api";
import { useTrackOnce, track } from "lib/track";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWN0aXZhem9uIiwiYSI6ImNsY3ZtdHhwdzFsY2IzcGs2bGh5aDlqZmwifQ.wt_eBXNQzJXkJ-VOVKyPWA";

const Map = () => {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const mapContainer = useRef(null);
  const map = useRef(null);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/activazon/clcwih7xp002c14l6ealh9xmf",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <div className="tw-w-full tw-h-[500px] tw-rounded-2xl tw-overflow-hidden tw-bg-blue-dark">
      <div
        ref={mapContainer}
        className="map-container tw-shadow-xl tw-h-full tw-w-full"
      />
    </div>
  );
};

const Message = ({ message }) => (
  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-5">
    <p className="tw-p-0 tw-m-0">{message}</p>
  </div>
);

export default function Page() {
  const { t, ts } = useTrans();
  const router = useRouter();
  const mapContainer = useRef(null);

  useTrackOnce("page.search", {});

  return (
    <>
      <Head title={null} />
      <body>
        <div className="page">
          <Nav backHref={null} />
          <Content>
            <SearchBar />
            <Map />

            <ContentGroup>
              <Message message="No activity detected in this area" />
              <ItemList>
                <Item
                  key={`activity-1`}
                  href={"#"}
                  imgUrl="..."
                  itemType={t("City")}
                  title={"Someting happening"}
                  message={"and idk what"}
                />
                <Item
                  key={`activity-1`}
                  href={"#"}
                  imgUrl="..."
                  itemType={t("City")}
                  title={"Someting happening"}
                  message={"and idk what"}
                />
                <Item
                  key={`activity-1`}
                  href={"#"}
                  imgUrl="..."
                  itemType={t("City")}
                  title={"Someting happening"}
                  message={"and idk what"}
                />
                <Item
                  key={`activity-1`}
                  href={"#"}
                  imgUrl="..."
                  itemType={t("City")}
                  title={"Someting happening"}
                  message={"and idk what"}
                />
              </ItemList>
            </ContentGroup>
          </Content>
        </div>
      </body>
    </>
  );
}
