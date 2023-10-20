export const accesorPlaceSlugPath = (place: any) => {
  return place?.slug_path;
};

export const accessorPlaceDisplayName = (place: any) => {
  return place?.display_name;
};

export const accesorPlaceAddress = (place: any) => {
  let address = place?.address;
  // capitalize first letter of each word
  if (address) {
    address = address.replace(/\w\S*/g, (w: string) =>
      w.replace(/^\w/, (c: string) => c.toUpperCase())
    );
  }
  return address;
};

export const accessorPlaceMapImagesWideDefault = (place: any) => {
  return place?.map_images?.wide_default_url;
};

export const accessorPlaceMapImagesSquareDefault = (place: any) => {
  return place?.map_images?.square_default_url;
};

export const accessorPlaceIncidentMetricsLast3Months = (place: any) => {
  return place?.incident_metrics?.total_last_3_months || 0;
};
