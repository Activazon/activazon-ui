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
  if (data.incident) {
    const isEn = data.locale.toLocaleLowerCase().indexOf("en") > -1;
    const title = isEn
      ? data.incident.contents["en"].title
      : data.incident.contents["es"].title;
    const summary = isEn
      ? data.incident.contents["en"].summary
      : data.incident.contents["es"].summary;

    const city = data.incident.place_area || data.incident.place_city;
    const image = city.map_images.wide_default_url;
    const tag = data.incident.place_city.slug_path;

    event.waitUntil(
      self.registration.showNotification(title, {
        lang: data.locale,
        icon: iconUrl,
        body: summary,
        image,
        renotify: true,
        tag,
        data: {
          createdAt: new Date(Date.now()).toString(),
          type: "incident",
          id: data.incident.id,
        },
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click detected: ", event.notification);
  event.notification.close();
  if (event.action === "archive") {
    // User selected the Archive action.
    archiveEmail();
  } else {
    // TODO: could be a good place to log opens

    if (event.notification.data.type == "incident") {
      clients.openWindow(`/activity/${event.notification.data.id}`);
    }
  }
});
