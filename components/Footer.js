import Link from "next/link";
import { useTrans } from "../lib/trans";

const Footer = () => {
  const { t } = useTrans();
  return (
    <div className="container my-5 text-center">
      <p>
        <i className="bi bi-c-square"></i> Activazon 2023 |{" "}
        <Link href="/legal" className="link">
          {t("Terms of Use")}
        </Link>{" "}
      </p>
      <p>
        <Link
          href="https://www.instagram.com/activazon/"
          target="_blank"
          className="link"
        >
          <i className="bi bi-instagram"></i> Instagram
        </Link>
      </p>
    </div>
  );
};

export default Footer;
