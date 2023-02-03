import mixpanel from "mixpanel-browser";
import process from "process";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {});

export const track = (name, data = {}) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanel.track(name, data);
  FullStory.isInitialized() && FullStory.event(name, data);
};

export const trackUser = (data) => {
  FullStory.isInitialized() &&
    FullStory.setUserVars({
      displayName: `User [id:${data.id}]`,
      email: data.email,
      id: data.id,
    });
};

export const useTrackOnce = (name, data = {}, deps = []) => {
  useEffect(() => {
    track(name, data);
  }, deps);

  return null;
};

export const loadFullStory = (readyCallback) => {
  return (
    process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID &&
    FullStory.init(
      { orgId: process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID },
      readyCallback
    )
  );
  // "o-1GXTF6-na1"
};
