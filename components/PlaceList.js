import GeoWithImagesTile from "components/GeoWithImagesTile";
import GeoWithImagesTileContainer from "components/GeoWithImagesTileContainer";
import GeoWithImagesTileShimmer from "components/GeoWithImagesTileShimmer";

const PlaceList = ({
  description,
  items,
  accessorHref,
  accessorImageUrl,
  accessorLead,
  accessorTitle,
  shimmerLimit,
  name,
}) => {
  const shimmerItems = Array.from(Array(shimmerLimit).keys());
  return (
    <>
      <GeoWithImagesTileContainer description={description}>
        {items?.map((item, key) => (
          <div className="col-12 col-md-6" key={name + "--" + key}>
            <GeoWithImagesTile
              href={accessorHref(item)}
              key={`item-card-${item.id}`}
              image={accessorImageUrl(item)}
              lead={accessorLead(item)}
              title={accessorTitle(item)}
            />
          </div>
        ))}
        {!items &&
          shimmerItems?.map((_, key) => (
            <div className="col-12 col-md-6" key={name + "--" + key}>
              <GeoWithImagesTileShimmer />
            </div>
          ))}
      </GeoWithImagesTileContainer>
    </>
  );
};

export default PlaceList;
