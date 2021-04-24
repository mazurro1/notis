// self.addEventListener("push", event => {
//   console.log("Notification Recieved", event)

//   const dataEvent = event.data.json()
//   console.log("Got push", dataEvent)
//   //Fallback data
//   let data = {
//     title: "TestABC",
//     body: "123456",
//   }

//   // if (event.data) {
//   //   data = JSON.parse(event.data.text())
//   // }

//   //Notification options
//   var options = {
//     body: data.body,
//     icon: "./images/favicon-32x32.png",
//     image: "./images/favicon-32x32.png",
//   }

//   event.waitUntil(
//     console.log(options),
//     self.registration.showNotification(data.title, options)
//   )
// })

self.addEventListener("install", async event => {
  console.log("Installing service worker...")
  self.skipWaiting()
})

self.addEventListener("push", event => {
  let data = event.data.json()
  let title = "TestABC"
  if (!!data) {
    if (!!data.title) {
      title = data.title
    }
  }
  console.log(data)
  const promiseChain = self.registration.showNotification(title)
  event.waitUntil(promiseChain)
})

// self.addEventListener("push", function (e) {
//   const data = e.data.json()
//   console.log(data)
//   self.registration.showNotification(data.title, {
//     body: "Notified by me",
//     icon: "icon",
//   })
// })
