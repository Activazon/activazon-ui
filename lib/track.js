import mixpanel from "mixpanel-browser";
import process from "process";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: true });

export const track = (name, data = {}) => {
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && mixpanel.track(name, data);
};
