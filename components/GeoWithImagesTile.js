import Link from "next/link";

const GeoWithImagesTile = ({ image, lead, title, description, href }) => {
  return (
    <div className="card card-body tile tile-geo-with-images">
      <Link href={href} target={href.startsWith("/") ? "_self" : "_blank"}>
        <div className="row">
          <div className="col-5 col-md-4">
            <img src={image} className="img-thumbnail" />
          </div>
          <div className="col-7 col-md-8 ps-0">
            <div className="row gy-0">
              {lead && (
                <div className="col-12">
                  <p className="tile-lead">{lead}</p>
                </div>
              )}

              <div className="col-12">
                <h2 className="tile-title">{title}</h2>
              </div>
              <div className="col-12">
                <p className="tile-description">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GeoWithImagesTile;
