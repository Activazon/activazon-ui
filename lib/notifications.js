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

export const requestPermission = (onSuccess, onError) => {
  window?.Notification.requestPermission((permission) => {
    if (permission === "granted") {
      onSuccess();
      return;
    }
    onError();
  });
};

export const requestPermissionStatus = () => {
  console.log("Notification.permission", Notification.permission);
  return Notification.permission;
};
