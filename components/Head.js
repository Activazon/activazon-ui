import Head from "next/head";

const AppHead = ({ title }) => (
  <Head>
    <title>{title ? `${title} - ` : ""}Activazon</title>
    <meta
      name="description"
      content="AI-powered insights for your neighborhood"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="alternate" hreflang="en-US" href="https://activazon.com/en-US" />
    <link rel="alternate" hreflang="es-ES" href="https://activazon.com/es-ES" />
  </Head>
);

export default AppHead;
