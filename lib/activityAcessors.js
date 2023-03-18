export const accessorActivityTitle = (translateFunc, activity) =>
  translateFunc("{{activity_type_name}} in {{neighbourhood_name}}", {
    activity_type_name: translateFunc(activity.activity_type.name),
    neighbourhood_name:
      activity.area.name !== "n/a"
        ? activity.area.display_name
        : activity.area.city.display_name,
  });

export const accessorActivityImageUrl = (activity) =>
  activity.area.image_square_red_url || activity.area.image_square_url;
