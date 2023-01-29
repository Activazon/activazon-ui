export const explorePath = (slugPath = "/") => slugPath;

export const activityPath = (areaSlugPath, activityId) =>
  `${areaSlugPath}/activities/${activityId}`;
