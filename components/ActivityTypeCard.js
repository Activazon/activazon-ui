import Link from "next/link";

const ActivityTypeCard = ({ href, count, title, description }) => (
  <Link href={href} className="text-decoration-none">
    <div className="card card-body card-row">
      <div className="icon">{count}</div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className="card-description mb-0">{description}</p>
      </div>
    </div>
  </Link>
);

export default ActivityTypeCard;
