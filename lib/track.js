import { useEffect } from "react";

export const track = (name, data = {}) => {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.track(name, { ...data });
  }
};

export const trackUser = (data) => {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel?.identify(data.id);
  }
};

export const useTrackOnce = (name, data = {}, deps = []) => {
  useEffect(() => {
    track(name, data);
  }, deps);

  return null;
};

export const initializeTrackers = () => {
  if (typeof window !== "undefined" && window.mixpanel) {
    window.mixpanel.init("fc568ac3bd1566df54de292a99b9ad4e");
  }
};

export const trackLink = (eventName, data = {}) => {
  return (event) => {
    event.preventDefault();
    track(eventName, data);
    window.location.href = event.currentTarget.href;
  };
};
