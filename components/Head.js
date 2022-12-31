import { useRouter } from "next/router";
import Head from "next/head";
import { useTrans } from "../lib/trans";

const TITLE = "Activazon";

const AppHead = ({ title }) => {
  const { pathname } = useRouter();
  const { i } = useTrans();
  const titleText = title ? `${title} - ${TITLE}` : TITLE;
  const descriptionText = i("AI-powered insights for your neighborhood");
  const urlNoLocale = pathname.replace("/en", "").replace("/es", "");
  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={descriptionText} />
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
      <meta property="og:description" content={descriptionText} />
      <meta
        property="og:image"
        itemProp="image"
        content="https://www.activazon.com/social-share.png"
      />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default AppHead;
