/**
 * Check if the user agent is an in-app browser
 */
export const getInAppBrowserName = (
  userAgent: string
): "instagram" | "facebook" | "twitter" | undefined => {
  if (/Instagram/.test(userAgent)) {
    return "instagram";
  }
  if (/FBAN|FBAV/.test(userAgent)) {
    return "facebook";
  }
  if (/Twitter/i.test(userAgent)) {
    return "twitter";
  }
  return undefined;
};

/**
 * checks if user is in browser or standalone mode
 */
export const getDisplayMode = (): "standalone" | "browser" | undefined => {
  if (typeof window !== "undefined") {
    if ("standalone" in window?.navigator) {
      return "standalone";
    }
    if (window?.matchMedia("(display-mode: standalone)").matches) {
      return "standalone";
    }
    return "browser";
  }
  return undefined;
};

/**
 * returns true if the user is in standalone mode
 */
export const isDisplayModeStandalone = () => {
  return getDisplayMode() === "standalone";
};

/**
 * returns true if the user is in a brwoser
 */
export const isDisplayModeBrowser = () => {
  return getDisplayMode() === "browser";
};
