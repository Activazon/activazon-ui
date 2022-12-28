import Link from "next/link";

const ActivityCard = ({ href, title, description }) => (
  <Link href={href} className="text-decoration-none">
    <div className="card card-body card-row">
      <div className="icon">
        <i className="bi bi-lightning-fill"></i>
      </div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-description mb-0">{description}</p>
        <p className="card-description mb-0">Reported Today</p>
      </div>
    </div>
  </Link>
);

export default ActivityCard;
