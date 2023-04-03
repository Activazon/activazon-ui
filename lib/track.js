import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export const track = (name, data = {}) => {
  mixpanel?.track(name, { ...data });
};

export const trackUser = (data) => {
  mixpanel?.identify(data.id);
};

export const useTrackOnce = (name, data = {}, deps = []) => {
  useEffect(() => {
    track(name, data);
  }, deps);

  return null;
};

export const initializeTrackers = (readyCallback) => {
  mixpanel?.init("fc568ac3bd1566df54de292a99b9ad4e", { debug: false });
};

export const trackLink = (eventName, data = {}) => {
  return (event) => {
    event.preventDefault();
    track(eventName, data);
    window.location.href = event.currentTarget.href;
  };
};
