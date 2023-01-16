import { useRouter } from "next/router";
import Head from "next/head";
import { useTrans } from "../lib/trans";
import Script from "next/script";

const TITLE = "Activazon";

const AppHead = ({ title, seoDescription, seoKeywords, seoImageUrl }) => {
  const { pathname } = useRouter();
  const { i } = useTrans();
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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="alternate"
        hrefLang="en"
        href={"https://activazon.com/en/" + urlNoLocale}
      />
      <link
        rel="alternate"
        hrefLang="es"
        href={"https://activazon.com/es" + urlNoLocale}
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
