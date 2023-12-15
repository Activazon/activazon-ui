import { MetadataRoute } from "next";

const getCities = () =>
  fetch(process.env.NEXT_PUBLIC_ACTIVAZON_API + "/v3/places/country/", {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((resp) => resp.json());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteMapResp: MetadataRoute.Sitemap = [
    {
      url: "https://activazon.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  ["honduras", "belize", "nicaragua", "guatemala", "mexico"].forEach(
    (country_slug: any) => {
      // internal url
      siteMapResp.push({
        url: "https://activazon.com/places/" + country_slug,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      });
      // marketing url
      siteMapResp.push({
        url: "https://activazon.com/visit/" + country_slug,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }
  );

  return siteMapResp;
}
