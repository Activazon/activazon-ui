import { useRef, useState, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Nav from "components/Nav";
import SearchBar from "components/SearchBar";
import Head from "components/Head";
import Content from "components/Content/Content";
import ContentGroup from "components/Content/ContentGroup";
import { ItemList, Item } from "components/ItemList";

import { useTrans } from "lib/trans";

import { useTrackOnce, track } from "lib/track";
import { searchThisApi } from "lib/client-api";

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
    }
    setIsSearching(false);
  };

  return (
    <>
      <Head title={"Map [Beta]"} />
      <body>
        <div className="page">
          <Nav backHref={null} />
          <Content>
            <SearchBar onPlaceSelect={onPlaceSelect} />
            {/* beta disclaimer */}
            <div className="tw-w-full tw-rounded-2xl tw-overflow-hidden tw-bg-yellow-200 tw-p-3">
              <p className="tw-m-0 tw-p-0 tw-text-sm">
                This is currently a beta feature and may still contain some
                issues. Please provide your feedback via instagram @activazon
              </p>
            </div>
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
