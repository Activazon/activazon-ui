import Link from "next/link";

const GeoWithImagesCard = ({ image, lead, title, description, href }) => {
  return (
    <div className="card card-body card-geo-with-images">
      <Link href={href}>
        <div className="row">
          <div className="col-5 col-md-2">
            <img src={image} className="img-thumbnail" />
          </div>
          <div className="col-7 col-md-10 ps-0">
            <div className="row gy-2">
              {lead && (
                <div className="col-12">
                  <p className="card-lead">{lead}</p>
                </div>
              )}

              <div className="col-12">
                <h2 className="card-title">{title}</h2>
              </div>
              <div className="col-12">
                <p className="card-description">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GeoWithImagesCard;
