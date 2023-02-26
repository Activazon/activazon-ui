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
  navigator.serviceWorker.register("/sw.js");
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
