import Link from "next/link";
import { useTrans } from "../lib/trans";

const Footer = () => {
  const { t } = useTrans();
  return (
    <div className="container my-5 text-center">
      <p>
        &copy; Activazon 2023 |{" "}
        <Link href="/legal" className="link">
          {t("Terms of Use")}
        </Link>
      </p>
    </div>
  );
};

export default Footer;
