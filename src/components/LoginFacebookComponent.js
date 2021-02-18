import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { fetchLoginFacebookUser, addAlertItem } from "../state/actions"

const LoginFacebookComponent = ({ message, id, newAccount }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!message && !!id) {
      dispatch(fetchLoginFacebookUser(message, id))
      if (newAccount === "true") {
        dispatch(
          addAlertItem(
            "Wygenerowane hasło do konta zostało wysłane na e-maila (taki jak na facebook-a)",
            "blue"
          )
        )
      }
      navigate("/")
    } else {
      navigate("/")
    }
  }, [message]) // eslint-disable-line react-hooks/exhaustive-deps

  return <div></div>
}
export default LoginFacebookComponent
