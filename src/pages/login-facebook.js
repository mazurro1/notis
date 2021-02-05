import React from "react"
import { Router } from "@reach/router"
import LoginFacebookComponent from "../components/LoginFacebookComponent"

const LoginFacebook = props => {
  return (
    <Router>
      <LoginFacebookComponent path="/login-facebook/:message/:id" />
    </Router>
  )
}
export default LoginFacebook
