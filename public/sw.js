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
