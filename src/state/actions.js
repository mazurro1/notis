import axios from "axios"
import { Site } from "../common/Site"

export const CHANGE_SORT_VISIBLE = "CHANGE_SORT_VISIBLE"
export const CHANGE_FILTER_VISIBLE = "CHANGE_FILTER_VISIBLE"
export const CHANGE_LOCALIZATION_VISIBLE = "CHANGE_LOCALIZATION_VISIBLE"
export const CHANGE_SORT_VALUE = "CHANGE_SORT_VALUE"
export const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE"
export const CHANGE_LOCALIZATION_VALUE = "CHANGE_LOCALIZATION_VALUE"
export const CHANGE_INDUSTRIES = "CHANGE_INDUSTRIES"
export const LOADING_PLACES = "LOADING_PLACES"
export const CHANGE_SPINNER = "CHANGE_SPINNER"
export const LOGOUT = "LOGOUT"
export const LOGIN = "LOGIN"
export const CHANGE_LOGIN_VISIBLE = "CHANGE_LOGIN_VISIBLE"
export const CHANGE_REGISTRATION_VISIBLE = "CHANGE_REGISTRATION_VISIBLE"
export const REMOVE_ALERT_ITEM = "REMOVE_ALERT_ITEM"
export const ADD_ALERT_ITEM = "ADD_ALERT_ITEM"
export const ADD_USER_PHONE = "ADD_USER_PHONE"
export const CHANGE_USER_PROFIL_VISIBLE = "CHANGE_USER_PROFIL_VISIBLE"

export const changeUserProfilVisible = value => {
  return {
    type: CHANGE_USER_PROFIL_VISIBLE,
    value: value,
  }
}

export const addUserPhone = phone => {
  return {
    type: ADD_USER_PHONE,
    phone: phone,
  }
}

export const addAlertItem = (text, color) => {
  return {
    type: ADD_ALERT_ITEM,
    text: text,
    color: color,
  }
}

export const removeAlertItem = id => {
  return {
    type: REMOVE_ALERT_ITEM,
    id: id,
  }
}

export const changeLoginVisible = value => {
  return {
    type: CHANGE_LOGIN_VISIBLE,
    value: value,
  }
}

export const changeRegistrationVisible = value => {
  return {
    type: CHANGE_REGISTRATION_VISIBLE,
    value: value,
  }
}

export const changeLoadingPlaces = value => {
  return {
    type: LOADING_PLACES,
    value: value,
  }
}

export const changeSpinner = value => {
  return {
    type: CHANGE_SPINNER,
    value: value,
  }
}

export const changeIndustries = value => {
  return {
    type: CHANGE_INDUSTRIES,
    value: value,
  }
}

export const changeLocalizationValue = value => {
  return {
    type: CHANGE_LOCALIZATION_VALUE,
    value: value,
  }
}

export const changeSortValue = value => {
  return {
    type: CHANGE_SORT_VALUE,
    value: value,
  }
}

export const changeFilterValue = value => {
  return {
    type: CHANGE_FILTER_VALUE,
    value: value,
  }
}

export const changeSortVisible = () => {
  return {
    type: CHANGE_SORT_VISIBLE,
  }
}

export const changeFilterVisible = () => {
  return {
    type: CHANGE_FILTER_VISIBLE,
  }
}

export const changeLocaliaztionVisible = () => {
  return {
    type: CHANGE_LOCALIZATION_VISIBLE,
  }
}

export const changeLogout = () => {
  return {
    type: LOGOUT,
  }
}

export const loginUser = user => {
  return {
    type: LOGIN,
    user: user,
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(changeSpinner(true))
    localStorage.removeItem("USERID")
    localStorage.removeItem("TOKEN")
    dispatch(addAlertItem("Zostałeś wylogowany", "red"))
    setTimeout(() => {
      dispatch(changeSpinner(false))
    }, 1000)
    dispatch(changeLogout())
  }
}

