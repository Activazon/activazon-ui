"use client";
import {
  canAllowGeoLocation,
  getCurrentCoords,
  hasPermissionGeoLocation,
} from "@/lib/permissions";
import { useEffect, useState } from "react";

interface UseCoordinatesHookReturn {
  coords: Coordinates | undefined;
  coordsLoaded: boolean;
}

export const useCoordinates = (): UseCoordinatesHookReturn => {
  const [coords, setCoords] = useState<Coordinates | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    const canUseGeoLocation =
      canAllowGeoLocation() && (await hasPermissionGeoLocation());

    if (canUseGeoLocation) {
      const coordinates = await getCurrentCoords();
      setCoords(coordinates);
    } else {
      setCoords(undefined);
    }
    setLoaded(true);
  };

  return {
    coords,
    coordsLoaded: loaded,
  };
};
