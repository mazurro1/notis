self.addEventListener("push", event => {
  let data = {}
  if (event.data) {
    data = event.data.json()
  }
  const title = !!data.title ? data.title : "Something Has Happened"
  const message = !!data.body
    ? data.body
    : "Here's something you might want to check out."

  const promiseChain = self.registration.showNotification(title, {
    body: message,
  })
  event.waitUntil(promiseChain)
})

const notificate = (title, message) => {
  self.registration.showNotification(title, {
    body: message,
    icon: "/image.png",
    tag: "service-worker",
  })
}

// // let's create our queue
// const queue = new workbox.backgroundSync.Queue("myQueue", {
//   maxRetentionTime: 48 * 60, //2 days
//   callbacks: {
//     requestWillEnqueue: () => {
//       notificate(
//         "You are offline! 🛠",
//         "Your request has been submitted to the Offline queue. The queue will sync with the server once you are back online."
//       )
//     },
//   },
// })

// // sync event handler
// self.addEventListener("sync", ev => {
//   queue
//     .replayRequests()
//     .then(a => {
//       notificate(
//         "Syncing Application... 💾",
//         "Any pending requests will be sent to the server."
//       )
//     })
//     .catch(
//       notificate(
//         "We could not submit your requests. ❌",
//         "Please hit the 'Sync Pending Requests' button when you regain internet connection."
//       )
//     )
// })
