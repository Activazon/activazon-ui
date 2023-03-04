export const onLoad = () => {
  // load service worker
  if ("serviceWorker" in navigator) {
    if (document.readyState === "complete") {
      navigator.serviceWorker.register("/sw.js");
    } else {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js");
      });
    }
  }
};
