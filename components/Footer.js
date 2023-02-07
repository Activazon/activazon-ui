import Link from "next/link";
import { useTrans } from "lib/trans";
import { useRouter } from "next/router";
import { track } from "lib/track";

const ProductHunt = () => (
  <a
    href="https://www.producthunt.com/posts/activazon?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-activazon"
    target="_blank"
  >
    <img
      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=376912&theme=light"
      alt="Activazon - AI&#0032;crime&#0032;analytics&#0032;for&#0032;travellers&#0032;and&#0032;residence | Product Hunt"
      style={{ width: "250px", height: "54px" }}
      width="250"
      height="54"
    />
  </a>
);

const Footer = () => {
  const { t } = useTrans();
  const router = useRouter();
  const localButtonLabel =
    router.locale === "en"
      ? "Cambiar idioma a Español"
      : "Change Language to English";
  const toggleLocale = async (e) => {
    // switch to the other locale
    e.preventDefault();
    const nextLocale = router.locale === "en" ? "es" : "en";
    track("nav.footer.locale", { locale: nextLocale });
    await router.push(
      { pathname: router.asPath, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
  };

  return (
    <div className="container my-5 text-center">
      <p>
        <ProductHunt />
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

      <p>
        <span className="me-3">
          <i className="bi bi-c-square"></i> Activazon 2023
        </span>
        |
        <Link href="/legal" className="link ms-3">
          {t("Terms of Use")}
        </Link>
      </p>
      <p>
        <Link onClick={toggleLocale} href="#" className="link ms-3">
          <i className="bi bi-translate"></i> {localButtonLabel}
        </Link>
      </p>
    </div>
  );
};

export default Footer;
