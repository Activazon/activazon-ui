export const canAllowGeoLocation = () => {
  return "geolocation" in navigator;
};

export const hasPermissionGeoLocation = async () => {
  const result = await navigator.permissions.query({
    name: "geolocation",
  });

  return result.state === "granted";
};

export const getCurrentCoords = async (): Promise<Coordinates> => {
  return new Promise((resolve, _) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  });
};
