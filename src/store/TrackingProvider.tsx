"use client";

import { useCronitor } from "@cronitorio/cronitor-rum-nextjs";

interface TrackingProviderProps {
  children: React.ReactNode;
}

const TrackingProvider = ({ children }: TrackingProviderProps) => {
  useCronitor("e284b81a16094c3e1e9b62e24df7f2d6", {
    debug: true,
  });
  return children;
};

export default TrackingProvider;
