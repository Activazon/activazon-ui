import { Metadata } from "next/types";

export interface Props {
  params: {
    lng: string;
    country_slug: string;
    city_slug?: string;
    area_slug?: string;
  };
}

/**
 * gets the details of the place (country, city or area)
 */
const getPlace = (params: Props["params"]) => {
  const slugPath =
    "/" +
    [params.country_slug, params.city_slug, params.area_slug]
      .filter((slug) => slug)
      .join("/");

  if (params.area_slug) {
    return fetch(
      process.env.NEXT_PUBLIC_ACTIVAZON_API +
        `/v3/places/area/slug_path/?slug_path=${slugPath}`
    );
  }
  if (params.city_slug) {
    return fetch(
      process.env.NEXT_PUBLIC_ACTIVAZON_API +
        `/v3/places/city/slug_path/?slug_path=${slugPath}`
    );
  }

  return fetch(
    process.env.NEXT_PUBLIC_ACTIVAZON_API +
      `/v3/places/country/slug_path/?slug_path=${slugPath}`
  );
};

const capitalizedString = (mySentence: string) => {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
};

export const generatePlaceMetadata = async (
  props: Props
): Promise<Metadata> => {
  const responseJson = await getPlace(props.params).then((resp) => resp.json());
  const placeName = capitalizedString(responseJson.address);

  if (props.params.lng == "es") {
    return {
      applicationName: "Activazon",
      title: `Explora ${placeName} con Activazon`,
      description: `Explora estadísticas completas de crímenes y descripciones de incidentes para ${placeName}. Mantente informado sobre la seguridad de tu ciudad, vecindario o país con datos en tiempo real sobre varios tipos de crímenes. Mejora tu conciencia y toma decisiones informadas para un entorno de vida más seguro.`,
      keywords: [
        `Alertas de seguridad para ${placeName}`,
        `Monitoreo de crímenes en ${placeName}`,
        `Informes de detección de incidentes para ${placeName}`,
        `Actualizaciones de seguridad pública en ${placeName}`,
        `Vigilancia del vecindario de ${placeName}`,
        `¿Es seguro ${placeName}?`,
        `Estado de seguridad de la ciudad en ${placeName}`,
        `Conciencia de crímenes en ${placeName}`,
        `Informes de seguridad para el área de ${placeName}`,
        `Vigilancia comunitaria para ${placeName}`,
        `Alertas en tiempo real en ${placeName}`,
        `Tendencias de seguridad en ${placeName}`,
        `Notificaciones de emergencia para ${placeName}`,
        `Vivienda segura en ${placeName}`,
        `Mapeo de incidentes para ${placeName}`,
        `Actualizaciones locales de seguridad en ${placeName}`,
        `Consejos de prevención de crímenes para ${placeName}`,
        `Perspectivas de seguridad en ${placeName}`,
        `Evaluación de riesgos en el área de ${placeName}`,
        `Respuesta de emergencia en ${placeName}`,
        `Análisis de seguridad para ${placeName}`,
      ],
      openGraph: {
        type: "website",
        url: `https://activazon.com/places${responseJson.slug_path}`,
        title: `¿Es seguro ${placeName}? (Activazon)`,
        description: `Tu compañero de seguridad de confianza en ${placeName}. Explora con confianza.`,
        siteName: "Activazon",
        images: [
          {
            url: responseJson.map_images.seo_url,
            width: 1600,
            height: 900,
            alt: "Logo de Activazon",
          },
        ],
      },
    };
  }

  // english
  return {
    applicationName: "Activazon",
    title: `Explore ${placeName} with Activazon`,
    description: `Explore comprehensive crime statistics and incident overviews for ${placeName}. Stay informed about the safety of your city, neighborhood, or country with real-time data on various crime types. Enhance your awareness and make informed decisions for a safer living environment.`,
    keywords: [
      `Safety Alerts for ${placeName}`,
      `Crime Monitoring in ${placeName}`,
      `Incident Detection Reports for ${placeName}`,
      `Public Safety Updates in ${placeName}`,
      `${placeName} Neighborhood Watch`,
      `Is ${placeName} safe?`,
      `City Security Status in ${placeName}`,
      `Crime Awareness in ${placeName}`,
      `Safety Reports for ${placeName} Area`,
      `Community Watch for ${placeName}`,
      `Real-time Alerts in ${placeName}`,
      `Safety Trends in ${placeName}`,
      `Emergency Notifications for ${placeName}`,
      `Secure Living in ${placeName}`,
      `Incident Mapping for ${placeName}`,
      `Local Security Updates in ${placeName}`,
      `Crime Prevention Tips for ${placeName}`,
      `Safety Insights in ${placeName}`,
      `Area Risk Assessment for ${placeName}`,
      `Emergency Response in ${placeName}`,
      `Security Analytics for ${placeName}`,
    ],
    openGraph: {
      type: "website",
      url: `https://activazon.com/places${responseJson.slug_path}`,
      title: `Is ${placeName} safe? (Activazon)`,
      description: `Your Trusted Safety Companion in ${placeName}. Explore with Confidence.`,
      siteName: "Activazon",
      images: [
        {
          url: responseJson.map_images.seo_url,
          width: 1600,
          height: 900,
          alt: "Activazon Logo",
        },
      ],
    },
  };
};
