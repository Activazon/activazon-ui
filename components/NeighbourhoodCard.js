const NeighbourhoodCard = ({ href, title, description }) => (
  <a href={href} className="text-decoration-none">
    <div className="card card-body card-row">
      <div class="icon">
        <i class="bi bi-pin-map-fill"></i>
      </div>
      <div class="card-content">
        <p className="card-title">{title}</p>
        <p className="card-description mb-0">{description}</p>
        <p className="card-description mb-0">5 reports in the last 30 days</p>
      </div>
    </div>
  </a>
);

export default NeighbourhoodCard;
