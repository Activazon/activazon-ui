import Link from "next/link";
import Image from "next/image";
import { useTrans } from "../lib/trans";

const CountrySelector = ({ countries }) => {
  const { t } = useTrans();

  return (
    <div className="row">
      <h1 className="lead text-center mb-4">{t("Find your area")}</h1>

      {countries?.results?.map((country) => (
        <div key={"country-select-" + country.name} className="col-12 col-md-6">
          <Link href={"/c/" + country.name} className="text-decoration-none">
            <div className="card card-body card-row-sm light">
              <Image
                src={"/country-icons/honduras.png"}
                width={50}
                height={50}
              />
              <div className="card-content ms-2">
                <p className="fs-4 mb-0 fw-semibold">{country.display_name}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/*  */}
    </div>
  );
};
export default CountrySelector;
