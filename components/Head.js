import { useRouter } from "next/router";
import Head from "next/head";
import { useTrans } from "../lib/trans";
import Script from "next/script";

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
      <meta
        name="keywords"
        content="Honduras, Advisory, Honduras Safety, Safety, Neighbourhoods, Is Honduras Safe, Safe Neighbourhoods, Crime, Ai, Ai Analysis, Activa Zone, Activazon, Travel Saftey, San Pedro Sula, Tegucigalpa, Roatan, La Ceiba, Honduras Crime, Francisco Morazan Department, viajar a honduras es seguro?, vaijar a honduras"
      />
      <Script>{`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '691903682399662');
fbq('track', 'PageView');`}</Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=691903682399662&ev=PageView&noscript=1"
        />
      </noscript>
    </Head>
  );
};

export default AppHead;
