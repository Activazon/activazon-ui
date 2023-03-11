ICON_URL = "https://activazon.com/icon-192x192.png";

self.addEventListener("push", (event) => {
  // https://github.com/shadowwalker/next-pwa/blob/master/examples/web-push/worker/index.js
  const notificationReceived = event.data?.json() ?? {};
  console.log("Notification received", notificationReceived);
  console.log("Notification permission", self.Notification.permission);

  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  event.waitUntil(
    registration.showNotification(notificationReceived.title, {
      lang: notificationReceived.locale,
      icon: notificationReceived.image_url || ICON_URL,
      body: notificationReceived.body,
      tag: notificationReceived.tag,
      image:
        notificationReceived.image_url ||
        "https://activazon.com/banner-bg/banner-bg.jpg",
      // actions: [
      //   {
      //     action: "view",
      //     title: notificationReceived.locale === "en" ? "View" : "Ver";,
      //   },
      // ],
    })
  );
});
self.addEventListener("notificationclick", (event) => {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
  if (event.action === "archive") {
    // User selected the Archive action.
    archiveEmail();
  } else {
    // User selected (e.g., clicked in) the main body of notification.
    clients.openWindow("/inbox?tag=" + event.notification.tag);
  }
});
