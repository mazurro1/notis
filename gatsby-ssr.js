const React = require("react")
const Navigation = require("./src/components/Navigation").default
const Footer = require("./src/components/Footer").default
const ElementsPages = require("./src/components/ElementsPages").default

exports.wrapPageElement = ({ element, props }) => {
  const isMainPage = props.location.pathname === "/"
  return (
    <>
      <Navigation isMainPage={isMainPage} />
      <ElementsPages isMainPage={isMainPage}>{element}</ElementsPages>
      <Footer />
    </>
  )
}
