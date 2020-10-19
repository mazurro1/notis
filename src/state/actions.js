import axios from "axios"
import { Site } from "../common/Site"

// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS

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
export const CHANGE_REMIND_PASSWORD_VISIBLE = "CHANGE_REMIND_PASSWORD_VISIBLE"
export const CHANGE_REMIND_PASSWORD_EMAIL_SENT =
  "CHANGE_REMIND_PASSWORD_EMAIL_SENT"
export const CHANGE_CREATE_COMPANY_VISIBLE = "CHANGE_CREATE_COMPANY_VISIBLE"

export const changeCreateCompanyVisible = value => {
  return {
    type: CHANGE_CREATE_COMPANY_VISIBLE,
    value: value,
  }
}

export const changeRemindPasswordEmailSent = value => {
  return {
    type: CHANGE_REMIND_PASSWORD_EMAIL_SENT,
    value: value,
  }
}

export const changeRemindPasswordVisible = value => {
  return {
    type: CHANGE_REMIND_PASSWORD_VISIBLE,
    value: value,
  }
}

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

export const fetchLoginUser = (email, password, checkboxAutoLogin) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/login`, {
        email: email,
        password: password,
      })
      .then(response => {
        if (checkboxAutoLogin) {
          localStorage.setItem("USERID", response.data.userId)
          localStorage.setItem("TOKEN", response.data.token)
        }
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

export const fetchRegisterUser = (email, name, surname, phone, password) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/registration`, {
        email: email,
        userName: name,
        userSurname: surname,
        phoneNumber: phone,
        password: password,
      })
      .then(response => {
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

export const fetchAutoLogin = (
  noAlert = false,
  noSpinner = false,
  tokenComing = null,
  userIdComing = null,
  lastSpinnerCreateCompany = false
) => {
  return dispatch => {
    const userId = !!userIdComing
      ? userIdComing
      : localStorage.getItem("USERID")
    if (userId !== null) {
      const token = !!tokenComing ? tokenComing : localStorage.getItem("TOKEN")
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
            if (lastSpinnerCreateCompany) {
              dispatch(
                addAlertItem("Pomyślnie utworzono konto firmowe.", "green")
              )
              dispatch(changeCreateCompanyVisible(false))
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
            if (lastSpinnerCreateCompany) {
              dispatch(
                addAlertItem("Błąd podczas tworzenia konta firmowego.", "red")
              )
              setTimeout(() => {
                dispatch(changeSpinner(false))
              }, 1000)
            }
          })
      }
    }
  }
}

export const fetchSentAgainActivedEmail = token => {
  return dispatch => {
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

export const fetchUserPhone = token => {
  return dispatch => {
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

export const fetchEditUser = (newPhone, newPassword, password, token) => {
  return dispatch => {
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
        dispatch(loginUser(response.data))
        dispatch(addUserPhone(response.data.userPhone))
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

export const fetchActiveAccount = (codeToVerified, token, userId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
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
        dispatch(fetchAutoLogin(true, true, token, userId))
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

export const fetchSentEmailResetPassword = email => {
  return dispatch => {
    return axios
      .post(`${Site.serverUrl}/sent-email-reset-password`, {
        email: email,
      })
      .then(response => {
        dispatch(changeRemindPasswordEmailSent(true))
        dispatch(
          addAlertItem(
            "Pomyślnie wysłano na adres email kod resetujący hasło.",
            "green"
          )
        )
      })
      .catch(error => {
        dispatch(
          addAlertItem(
            "Błąd podczas wysyłania na adres email kodu resetującego hasło.",
            "red"
          )
        )
      })
  }
}

export const fetchResetPassword = (email, password, codeReset) => {
  return dispatch => {
    return axios
      .post(`${Site.serverUrl}/reset-password`, {
        email: email,
        password: password,
        codeReset: codeReset,
      })
      .then(response => {
        dispatch(changeRemindPasswordVisible(false))
        dispatch(changeRemindPasswordEmailSent(false))
        dispatch(addAlertItem("Pomyślnie zresetowano hasło.", "green"))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas resetowania hasła.", "red"))
      })
  }
}

// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS

export const REPLACE_COMPANY_DATA = "REPLACE_COMPANY_DATA"

export const replaceCompanyData = data => {
  return {
    type: REPLACE_COMPANY_DATA,
    data: data,
  }
}

export const FetchAddCompanyToUser = (companyId, userToken, userId) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/add-company`,
        {
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )

      .then(response => {
        dispatch(fetchAutoLogin(true, true, userToken, userId, true))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas tworzenia konta firmowego.", "red"))
        dispatch(changeSpinner(false))
      })
  }
}

export const FetchCompanyRegistration = (
  companyEmail,
  companyName,
  companyNumber,
  companyCity,
  companyDiscrict,
  companyAdress,
  userToken,
  userId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-registration`,
        {
          companyEmail: companyEmail,
          companyName: companyName,
          companyNumber: companyNumber,
          companyCity: companyCity,
          companyDiscrict: companyDiscrict,
          companyAdress: companyAdress,
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )

      .then(response => {
        dispatch(
          FetchAddCompanyToUser(response.data.companyId, userToken, userId)
        )
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas tworzenia konta firmowego.", "red"))
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentAgainCompanyActivedEmail = (token, companyId) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/company-sent-again-verification-email`,
        {
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addAlertItem(
            "Pomyślnie wysłano kod aktywacyjny do aktywowania konto firmowe na adres email",
            "green"
          )
        )
      })
      .catch(error => {
        dispatch(
          addAlertItem(
            "Błąd podczas wysyłania kodu aktywującego konto firmowe.",
            "red"
          )
        )
      })
  }
}

export const fetchActiveCompanyAccount = (
  codeToVerified,
  companyId,
  token,
  userId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-veryfied-email`,
        {
          companyId: companyId,
          codeToVerified: codeToVerified,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Pomyślnie aktywowano konto firmowe", "green"))
        dispatch(fetchAutoLogin(true, true, token, userId))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas aktywowania konta firmowego.", "red")
        )
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}

export const fetchCompanyData = (companyId, token) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-data`,
        {
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(replaceCompanyData(response.data.companyProfil))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas ładowania konta firmowego.", "red"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}

export const fetchAddWorkerToCompany = (companyId, emailWorker, token) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/sent-email-to-active-company-worker`,
        {
          companyId: companyId,
          emailWorker: emailWorker,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addAlertItem("Wysłano link aktywacyjny na podany email.", "green")
        )
        dispatch(fetchCompanyData(companyId, token))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas dodawania pracownika.", "red"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}

export const fetchConfirmAddWorkerToCompany = (
  companyId,
  workerEmail,
  codeToActive
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/confirm-added-worker-to-company`, {
        companyId: companyId,
        workerEmail: workerEmail,
        codeToActive: codeToActive,
      })
      .then(response => {
        dispatch(addAlertItem("Dodano użytkownika do firmy.", "green"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas dodawania pracownika do firmy.", "red")
        )
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}
