import mixpanel from "mixpanel-browser";
import process from "process";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: true });

export const track = (name, data = {}) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanel.track(name, data);
  FullStory && FullStory.event(name, data);
};

export const trackUser = (data) => {
  FullStory &&
    FullStory.setUserVars({
      displayName: `User: ${data.id}`,
      email: data.email,
      id: data.id,
    });
};

export const useTrackOnce = (name, data = {}) => {
  useEffect(() => {
    track(name, data);
  }, []);

  return null;
};
