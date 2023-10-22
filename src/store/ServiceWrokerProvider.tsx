"use client";

import { useEffect } from "react";

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

const ServiceWorkerProvider = ({ children }: ServiceWorkerProviderProps) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the
      // site using the default scope.
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          //
        },
        (error) => {
          console.error(`Service worker registration failed: ${error}`);
        }
      );
    } else {
      console.error("Service workers are not supported.");
    }
  }, []);
  return children;
};

export default ServiceWorkerProvider;
