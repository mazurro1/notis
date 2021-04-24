const React = require("react")
const Navigation = require("./src/components/Navigation").default
const UnderMenu = require("./src/components/UnderMenu").default
const Footer = require("./src/components/Footer").default
const ElementsPages = require("./src/components/ElementsPages").default
// const registerServiceWorker = require("./sw").default
// exports.registerServiceWorker = () => true
exports.wrapPageElement = ({ element, props }) => {
  const isMainPage = props.location.pathname === "/"
  return (
    <>
      <Navigation isMainPage={isMainPage} />
      <UnderMenu isMainPage={isMainPage} />
      <ElementsPages isMainPage={isMainPage}>{element}</ElementsPages>
      <Footer />
    </>
  )
}

// exports.onClientEntry = () => {
//   if (typeof window !== "undefined") {
//     try {
//       navigator.serviceWorker
//         .getRegistration()
//         .then(reg => {
//           reg.showNotification("Guarda il videoclip!", {
//             body: "clicca qua!",
//             icon: "images/she_is_fire.png",
//             vibrate: [100, 50, 100],
//             tag: "sample",
//             actions: [
//               {
//                 action: "explore",
//                 title: "Guarda",
//                 icon: "images/she_is_fire.png",
//               },
//             ],
//           })
//           window.self.addEventListener(
//             "notificationclick",
//             function (event) {
//               event.notification.close()
//               window.open("https://youtu.be/PAvHeRGZ_lA")
//             },
//             false
//           )
//         })
//         .catch(err => alert("Service Worker registration error: " + err))
//     } catch (err) {
//       alert("Notification API error: " + err)
//     }
//   }
// }

// exports.onServiceWorkerUpdateReady = () => {
//   const answer = window.confirm(
//     `This application has been updated. ` +
//       `Reload to display the latest version?`
//   )
//   if (answer === true) {
//     window.location.reload()
//   }
// }

// const dataWorker = {
//   subject: "mailto: <nootis@help.pl>",
//   publicKey:
//     "BGA9yTiG7QAgTXpaUknwJrBgAMPVSDJcw70QJ0ZD-HDxZGFmJRkHudInijM25nRacLFd_XJULQdzzEmG8idqL7Y",
//   privateKey: "T_bxaZDDIv_kfqpW1cRa0yhmOVvGBxrh0qhQ48tVrTU",
// }
