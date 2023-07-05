export const accessorActivityTitle = (translateFunc, activity) =>
  activity.area.name !== "n/a"
    ? activity.area.display_name
    : activity.area.city.display_name;

export const accessorActivityImageUrl = (activity) =>
  activity.area.image_square_red_url || activity.area.image_square_url;
