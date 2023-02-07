import Link from "next/link";
import { useRouter } from "next/router";
import { track } from "lib/track";

const ChangeLanguageLink = () => {
  const router = useRouter();
  const localButtonLabel =
    router.locale === "en"
      ? "Cambiar idioma a Español"
      : "Change Language to English";
  const toggleLocale = async (e) => {
    // switch to the other locale
    e.preventDefault();
    const nextLocale = router.locale === "en" ? "es" : "en";
    track("locale.change", { locale: nextLocale });
    await router.push(
      { pathname: router.asPath, query: router.query },
      router.asPath,
      {
        locale: nextLocale,
      }
    );
  };

  return (
    <p>
      <Link onClick={toggleLocale} href="#" className="link">
        <i className="bi bi-translate"></i> {localButtonLabel}
      </Link>
    </p>
  );
};

export default ChangeLanguageLink;
