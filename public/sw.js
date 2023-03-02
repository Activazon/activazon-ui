const ICON_URL = "https://www.activazon.com/apple-touch-icon.png";

self.addEventListener("install", function (event) {
  console.debug("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  /**
   * This is the service worker that will intercept all requests
   * requirement for a2hs
   */
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
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
