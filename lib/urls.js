export const explorePath = (slugPath = "") => `/explore${slugPath}`;

export const activityPath = (areaSlugPath, activityId) =>
  `/explore${areaSlugPath}/activities/${activityId}`;
