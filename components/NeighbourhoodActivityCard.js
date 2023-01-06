import Link from "next/link";

const NeighbourhoodActivityCard = ({ href, title, description, dateLabel }) => (
  <div className="card card-body card-row mb-4 card-no-link">
    <div className="d-none d-sm-block icon">
      <i className="bi bi-newspaper"></i>
    </div>
    <div className="card-content">
      <p className="card-description mb-0">
        <small>{dateLabel}</small>
      </p>
      <Link href={href} className="text-decoration-none">
        <p className="card-title text-capitalize mb-2">
          {" "}
          <i className="d-inline d-sm-none me-2 bi bi-newspaper"></i>
          {title}
        </p>
      </Link>
      <p className="card-description mb-0">{description}</p>
    </div>
  </div>
);

export default NeighbourhoodActivityCard;
