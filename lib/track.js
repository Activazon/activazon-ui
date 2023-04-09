import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

if (typeof window !== "undefined") {
  mixpanel.init("fc568ac3bd1566df54de292a99b9ad4e", {
    // debug: process.env.NODE_ENV === "development",
  });
  console.log("mixpanel initialized", mixpanel);
  window.__mixpanel = mixpanel;
}

export const track = (name, data = {}) => {
  mixpanel.track(name, { ...data });
};

export const trackUser = (data) => {
  mixpanel.identify(data.id);
};

export const useTrackOnce = (name, data = {}, deps = []) => {
  useEffect(() => {
    track(name, data);
  }, deps);

  return null;
};

export const trackLink = (eventName, data = {}) => {
  return (event) => {
    event.preventDefault();
    track(eventName, data);
    window.location.href = event.currentTarget.href;
  };
};
