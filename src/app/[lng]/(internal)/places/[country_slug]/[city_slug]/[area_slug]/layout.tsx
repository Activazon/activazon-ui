import { generatePlaceMetadata } from "../../../metadataHelper";

interface Props {
  params: { country_slug: string; city_slug?: string; area_slug?: string };
}

export const generateMetadata = (props: Props) => generatePlaceMetadata(props);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
