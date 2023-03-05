import Link from "next/link";
import Image from "next/image";

const PlaceItemSmall = ({ image, lead, title, description, href }) => {
  return (
    <div className="card card-body tile place-item-small-tile">
      <Link href={href} target={href?.startsWith("/") ? "_self" : "_blank"}>
        <div className="row gy-2">
          <div className="col-12">
            {image.startsWith("/") ? (
              <Image
                src={image}
                alt={title}
                width={299}
                height={299}
                className="img-thumbnail rounded"
              />
            ) : (
              <img src={image} className="img-thumbnail" />
            )}
          </div>

          {lead && (
            <div className="col-12">
              <p className="tile-lead">{lead}</p>
            </div>
          )}

          <div className="col-12">
            <p className="tile-title">{title}</p>
          </div>
          <div className="col-12">
            <p className="tile-description">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const PlaceItemSmallShimmer = ({}) => {
  return (
    <div className="card card-body tile place-item-small-tile">
      <div className="row gy-2">
        <div className="col-12">
          <div className="img-thumbnail shimmer-bg-color" />
        </div>
        <div className="col-12">
          <div className="line line-small w-100 shimmer-bg-color" />
        </div>
        <div className="col-12">
          <div className="line w-100 shimmer-bg-color" />
        </div>
        <div className="col-12">
          <div className="line line-small w-100 shimmer-bg-color" />
        </div>
      </div>
    </div>
  );
};

export default PlaceItemSmall;
