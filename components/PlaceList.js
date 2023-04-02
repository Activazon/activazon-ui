import Link from "next/link";

const PlaceItem = ({
  item,
  accessorHref,
  accessorImageUrl,
  accessorLead,
  accessorTitle,
  accessorDescription,
}) => (
  <Link href={accessorHref(item)} className="widget-list-item">
    <div className="widget-list-item-image">
      <img src={accessorImageUrl(item)} />
    </div>
    <div className="widget-list-item-content">
      <p className="widget-list-item-title">{accessorTitle(item)}</p>
      {accessorLead && (
        <p className="widget-list-item-text widget-list-item-text-light">
          {accessorLead(item)}
        </p>
      )}
      {accessorDescription && (
        <p className="widget-list-item-text widget-list-item-text-light">
          {accessorDescription(item)}
        </p>
      )}
    </div>
  </Link>
);

const PlaceItemShimmer = ({}) => (
  <div className="widget-list-item">
    <div className="widget-list-item-image shimmer shimmer-bg-color rounded"></div>
    <div className="widget-list-item-content">
      <p className="widget-list-item-title">
        <div className="line line-title shimmer shimmer-primary"></div>
      </p>

      <p className="widget-list-item-text widget-list-item-text-light">
        <div className="line line-small line-ws shimmer shimmer-text-color"></div>
      </p>
    </div>
  </div>
);

const PlaceList = ({
  title,
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
    <div className="widget widget-clear">
      <div className="widget-header">
        <p className="widget-title">{title}</p>
        {description && <p className="widget-description">{description}</p>}
      </div>
      <div className="widget-list">
        {items?.map((item, index) => (
          <PlaceItem
            name={name}
            item={item}
            key={name + "--" + index}
            accessorHref={accessorHref}
            accessorImageUrl={accessorImageUrl}
            accessorLead={accessorLead}
            accessorTitle={accessorTitle}
            accessorDescription={accessorDescription}
          />
        ))}
        {!items &&
          shimmerItems?.map((_, key) => (
            <PlaceItemShimmer key={name + "--" + key} />
          ))}
      </div>
    </div>
  );
};

export default PlaceList;
