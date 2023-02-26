export const canReceiveNotifications = () => {
  if (!("serviceWorker" in navigator)) {
    return false;
  }
  if (!("PushManager" in window)) {
    return false;
  }
  return true;
};

export const loadServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window?.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js");
    });
    return true;
  }
  return false;
};

export const requestPermission = ({ onGranted, onError }) => {
  window?.Notification.requestPermission((permission) => {
    if (permission === "granted") {
      onGranted();
      return;
    }
    onError();
  });
};

export const requestPermissionStatus = () => {
  return Notification.permission;
};
