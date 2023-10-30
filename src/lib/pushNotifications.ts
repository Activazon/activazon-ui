import {
  getInAppBrowserName,
  isDisplayModeStandalone,
  isOnDesktopBrowser,
} from "./browser";

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
export const askPushNotificationPermission = async (): Promise<{
  permission: string;
}> => {
  return new Promise((resolve) => {
    window?.Notification.requestPermission(async (permission) => {
      resolve({
        permission,
      });
    });
  });
};

/**
 * Determines the next decision for handling device notifications based on the user's environment.
 *
 * @returns One of the following decisions:
 * - "subscribe": Proceed with the subscription process.
 * - "ask_permission": Prompt the user for notification permission.
 * - "redirect_to_a2hs": Redirect the user to add the app to their home screen.
 * - "open_in_browser": Ask the user to open the app in a full browser.
 * - "unsupported": Handle the case where push notifications are not supported.
 */
export const getNotificationHandlingDecision = ():
  | "subscribe"
  | "ask_permission"
  | "redirect_to_a2hs"
  | "open_in_browser"
  | "unsupported" => {
  alert(`isPushNotificationsSupported(): ${isPushNotificationsSupported()}`);
  alert(`isOnDesktopBrowser(): ${isOnDesktopBrowser()}`);
  alert(`isDisplayModeStandalone(): ${isDisplayModeStandalone()}`);
  if (isPushNotificationsSupported()) {
    // push notification are supported on this device
    if (isOnDesktopBrowser() || isDisplayModeStandalone()) {
      // only allow push notifications on desktop browsers and standalone apps on mobile
      if (pushNotificationPermission() === "granted") {
        return "subscribe";
      }
      return "ask_permission";
    } else {
      // user is in a mobile browser that supports push notifications
      // we do not want this to happen, so we will ask the user to add the app to their home screen
      return "redirect_to_a2hs";
    }
  }

  if (getInAppBrowserName(window.navigator.userAgent)) {
    // we will ask the user to open the app in a full browser
    return "open_in_browser";
  }

  if (!isPushNotificationsSupported() && isDisplayModeStandalone()) {
    // user is in standalone mode but push notifications are not supported
    return "unsupported";
  }

  // we will ask the user to add the app to their home screen hoping
  // that they will use a browser that supports push notifications
  return "redirect_to_a2hs";
};
