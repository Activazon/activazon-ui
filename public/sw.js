importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.setConfig({
  debug: true,
});

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

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// listen for push notifications
self.addEventListener("push", (event) => {
  console.log("Push notification received", event);
  const data = event.data.json();

  if (!(self.Notification && self.Notification.permission === "granted")) {
    console.log("Notifications blocked");
    return;
  }

  const iconUrl = "https://activazon.com/pwa/icon-192x192.png";
  let promiseChain = [];

  if (data.test) {
    promiseChain.push(
      self.registration.showNotification("Testing testing 123", {
        data: {
          type: "test",
        },
      })
    );
  } else if (data.incident) {
    // fetch the incident data and show the notification
    promiseChain.push(
      fetch(data.incident)
        .then((response) => {
          // get details for the notification
          if (!response || !response.ok) {
            console.error("Could not fetch incident data", response);
            return;
          }

          return response.json();
        })
        .then((incident) => {
          const isEn = data.locale.toLocaleLowerCase().indexOf("en") > -1;
          const placeDisplayName = incident.place_area
            ? `${incident.place_area.display_name}, ${incident.place_city.display_name}`
            : incident.place_city.display_name;

          const title = isEn
            ? `Incident in ${placeDisplayName}`
            : `Incidente en ${placeDisplayName}`;
          const summary = isEn
            ? `${incident.contents["en"].title} - Read more`
            : `${incident.contents["es"].title} - Leer más`;

          const place = incident.place_area || incident.place_city;
          const image = place.map_images.wide_default_url;
          const tag = incident.place_city.slug_path;

          // show the notification
          return self.registration.showNotification(title, {
            lang: data.locale,
            icon: iconUrl,
            body: summary,
            image,
            renotify: true,
            tag,
            data: {
              type: "incident",
              id: incident.id,
              notification_opened_callback: data.notification_opened_callback,
            },
          });
        })
        .then(() => {
          console.log("Successfully sent notification");
        })
        .catch((error) => {
          console.error("Could not send notification", error);
        })
    );
  }

  // let the server know that the notification has been delivered
  if (data.notification_delivered_callback) {
    promiseChain.push(
      fetch(data.notification_delivered_callback)
        .then((response) => {
          console.debug("Notification delivered callback successful");
        })
        .catch((error) => {
          console.error("Notification delivered callback failed", error);
        })
    );
  }

  event.waitUntil(Promise.all(promiseChain));
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click detected: ", event.notification);
  event.notification.close();
  const promiseChain = [];

  // incident notification clicked
  if (event.notification.data.type == "incident") {
    promiseChain.push(
      clients
        .openWindow(`/activity/${event.notification.data.id}`)
        .then((windowClient) => (windowClient ? windowClient.focus() : null))
    );
  }

  // trigger opened callback
  if (event.notification.data.notification_opened_callback) {
    promiseChain.push(
      fetch(event.notification.data.notification_opened_callback)
        .then((response) => {
          console.debug("Notification opened callback successful");
        })
        .catch((error) => {
          console.error("Notification opened callback failed", error);
        })
    );
  }

  event.waitUntil(Promise.all(promiseChain));
});
