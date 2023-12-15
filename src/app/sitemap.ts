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
  try {
    const responseJson = await getCities();
    (responseJson?.results || []).forEach((country: any) => {
      // internal url
      siteMapResp.push({
        url: "https://activazon.com/places" + country.slug_path,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      });
      // marketing url
      siteMapResp.push({
        url: "https://activazon.com/visit/" + country.slug,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    });
  } catch (e) {
    // nothing
  }

  return siteMapResp;
}
