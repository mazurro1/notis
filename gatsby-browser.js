const React = require("react")
const Navigation = require("./src/components/Navigation").default
const UnderMenu = require("./src/components/UnderMenu").default
const Footer = require("./src/components/Footer").default
const ElementsPages = require("./src/components/ElementsPages").default
// const { GoogleReCaptchaProvider } = require("react-google-recaptcha-v3")

exports.wrapPageElement = ({ element, props }) => {
  const isMainPage = props.location.pathname === "/"
  return (
    <>
      {/* <GoogleReCaptchaProvider reCaptchaKey="6LdBc6EcAAAAADJ_5R97yLNunEydzi8hN5xcOhGs"> */}
      <Navigation isMainPage={isMainPage} {...props} />
      <UnderMenu isMainPage={isMainPage} />
      <ElementsPages isMainPage={isMainPage}>{element}</ElementsPages>
      <Footer />
      {/* </GoogleReCaptchaProvider> */}
    </>
  )
}
