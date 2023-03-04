// const ICON_URL = "https://www.activazon.com/apple-touch-icon.png";
const CACHE_NAME = "activazon-cache-v1.0.1";

self.addEventListener("install", function (event) {
  console.debug("Service Worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/en", "/account", "/en/account"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", async (event) => {
  /**
   * This is the service worker that will intercept all requests
   * requirement for a2hs
   */

  const url = new URL(event.request.url);
  const isDeveloplmentUrl = url.pathname.startsWith(
    "/_next/static/development"
  );
  const shouldBeInCache =
    event.request.url.startsWith(self.location.origin) && !isDeveloplmentUrl;
  const cache = await caches.open(CACHE_NAME);

  if (shouldBeInCache) {
    // check cache
    const cachedResponse = await cache.match(event.request.url);

    if (cachedResponse) {
      // return cached response
      return event.respondWith(cachedResponse);
    }
  }
  try {
    // fetch
    const response = await fetch(event.request);
    // cache if needed
    if (shouldBeInCache && response.ok) {
      cache.put(event.request, response.clone());
    }

    return event.respondWith(response);
  } catch (error) {
    return event.respondWith(new Response('{"offline": true}'));
  }
});

// self.addEventListener("push", (event) => {
//   if (!(self.Notification && self.Notification.permission === "granted")) {
//     return;
//   }

//   const data = event.data?.json() ?? {};
//   //   const title = data.title || "Something Has Happened";
//   //   const message =
//   //     data.message || "Here's something you might want to check out.";
//   //   const icon = "images/new-notification.png";

//   self.registration.showNotification("Hey cool notification", {
//     icon: ICON_URL,
//     body: "here is a body",
//     tag: "simple-push-demo-notification",
//     image: "https://activazon.com/banner-bg/banner-bg.jpg",
//     actions: [
//       {
//         action: "view",
//         title: "View activity",
//         icon: ICON_URL,
//       },
//     ],
//   });
//   console.log("YUUUP");
// });
