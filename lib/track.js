import mixpanel from "mixpanel-browser";
import process from "process";
import { useEffect } from "react";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: true });

export const track = (name, data = {}) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanel.track(name, data);
};

export const useTrackOnce = (name, data = {}) => {
  useEffect(() => {
    track(name, data);
  }, []);

  return null;
};
