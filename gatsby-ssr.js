const React = require("react")
const Navigation = require("./src/components/Navigation").default
const Footer = require("./src/components/Footer").default

exports.wrapPageElement = ({ element, props }) => {
  return (
    <>
      <Navigation />
      <div className="heightElement">{element}</div>
      <Footer />
    </>
  )
}
