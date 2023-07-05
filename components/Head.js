import { useRouter } from "next/router";
import Head from "next/head";
import { useTrans } from "lib/trans";

const TITLE = "Activazon";

const AppHead = ({ title, seoDescription, seoKeywords, seoImageUrl }) => {
  const { pathname } = useRouter();
  let baseUrl = "";
  if (typeof window !== "undefined") {
    baseUrl = window.location.origin;
  }
  const { i, locale } = useTrans();
  const titleText = title ? `${title} - ${TITLE}` : TITLE;
  seoDescription =
    seoDescription || i("AI-powered insights for your neighborhood");
  seoImageUrl = seoImageUrl || "https://www.activazon.com/social-share.png";
  seoKeywords = seoKeywords || [];
  const urlNoLocale = pathname.replace("/en", "").replace("/es", "");

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={seoDescription} />
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href={`${baseUrl}/manifest-${locale}.webmanifest`} />
      <meta name="theme-color" content="#FFFFFF" />
      <link
        rel="alternate"
        hrefLang="en"
        href={[baseUrl, "en", urlNoLocale].join("/")}
      />
      <link rel="apple-touch-icon" href={`${baseUrl}/apple-touch-icon.png`} />
      <link
        rel="alternate"
        hrefLang="es"
        href={[baseUrl, "es", urlNoLocale].join("/")}
      />
      {/* Meta tags */}
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" itemProp="image" content={seoImageUrl} />
      <meta property="og:type" content="website" />
      <meta
        name="keywords"
        content={`Honduras, Advisory, Honduras Safety, Safety, Neighbourhoods, Is Honduras Safe, Safe Neighbourhoods, Crime, Ai, Ai Analysis, Activa Zone, Activazon, Travel Saftey, San Pedro Sula, Tegucigalpa, Roatan, La Ceiba, Honduras Crime, Francisco Morazan Department, viajar a honduras es seguro?, vaijar a honduras${
          seoKeywords.length > 0 ? "," : ""
        }${seoKeywords.join(",")}`}
      />
    </Head>
  );
};

export default AppHead;
