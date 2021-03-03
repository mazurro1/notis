import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { fetchLoginGoogleUser, addAlertItem } from "../state/actions"

const LoginGoogleComponent = ({ message, id, newAccount }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!message && !!id) {
      dispatch(fetchLoginGoogleUser(message, id))
      if (newAccount === "true") {
        dispatch(
          addAlertItem(
            "Wygenerowane hasło do konta zostało wysłane na e-maila (taki jak na google)",
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
export default LoginGoogleComponent
