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
