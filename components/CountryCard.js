import Link from "next/link";

const CountryCard = ({ displayName, name }) => (
  <Link href={`/c/${name}`} className="text-decoration-none">
    <div className="card card-body card-row-sm">
      <div className="card-content">
        <p className="card-title">
          <i className="bi bi-geo-fill"></i> {displayName}
        </p>
      </div>
    </div>
  </Link>
);

export default CountryCard;
