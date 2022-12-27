const ActivityCard = ({ href, title, description }) => (
  <a href={href} className="text-decoration-none">
    <div className="card card-body">
      <div class="icon">
        <i class="bi bi-lightning-fill"></i>
      </div>
      <div class="card-content">
        <p className="card-title">{title}</p>
        <p className="card-description mb-0">{description}</p>
        <p className="card-description mb-0">Reported Today</p>
      </div>
    </div>
  </a>
);

export default ActivityCard;
