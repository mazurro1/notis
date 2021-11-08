const React = require("react")
const Navigation = require("./src/components/Navigation").default
const UnderMenu = require("./src/components/UnderMenu").default
const Footer = require("./src/components/Footer/Footer").default
const ElementsPages = require("./src/components/ElementsPages").default

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
