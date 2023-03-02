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
  accessorDescription,
  shimmerLimit,
  name,
}) => {
  const shimmerItems = Array.from(Array(shimmerLimit).keys());
  return (
    <GeoWithImagesTileContainer description={description}>
      <div className="row gy-2">
        {items?.map((item, key) => (
          <div className="col-12 col-md-6" key={name + "--" + key}>
            <GeoWithImagesTile
              href={accessorHref(item)}
              key={`item-card-${item.id}`}
              image={accessorImageUrl(item)}
              lead={accessorLead && accessorLead(item)}
              title={accessorTitle(item)}
              description={accessorDescription && accessorDescription(item)}
            />
          </div>
        ))}
        {!items &&
          shimmerItems?.map((_, key) => (
            <div className="col-12 col-md-6" key={name + "--" + key}>
              <GeoWithImagesTileShimmer />
            </div>
          ))}
      </div>
    </GeoWithImagesTileContainer>
  );
};

export default PlaceList;
