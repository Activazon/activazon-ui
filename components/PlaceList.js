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
  itemWrapperClassName = "col-12 col-md-6 mb-2",
  ItemComponent = GeoWithImagesTile,
  ShimmerComponent = GeoWithImagesTileShimmer,
}) => {
  const shimmerItems = Array.from(Array(shimmerLimit).keys());
  return (
    <GeoWithImagesTileContainer description={description}>
      <div className="row gy-2">
        {items?.map((item, key) => (
          <div className={itemWrapperClassName} key={name + "--" + key}>
            <ItemComponent
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
            <div className={itemWrapperClassName} key={name + "--" + key}>
              <ShimmerComponent />
            </div>
          ))}
      </div>
    </GeoWithImagesTileContainer>
  );
};

export default PlaceList;
