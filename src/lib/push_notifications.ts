import { getInAppBrowserName, isDisplayModeStandalone } from "./browser";

/**
 * checks we can send push notifications to this device
 */
export const isPushNotificationsSupported = (): boolean => {
  return "serviceWorker" in navigator && "PushManager" in window;
};

/**
 * checks if we have permission to send notifications
 */
export const pushNotificationPermission = (): NotificationPermission => {
  return Notification.permission;
};

/**
 * asks the user for permission to send notifications
 */
export const askPushNotificationPermission = async () => {
  return new Promise((resolve, reject) => {
    window?.Notification.requestPermission(async (permission) => {
      if (permission === "granted") {
        resolve({
          permission,
        });
      }
      reject({
        permission,
      });
    });
  });
};

/**
 * Determines the next decision for handling device notifications based on the user's environment.
 *
 * @returns One of the following decisions:
 * - "Subscribe": Proceed with the subscription process.
 * - "AskPermission": Prompt the user for notification permission.
 * - "RedirectToA2HS": Redirect the user to add the app to their home screen.
 * - "OpenInBrowser": Ask the user to open the app in a full browser.
 * - "Unsupported": Handle the case where push notifications are not supported.
 */
export const getNotificationHandlingDecision = ():
  | "Subscribe"
  | "AskPermission"
  | "RedirectToA2HS"
  | "OpenInBrowser"
  | "Unsupported" => {
  if (isPushNotificationsSupported()) {
    if (pushNotificationPermission() === "granted") {
      return "Subscribe";
    }
    return "AskPermission";
  }
  if (!isDisplayModeStandalone()) {
    return "RedirectToA2HS";
  }
  if (getInAppBrowserName(window.navigator.userAgent)) {
    return "OpenInBrowser";
  }
  return "Unsupported";
};
