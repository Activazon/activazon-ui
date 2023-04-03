export const getDisplayMode = () => {
  if (typeof window !== "undefined") {
    if (window?.navigator?.standalone) {
      return "standalone";
    }
    if (window?.matchMedia("(display-mode: standalone)").matches) {
      return "standalone";
    }
    return "browser";
  }
  return "unknown";
};

export const isDisplayModeStandalone = () => {
  return getDisplayMode() === "standalone";
};

export const isDisplayModeBrowser = () => {
  return getDisplayMode() === "browser";
};
