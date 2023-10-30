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
 * returns true if the user is in standalone mode
 */
export const isDisplayModeStandalone = () => {
  return (
    ("standalone" in window.navigator && window.navigator.standalone) || // ios
    window.matchMedia("(display-mode: standalone)").matches // android
  );
};

/**
 * Returns true if the user is on a desktop browser
 */
export const isOnDesktopBrowser = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return !isMobile;
};
