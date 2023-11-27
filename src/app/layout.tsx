import "./globals.css";

import { init as initFullStory } from "@fullstory/browser";

initFullStory({ orgId: "o-1GXTF6-na1" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
