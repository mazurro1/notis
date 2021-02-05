import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { fetchLoginFacebookUser } from "../state/actions"

const LoginFacebookComponent = ({ message, id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!message && !!id) {
      dispatch(fetchLoginFacebookUser(message, id))
      navigate("/")
    } else {
      navigate("/")
    }
  }, [message])

  return <div></div>
}
export default LoginFacebookComponent
