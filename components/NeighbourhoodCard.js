import Link from "next/link";

const NeighbourhoodCard = ({ href, title, description, description2 }) => (
  <Link href={href} className="text-decoration-none">
    <div className="card card-body card-row">
      <div className="icon">
        <i className="bi bi-houses-fill"></i>
      </div>
      <div className="card-content">
        <p className="card-title text-capitalize">{title}</p>
        <p className="card-description mb-0 text-capitalize">{description}</p>
        <p className="card-description mb-0">{description2}</p>
      </div>
    </div>
  </Link>
);

export default NeighbourhoodCard;
