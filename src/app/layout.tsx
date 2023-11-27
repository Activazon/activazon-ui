"use client";
import { useEffect } from "react";
import "./globals.css";

import { init as initFullStory } from "@fullstory/browser";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initFullStory({ orgId: "o-1GXTF6-na1" });
  }, []);
  return children;
}
