self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  console.log("Notification received", data);
  console.log("Notification permission", self.Notification.permission);

  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  //   const title = data.title || "Something Has Happened";
  //   const message =
  //     data.message || "Here's something you might want to check out.";
  //   const icon = "images/new-notification.png";
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
});
