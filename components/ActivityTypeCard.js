const ActivityTypeCard = ({ href, count, title, description }) => (
  <div className="card card-body card-row card-no-link">
    <div className="icon">{count}</div>
    <div className="card-content">
      <p className="card-title">{title}</p>
      <p className="card-description mb-0">{description}</p>
    </div>
  </div>
);

export default ActivityTypeCard;
