import process from "process";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";

export const track = (name, data = {}) => {
  FullStory.isInitialized() && FullStory.event(name, data);
  window?.gtag("event", name, {
    ...data,
  });
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
    window?.gtag("event", name, {
      ...data,
    });
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

export const trackLink = (eventName, data = {}) => {
  return (event) => {
    event.preventDefault();
    track(eventName, data);
    window.location.href = event.currentTarget.href;
  };
};
