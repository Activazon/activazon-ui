import Head from "next/head";
import { useTrans } from "../lib/trans";

const TITLE = "Activazon";

const AppHead = ({ title }) => {
  const { i } = useTrans();
  const titleText = title ? `${title} - ${TITLE}` : TITLE;
  const descriptionText = i("AI-powered insights for your neighborhood");
  return (
    <Head>
      <title>{titleText}</title>
      <meta name="description" content={descriptionText} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="alternate"
        hrefLang="en-US"
        href="https://activazon.com/en-US"
      />
      <link
        rel="alternate"
        hrefLang="es-ES"
        href="https://activazon.com/es-ES"
      />
      {/* Meta tags */}
      <meta property="og:site_name" content={TITLE} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descriptionText} />
      <meta
        property="og:image"
        itemprop="image"
        content="https://www.activazon.com/social-share.png"
      />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default AppHead;
