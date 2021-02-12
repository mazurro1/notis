const React = require("react")
const Navigation = require("./src/components/Navigation").default
exports.registerServiceWorker = () => true
exports.wrapPageElement = ({ element, props }) => {
  const isMainPage = props.location.pathname === "/"
  return (
    <>
      <Navigation isMainPage={isMainPage}>{element}</Navigation>
    </>
  )
}