export const fetchLoginUser = (email, password) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/login`, {
        email: email,
        password: password,
      })
      .then(response => {
        localStorage.setItem("USERID", response.data.userId)
        localStorage.setItem("TOKEN", response.data.token)
        dispatch(loginUser(response.data))
        dispatch(changeLoginVisible(false))
        dispatch(addAlertItem("Pomyślnie zalogowano się na konto", "green"))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas logowania się", "red"))
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchRegisterUser = (email, name, phone, password) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/registration`, {
        email: email,
        userName: name,
        phoneNumber: phone,
        password: password,
      })
      .then(response => {
        localStorage.setItem("USERID", response.data.userId)
        localStorage.setItem("TOKEN", response.data.token)
        dispatch(loginUser(response.data))
        dispatch(changeRegistrationVisible(false))
        dispatch(addAlertItem("Pomyślnie utworzono konto", "green"))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas tworzenia konta", "red"))
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAutoLogin = (noAlert = false, noSpinner = false) => {
  return dispatch => {
    const userId = localStorage.getItem("USERID")
    if (userId !== null) {
      const token = localStorage.getItem("TOKEN")
      if (token !== null) {
        if (!noSpinner) {
          dispatch(changeSpinner(true))
        }
        axios
          .post(`${Site.serverUrl}/auto-login`, {
            userId: userId,
            token: token,
          })
          .then(response => {
            if (!noAlert) {
              dispatch(addAlertItem("Autologowanie się powiodło", "green"))
            }
            dispatch(loginUser(response.data))
            if (!noSpinner) {
              setTimeout(() => {
                dispatch(changeSpinner(false))
              }, 1000)
            }
          })
          .catch(error => {
            if (!noAlert) {
              dispatch(addAlertItem("Autologowanie się nie powiodło", "red"))
            }
            if (error.response.status === 401) {
              dispatch(logout())
            }
            if (!noSpinner) {
              setTimeout(() => {
                dispatch(changeSpinner(false))
              }, 1000)
            }
          })
      }
    }
  }
}

export const fetchSentAgainActivedEmail = () => {
  return dispatch => {
    const token = localStorage.getItem("TOKEN")
    return axios
      .get(`${Site.serverUrl}/sent-again-veryfied-email`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(response => {
        dispatch(
          addAlertItem("Pomyślnie wysłano kod aktywacyjny na emaila", "green")
        )
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas wysyłania kodu aktywującego konto.", "red")
        )
      })
  }
}

export const fetchUserPhone = () => {
  return dispatch => {
    const token = localStorage.getItem("TOKEN")
    return axios
      .get(`${Site.serverUrl}/get-user-phone`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(response => {
        dispatch(addUserPhone(response.data.userPhone))
      })
      .catch(error => {})
  }
}

export const fetchEditUser = (newPhone, newPassword, password) => {
  return dispatch => {
    const token = localStorage.getItem("TOKEN")
    return axios
      .patch(
        `${Site.serverUrl}/edit-user`,
        {
          newPhone: newPhone,
          newPassword: newPassword,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        console.log(response.data)
        dispatch(loginUser(response.data))
        dispatch(addUserPhone(response.data.userPhone))
        localStorage.removeItem("USERID")
        localStorage.removeItem("TOKEN")
        localStorage.setItem("USERID", response.data.userId)
        localStorage.setItem("TOKEN", response.data.token)
        dispatch(
          addAlertItem("Pomyślnie zaktualizowano dane użytkownika", "green")
        )
        dispatch(changeUserProfilVisible(false))
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas aktualizowania danych użytkownika", "red")
        )
      })
  }
}

export const fetchActiveAccount = codeToVerified => {
  return dispatch => {
    dispatch(changeSpinner(true))
    const token = localStorage.getItem("TOKEN")
    return axios
      .patch(
        `${Site.serverUrl}/veryfied-email`,
        {
          codeToVerified: codeToVerified,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Pomyślnie aktywowano konto", "green"))
        dispatch(fetchAutoLogin(true, true))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas aktywowania konta.", "red"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}
