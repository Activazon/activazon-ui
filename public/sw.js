importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.setConfig({
  debug: true,
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

//  nextjs pages
workbox.routing.registerRoute(
  ({ request }) => request.destination === "script",
  new workbox.strategies.NetworkFirst({
    cacheName: "script-cache",
  })
);

//  css files
workbox.routing.registerRoute(
  ({ request }) => request.destination === "style",
  new workbox.strategies.NetworkFirst({
    cacheName: "style-cache",
  })
);

//  images, svgs and ico
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkFirst({
    cacheName: "image-cache",
  })
);

//  fonts
workbox.routing.registerRoute(
  ({ request }) => request.destination === "font",
  new workbox.strategies.NetworkFirst({
    cacheName: "font-cache",
    // ignore vary
  })
);

// document (this makes pages load offline)
workbox.routing.registerRoute(
  ({ request }) => request.destination === "document",
  new workbox.strategies.NetworkFirst({
    cacheName: "document-cache",
  })
);

// manifest
workbox.routing.registerRoute(
  ({ request }) => request.destination === "manifest",
  new workbox.strategies.NetworkFirst({
    cacheName: "manifest-cache",
  })
);

// listen for push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json();

  if (!(self.Notification && self.Notification.permission === "granted")) {
    console.log("Notifications blocked");
    return;
  }

  const iconUrl = "https://activazon.com/pwa/icon-192x192.png";
  const body =
    data.locale.lower().indexOf("en") > -1
      ? data.incident.contents["en"].title
      : data.incident.contents["es"].title;
  const tag = "incident:" + data.incident.id;
  const city = data.incident.place_area || data.incident.place_city;
  const image = city.images.map_images.wide_default_url;

  event.waitUntil(
    registration.showNotification(notificationReceived.title, {
      lang: data.locale,
      icon: iconUrl,
      body,
      tag: tag,
      image,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click detected: ", event.notification);
  event.notification.close();
  if (event.action === "archive") {
    // User selected the Archive action.
    archiveEmail();
  } else {
    const [resourceType, resourceId] = event.notification.tag.split(":");

    // could be a good place to log opens

    if (resourceType == "incident") {
      clients.openWindow(`/activity/${resourceId}`);
    }
  }
});
