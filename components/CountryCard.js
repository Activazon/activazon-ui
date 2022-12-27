import Link from "next/link";

const CountryCard = () => (
  <Link href="/c/honduras" className="text-decoration-none">
    <div className="card card-body card-row-sm">
      <div className="card-content">
        <p className="card-title">Honduras</p>
      </div>
    </div>
  </Link>
);

export default CountryCard;
