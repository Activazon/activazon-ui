export const isInAppBrowser = (userAgent) => {
  if (/Instagram/.test(userAgent)) {
    return [true, "Instagram"];
  }
  if (/FBAN|FBAV/.test(userAgent)) {
    return [true, "Facebook"];
  }
  if (/Twitter/i.test(userAgent)) {
    return [true, "Twitter"];
  }
  return [false, ""];
};

export const detectDeviceOS = (userAgent) => {
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "ios";
  } else if (/Android/.test(userAgent)) {
    return "android";
  }

  return null;
};
