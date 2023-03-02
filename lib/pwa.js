export const onLoad = () => {
  // load service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js");
    });
  }
};
