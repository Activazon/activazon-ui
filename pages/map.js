import { useRef, useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Nav from "components/Nav";
import SearchBar from "components/SearchBar";
import Head from "components/Head";
import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import { ItemList, Item } from "components/ItemList";

import "mapbox-gl/dist/mapbox-gl.css";

import { useTrans } from "lib/trans";

import { useTrackOnce, track } from "lib/track";
import { searchThisApi } from "lib/client-api";
import Modal from "components/Modal/Modal";
import ModalButton from "components/Modal/ModalButton";
import useModal from "components/Modal/useModal";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWN0aXZhem9uIiwiYSI6ImNsY3ZtdHhwdzFsY2IzcGs2bGh5aDlqZmwifQ.wt_eBXNQzJXkJ-VOVKyPWA";

const Message = ({ message }) => (
  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-5">
    <p className="tw-p-0 tw-m-0">{message}</p>
  </div>
);

export default function Page() {
  const { t, ts } = useTrans();
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [areas, setAreas] = useState([]);
  const [city, setCity] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [isBetaModalOpen, setIsBetaModalOpen] = useModal({
    isShowingDefault: true,
  });

  useTrackOnce("page.search", {});
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/activazon/clcwih7xp002c14l6ealh9xmf",
    });
  });

  const onPlaceSelect = async (place) => {
    if (!map.current) return;
    console.log("onPlaceSelect", place, map.current?.fitBounds);

    setIsSearching(true);
    setNoResultsFound(false);
    setCity(null);
    setAreas([]);

    const searchPromise = searchThisApi({
      place_type: place.place_type,
      place_id: place.place_id,
    });

    map.current.fitBounds([
      [
        place.location_bounds.southwest.lng,
        place.location_bounds.southwest.lat,
      ],
      [
        place.location_bounds.northeast.lng,
        place.location_bounds.northeast.lat,
      ],
    ]);
    const results = await searchPromise;

    console.log("results", results);
    if (results.total === 0) {
      setNoResultsFound(true);
    } else {
      setCity(results.closest_city);
      setAreas([...results.areas]);

      // reset previous markers
      [...map.current._markers].forEach((marker) => marker.remove());

      // set markers
      [...results.areas].forEach((area) => {
        const el = document.createElement("div");
        el.className = "tw-bg-blue-bright tw-rounded-full";
        el.style.width = "20px";
        el.style.height = "20px";

        el.addEventListener("click", () => {
          window.location.href = area.slug_path;
        });

        // add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([
            area.location_coordinates[1],
            area.location_coordinates[0],
          ])
          .addTo(map.current);
      });
    }
    setIsSearching(false);
  };

  return (
    <>
      <Head title={"Map [Beta]"} />
      <body>
        {isBetaModalOpen && (
          <Modal
            title="This is a beta"
            actions={[
              <ModalButton
                type="blue-bright"
                label="Okay"
                onClick={() => setIsBetaModalOpen(false)}
              />,
            ]}
          >
            {/* write a long explination of what this is and what beta means */}
            <p className="tw-text-gray-dark tw-m-0 tw-text-sm">
              This is a beta version of the map. It is not yet ready for public
              use and is only available to a select few. If you are interested
              in helping us test this, please contact us via instagram at
              @activazon
            </p>
          </Modal>
        )}
        <div className="page">
          <Nav backHref={null} />
          <Content>
            <SearchBar onPlaceSelect={onPlaceSelect} />

            {/* map */}
            <div className="tw-w-full tw-h-[500px] tw-rounded-2xl tw-overflow-hidden tw-bg-blue-dark">
              <div
                ref={mapContainer}
                className="map-container tw-shadow-xl tw-h-full tw-w-full"
              />
            </div>

            <ContentGroup>
              {!isSearching && noResultsFound && (
                <Message message="No places found in this area with activity" />
              )}
              {isSearching && <Message message="Searching this area..." />}
              {!isSearching && areas.length > 0 && (
                <ItemList>
                  {city && (
                    <div className="tw-p-2 tw-bg-gray-200 tw-rounded-lg">
                      <Item
                        key={`place-city-${city.id}`}
                        href={city.slug_path}
                        imgUrl={city.image_square_url}
                        itemType={t("City")}
                        title={city.display_name}
                        message={
                          city.activity_total_last7days !== 0
                            ? t(
                                "{{ActivityCount}} activities detected in the last week",
                                {
                                  ActivityCount: city.activity_total_last7days,
                                }
                              )
                            : t(
                                "{{ActivityCount}} activities detected in the last 5 months",
                                {
                                  ActivityCount:
                                    city.activity_total_last5months,
                                }
                              )
                        }
                      />
                    </div>
                  )}
                  {areas.map((place) => (
                    <Item
                      key={`place-area-${place.id}`}
                      href={place.slug_path}
                      imgUrl={place.image_square_url}
                      itemType={t("Area")}
                      title={place.display_name}
                      message={
                        place.activity_total_last7days !== 0
                          ? t(
                              "{{ActivityCount}} activities detected in the last week",
                              {
                                ActivityCount: place.activity_total_last7days,
                              }
                            )
                          : t(
                              "{{ActivityCount}} activities detected in the last 5 months",
                              {
                                ActivityCount: place.activity_total_last5months,
                              }
                            )
                      }
                    />
                  ))}
                </ItemList>
              )}
            </ContentGroup>
          </Content>
        </div>
      </body>
    </>
  );
}
