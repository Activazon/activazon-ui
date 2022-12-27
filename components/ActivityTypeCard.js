const ActivityTypeCard = ({ href, count, title, description }) => (
  <a href={href} className="text-decoration-none">
    <div className="card card-body">
      <div class="icon">{count}</div>
      <div class="card-content">
        <p className="card-title">{title}</p>
        <p className="card-description mb-0">{description}</p>
      </div>
    </div>
  </a>
);

export default ActivityTypeCard;
