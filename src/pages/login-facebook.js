import React from "react"
import { Router } from "@reach/router"
import LoginFacebookComponent from "../components/LoginFacebookComponent"
import CompanyPriv from "../components/CompanyPriv"

const LoginFacebook = props => {
  return (
    <Router>
      <LoginFacebookComponent path="/login-facebook/:message/:id/:newAccount" />
      <CompanyPriv default />
    </Router>
  )
}
export default LoginFacebook
