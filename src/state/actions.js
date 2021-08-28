import axios from "axios"
import { Site } from "../common/Site"

// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
export const VISIBLE_NAV_INDUSTRIES = "VISIBLE_NAV_INDUSTRIES"
export const HEIGHT_NAV_INDUSTRIES = "HEIGHT_NAV_INDUSTRIES"
export const CHANGE_ACCTIVE_ACCOUNT = "CHANGE_ACCTIVE_ACCOUNT"
export const CHANGE_BLIND_STYLE = "CHANGE_BLIND_STYLE"
export const CHANGE_DARK_STYLE = "CHANGE_DARK_STYLE"
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
export const CHANGE_LANGUAGE_STYLE = "CHANGE_LANGUAGE_STYLE"
export const ADD_NEW_USER_ALERT = "ADD_NEW_USER_ALERT"
export const CHANGE_ALERT_EXTRA = "CHANGE_ALERT_EXTRA"
export const ADD_TOKEN_AUTO_LOGIN_VISIBLE = "ADD_TOKEN_AUTO_LOGIN_VISIBLE"
export const VERIFIED_PHONE_COMPONENT = "VERIFIED_PHONE_COMPONENT"
export const VERIFIED_EMAIL_COMPONENT = "VERIFIED_EMAIL_COMPONENT"
export const CHANGE_MAP_ACTIVE = "CHANGE_MAP_ACTIVE"
export const CHANGE_POPUP_TAKE_PLACE = "CHANGE_POPUP_TAKE_PLACE"
export const CHANGE_SELECTED_NAME_MENU = "CHANGE_SELECTED_NAME_MENU"
export const UPDATE_USER_PHONE = "UPDATE_USER_PHONE"
export const RESET_UPDATE_USER_PHONE = "RESET_UPDATE_USER_PHONE"
export const ADD_USER_HISTORY_SERVICES = "ADD_USER_HISTORY_SERVICES"
export const ADD_USER_HISTORY_COMMUNITINGS = "ADD_USER_HISTORY_COMMUNITINGS"
export const CANCEL_USER_COMMUNITING = "CANCEL_USER_COMMUNITING"
export const RESET_USER_HISTORY_COMMUNITINGS = "RESET_USER_HISTORY_COMMUNITINGS"
export const RESET_USER_MENU = "RESET_USER_MENU"
export const RESET_USER_HISTORY_SERVICES = "RESET_USER_HISTORY_SERVICES"
export const UPDATE_DOWNLOADED_COMMUNITING = "UPDATE_DOWNLOADED_COMMUNITING"
export const UPDATE_DOWNLOADED_SERVICE = "UPDATE_DOWNLOADED_SERVICE"

export const updateDownloadService = service => {
  return {
    type: UPDATE_DOWNLOADED_SERVICE,
    service: service,
  }
}

export const updateDownloadCommuniting = communiting => {
  return {
    type: UPDATE_DOWNLOADED_COMMUNITING,
    communiting: communiting,
  }
}

export const fetchResetUserMenu = value => {
  return {
    type: RESET_USER_MENU,
    value: value,
  }
}

export const fetchResetUserHistoryServices = () => {
  return {
    type: RESET_USER_HISTORY_SERVICES,
  }
}

export const fetchResetUserHistoryCommunitings = () => {
  return {
    type: RESET_USER_HISTORY_COMMUNITINGS,
  }
}

export const cancelUserCommuniting = communityId => {
  return {
    type: CANCEL_USER_COMMUNITING,
    communityId: communityId,
  }
}

export const addUserHistoryCommunitings = userCommunitings => {
  return {
    type: ADD_USER_HISTORY_COMMUNITINGS,
    userCommunitings: userCommunitings,
  }
}

export const addUserHistoryServices = userServices => {
  return {
    type: ADD_USER_HISTORY_SERVICES,
    userServices: userServices,
  }
}

export const resetUpdateUserPhone = () => {
  return {
    type: RESET_UPDATE_USER_PHONE,
  }
}

export const changeSelectedNameMenu = value => {
  return {
    type: CHANGE_SELECTED_NAME_MENU,
    value: value,
  }
}

export const changePopupTakePlace = value => {
  return {
    type: CHANGE_POPUP_TAKE_PLACE,
    value: value,
  }
}

export const changeMapsActive = value => {
  return {
    type: CHANGE_MAP_ACTIVE,
    value: value,
  }
}

export const verifiedPhoneComponent = value => {
  return {
    type: VERIFIED_PHONE_COMPONENT,
    value: value,
  }
}

export const verifiedEmailComponent = value => {
  return {
    type: VERIFIED_EMAIL_COMPONENT,
    value: value,
  }
}

export const saveUserTokenToAutoLogin = value => {
  return {
    type: ADD_TOKEN_AUTO_LOGIN_VISIBLE,
    value: value,
  }
}

export const setVisibleMenuIndustries = value => {
  return {
    type: VISIBLE_NAV_INDUSTRIES,
    value: value,
  }
}

export const setHeightMenuIndustries = value => {
  return {
    type: HEIGHT_NAV_INDUSTRIES,
    value: value,
  }
}

export const changeActiveAccount = data => {
  return {
    type: CHANGE_ACCTIVE_ACCOUNT,
    data: data,
  }
}

export const changeAlertExtra = (name, value) => {
  return {
    type: CHANGE_ALERT_EXTRA,
    name: name,
    value: value,
  }
}

export const addNewUserAlert = data => {
  return {
    type: ADD_NEW_USER_ALERT,
    data: data,
  }
}

export const changeLanguageStyle = value => {
  return {
    type: CHANGE_LANGUAGE_STYLE,
    value: value,
  }
}

export const changeBlindStyle = () => {
  return {
    type: CHANGE_BLIND_STYLE,
  }
}

export const changeDarkStyle = () => {
  return {
    type: CHANGE_DARK_STYLE,
  }
}

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

export const updateUserPhone = phone => {
  return {
    type: UPDATE_USER_PHONE,
    phone: phone,
  }
}

export const addUserPhone = (
  phone,
  email,
  token,
  phoneVerified,
  hasPhone,
  blockUserChangePhoneNumber,
  blockUserSendVerifiedPhoneSms,
  emailVerified,
  emailToVerified,
  blockUserChangeEmail
) => {
  return {
    type: ADD_USER_PHONE,
    phone: phone,
    email: email,
    token: token,
    phoneVerified: phoneVerified,
    hasPhone: hasPhone,
    blockUserChangePhoneNumber: blockUserChangePhoneNumber,
    blockUserSendVerifiedPhoneSms: blockUserSendVerifiedPhoneSms,
    emailVerified: emailVerified,
    emailToVerified: emailToVerified,
    blockUserChangeEmail: blockUserChangeEmail,
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

export const changeLocalizationValue = (value, district) => {
  return {
    type: CHANGE_LOCALIZATION_VALUE,
    value: value,
    district: district,
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
    dispatch(changeSpinner(false))
    dispatch(changeLogout())
  }
}

export const saveUserTokenToLocal = (userId, token) => {
  return dispatch => {
    localStorage.removeItem("USERID")
    localStorage.removeItem("TOKEN")
    localStorage.setItem("USERID", userId)
    localStorage.setItem("TOKEN", token)
    dispatch(addAlertItem("Zapamiętano użytkownika", "green"))
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Podany login i/lub hasło są nieprawidłowe", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            }
            if (error.response.status === 440) {
              dispatch(
                addAlertItem("Podany numer telefonu jest zajęty.", "red")
              )
            } else if (error.response.status === 441) {
              dispatch(addAlertItem("Podany adres email jest zajęty.", "red"))
            } else {
              dispatch(addAlertItem("Błąd podczas tworzenia konta", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
              dispatch(changeSpinner(false))
            }
            if (lastSpinnerCreateCompany) {
              dispatch(
                addAlertItem("Pomyślnie utworzono konto firmowe.", "green")
              )
              dispatch(changeCreateCompanyVisible(false))
              dispatch(changeSpinner(false))
            }
          })
          .catch(error => {
            if (!!error) {
              if (!!error.response) {
                if (!noAlert) {
                  dispatch(
                    addAlertItem("Autologowanie się nie powiodło", "red")
                  )
                }
                if (error.response.status === 401) {
                  dispatch(logout())
                } else if (error.response.status === 422) {
                  localStorage.removeItem("USERID")
                  localStorage.removeItem("TOKEN")
                }
                if (!noSpinner) {
                  dispatch(changeSpinner(false))
                }
                if (lastSpinnerCreateCompany) {
                  dispatch(
                    addAlertItem(
                      "Błąd podczas tworzenia konta firmowego.",
                      "red"
                    )
                  )
                  dispatch(changeSpinner(false))
                }
              } else {
                dispatch(addAlertItem("Brak internetu.", "red"))
                dispatch(changeSpinner(false))
              }
            }
          })
      }
    }
  }
}

export const fetchLoginFacebookUser = (token, id) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    setTimeout(() => {
      dispatch(changeSpinner(false))
    }, 5000)
    axios
      .post(`${Site.serverUrl}/auto-login`, {
        userId: id,
        token: token,
      })
      .then(response => {
        dispatch(
          addAlertItem("Logowanie za pomocą facebooka powiodło się", "green")
        )
        dispatch(loginUser(response.data))
        dispatch(saveUserTokenToAutoLogin(true))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Logowanie za pomocą facebooka nie powiodło się",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchLoginGoogleUser = (token, id) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    setTimeout(() => {
      dispatch(changeSpinner(false))
    }, 5000)
    axios
      .post(`${Site.serverUrl}/auto-login`, {
        userId: id,
        token: token,
      })
      .then(response => {
        dispatch(
          addAlertItem("Logowanie za pomocą google powiodło się", "green")
        )
        dispatch(loginUser(response.data))
        dispatch(changeSpinner(false))
        dispatch(saveUserTokenToAutoLogin(true))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Logowanie za pomocą facebooka nie powiodło się",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania kodu aktywującego konto",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
        dispatch(updateUserPhone(response.data.userPhone))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchEditUser = (
  newPhone,
  newPassword,
  password,
  token,
  editPhone = false,
  newEmail
) => {
  return dispatch => {
    return axios
      .patch(
        `${Site.serverUrl}/edit-user`,
        {
          newPhone: newPhone,
          newPassword: newPassword,
          password: password,
          newEmail: newEmail,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addUserPhone(
            response.data.userPhone,
            response.data.email,
            response.data.token,
            response.data.phoneVerified,
            response.data.hasPhone,
            response.data.blockUserChangePhoneNumber,
            response.data.blockUserSendVerifiedPhoneSms,
            response.data.emailVerified,
            response.data.emailToVerified,
            response.data.blockUserChangeEmail
          )
        )
        if (!!editPhone && !!!response.data.phoneVerified) {
          dispatch(verifiedPhoneComponent(true))
        }
        if (!!newEmail && !!!response.data.emailVerified) {
          dispatch(verifiedEmailComponent(true))
        }
        dispatch(
          addAlertItem("Pomyślnie zaktualizowano dane użytkownika", "green")
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(addAlertItem("Nie poprawne hasło", "red"))
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Adres e-mail jest zajęty", "red"))
            } else if (error.response.status === 442) {
              dispatch(addAlertItem("Numer telefonu jest zajęty", "red"))
            } else if (error.response.status === 423) {
              dispatch(
                addAlertItem(
                  "Nie można teraz zaktualizować numer telefonu",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas aktualizowania danych użytkownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktywowania konta", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania na adres email kodu restartującego hasło",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Nieprawidłowy kod do resetowania hasła", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS
// COMPANY ACTIONS
export const WORKER_USERS_INFORMATIONS_BLOCK = "WORKER_USERS_INFORMATIONS_BLOCK"
export const WORKER_MORE_USERS_HISTORY_INFORMATIONS =
  "WORKER_MORE_USERS_HISTORY_INFORMATIONS"
export const WORKER_USERS_INFORMATIONS = "WORKER_USERS_INFORMATIONS"
export const RESET_PLACES = "RESET_PLACES"
export const UPDATE_PAGE = "UPDATE_PAGE"
export const UPDATE_PLACES_DATA = "UPDATE_PLACES_DATA"
export const CHANGE_EDIT_WORKER_HOURS = "EDIT_WORKER_HOURS"
export const REPLACE_COMPANY_DATA = "REPLACE_COMPANY_DATA"
export const RESET_EDIT_COMPANY = "RESET_EDIT_COMPANY"
export const CHANGE_RESERWATION_VALUE = "CHANGE_RESERWATION_VALUE"
// export const CHANGE_EDITED_WORKER_HOURS = "CHANGE_EDITED_WORKER_HOURS"
export const AVAIBLE_DATE_TO_RESERWATION = "AVAIBLE_DATE_TO_RESERWATION"
export const AVAIBLE_DATE_TO_RESERWATION_UPDATE =
  "AVAIBLE_DATE_TO_RESERWATION_UPDATE"
export const UPDATE_PATCH_COMPANY_DATA = "UPDATE_PATCH_COMPANY_DATA"
export const UPDATE_USER_RESERWATIONS = "UPDATE_USER_RESERWATIONS"
export const UPDATE_WORKER_RESERWATIONS = "UPDATE_WORKER_RESERWATIONS"
export const UPDATE_USER_ONE_RESERWATION = "UPDATE_USER_ONE_RESERWATION"
export const AVAIBLE_UPDATE_PAGE = "AVAIBLE_UPDATE_PAGE"
export const UPDATE_NEW_PLACES_DATA = "UPDATE_NEW_PLACES_DATA"
export const RESET_USER_ALERTS = "RESET_USER_ALERTS"
export const ADD_NEW_ALERTS = "ADD_NEW_ALERTS"
export const ADD_NEW_PHONE_WORKER_USER_INFORMATION =
  "ADD_NEW_PHONE_WORKER_USER_INFORMATION"
export const ADD_NEW_MESSAGE_WORKER_USER_INFORMATION =
  "ADD_NEW_MESSAGE_WORKER_USER_INFORMATION"
export const RESET_BELL_ALERT = "RESET_BELL_ALERT"
export const DELETE_MESSAGE_WORKER_USER_INFORMATION =
  "DELETE_MESSAGE_WORKER_USER_INFORMATION"
export const WORKER_MORE_USERS_MESSAGES_INFORMATIONS =
  "WORKER_MORE_USERS_MESSAGES_INFORMATIONS"
export const ADD_TO_USER_INFORMATIONS = "ADD_TO_USER_INFORMATIONS"
export const ADD_SELECTED_USER_RESERWATIONS = "ADD_SELECTED_USER_RESERWATIONS"
export const COMPANY_PATCH_NEW_SERVICES = "COMPANY_PATCH_NEW_SERVICES"
export const COMPANY_PATCH_SETTINGS = "COMPANY_PATCH_SETTINGS"
export const COMPANY_PATCH_WORKER_SETTINGS = "COMPANY_PATCH_WORKER_SETTINGS"
export const RESET_WORKER_PROPS_VISIBLE = "RESET_WORKER_PROPS_VISIBLE"
export const COMPANY_PATCH_WORKER_CONST_TIME = "COMPANY_PATCH_WORKER_CONST_TIME"
export const COMPANY_PATCH_WORKER_NO_CONST_HOURS =
  "COMPANY_PATCH_WORKER_NO_CONST_HOURS"
export const COMPANY_ADD_WORKER_NO_CONST_HOURS =
  "COMPANY_ADD_WORKER_NO_CONST_HOURS"
export const COMPANY_DELETE_WORKER_NO_CONST_HOURS =
  "COMPANY_DELETE_WORKER_NO_CONST_HOURS"
export const UPDATE_COMPANY_TEKSTS = "UPDATE_COMPANY_TEKSTS"
export const UPDATE_COMPANY_OPENING_HOURS = "UPDATE_COMPANY_OPENING_HOURS"
export const UPDATE_COMPANY_MAPS = "UPDATE_COMPANY_MAPS"
export const UPDATE_COMPANY_HAPPY_HOURS_CONST =
  "UPDATE_COMPANY_HAPPY_HOURS_CONST"
export const DELETE_COMPANY_HAPPY_HOUR_CONST = "DELETE_COMPANY_HAPPY_HOUR_CONST"
export const UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH =
  "UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH"
export const UPDATE_CONST_HAPPY_HOURS = "UPDATE_CONST_HAPPY_HOURS"
export const UPDATE_COMPANY_HAPPY_HOURS_NO_CONST =
  "UPDATE_COMPANY_HAPPY_HOURS_NO_CONST"
export const DELETE_COMPANY_PROMOTION = "DELETE_COMPANY_PROMOTION"
export const UPDATE_COMPANY_PATH_PROMOTION = "UPDATE_COMPANY_PATH_PROMOTION"
export const UPDATE_PROMOTIONS = "UPDATE_PROMOTIONS"
export const ADD_NEW_OPINIONS_COMPANY = "ADD_NEW_OPINIONS_COMPANY"
export const ADD_REPLAY_TO_OPINION = "ADD_REPLAY_TO_OPINION"
export const ADD_NEW_OPINION_TO_RESERWATION = "ADD_NEW_OPINION_TO_RESERWATION"
export const ADD_NEW_OPINION_TO_COMMUNITING = "ADD_NEW_OPINION_TO_COMMUNITING"
export const DELETE_COMPANY_IMAGE = "DELETE_COMPANY_IMAGE"
export const UPDATE_COMPANY_IMAGE = "UPDATE_COMPANY_IMAGE"
export const UPDATED_IMAGE_ID_COMPANY = "UPDATED_IMAGE_ID_COMPANY"
export const CHANGE_COMPANY_MAIN_IMAGE = "CHANGE_COMPANY_MAIN_IMAGE"
export const ADD_EDITED_OPINION_TO_RESERWATION =
  "ADD_EDITED_OPINION_TO_RESERWATION"
export const ADD_EDITED_OPINION_TO_COMMUNITING =
  "ADD_EDITED_OPINION_TO_COMMUNITING"
export const ADD_EDITED_OPINION_TO_SERVICE = "ADD_EDITED_OPINION_TO_SERVICE"
export const ADD_NEW_OPINION_TO_SERVICE = "ADD_NEW_OPINION_TO_SERVICE"
export const RESET_OPINION = "RESET_OPINION"
export const CHANGE_WORKING_HOURS = "CHANGE_WORKING_HOURS"
export const CHANGE_ACTIVE_WORKER = "CHANGE_ACTIVE_WORKER"
export const UPDATE_USER_IMAGE = "UPDATE_USER_IMAGE"
export const RESET_USER_PROFIL = "RESET_USER_PROFIL"
export const ADD_NEW_COMPANY_STAMPS = "ADD_NEW_COMPANY_STAMPS"
export const UPDATE_COMPANY_STAMPS = "UPDATE_COMPANY_STAMPS"
export const RESET_UPDATE_STAMPS = "RESET_UPDATE_STAMPS"
export const DELETE_COMPANY_STAMPS = "DELETE_COMPANY_STAMPS"
export const UPDATE_USER_RESERWATIONS_COUNT = "UPDATE_USER_RESERWATIONS_COUNT"
export const DELETE_FAVOURITES_COMPANY = "DELETE_FAVOURITES_COMPANY"
export const ADD_FAVOURITES_COMPANY = "ADD_FAVOURITES_COMPANY"
export const RESET_USER_FAVOURITES = "RESET_USER_FAVOURITES"
export const ADD_USER_COMPANY_AVAILABILITY = "ADD_USER_COMPANY_AVAILABILITY"
export const RESER_USER_COMPANY_AVAILABILITY = "RESER_USER_COMPANY_AVAILABILITY"
export const DELETE_USER_COMPANY_AVAILABILITY =
  "DELETE_USER_COMPANY_AVAILABILITY"
export const EDIT_USER_COMPANY_AVAILABILITY = "EXIT_USER_COMPANY_AVAILABILITY"
export const SAVE_EDITED_COMPANY_SHOP_STORE = "SAVE_EDITED_COMPANY_SHOP_STORE"
export const SAVE_COMPANY_STATS = "SAVE_COMPANY_STATS"
export const ADD_RESERWATION_WORKER_DATA = "ADD_RESERWATION_WORKER_DATA"
export const ADD_WORKER_CLIENT_RESERWATION_DATA =
  "ADD_WORKER_CLIENT_RESERWATION_DATA"
export const DELETE_RESERWATION_WORKER_DATA = "DELETE_RESERWATION_WORKER_DATA"
export const UPDATE_RESERWATION_WORKER_DATA = "UPDATE_RESERWATION_WORKER_DATA"
export const CONFIRM_DELETE_COMPANY = "CONFIRM_DELETE_COMPANY"
export const DELETE_COMPANY_USER = "DELETE_COMPANY_USER"
export const DELETE_COMPANY_CONFIRM = "DELETE_COMPANY_CONFIRM"
export const VERYFIED_USER_PHONE = "VERYFIED_USER_PHONE"
export const VERYFIED_USER_EMAIL = "VERYFIED_USER_EMAIL"
export const ERROR_LOADING_PAGE = "ERROR_LOADING_PAGE"
export const CHANGE_USER_BLOCK_SMS_SEND = "CHANGE_USER_BLOCK_SMS_SEND"
export const CHANGE_BLOCK_USER_CHANGE_EMAIL = "CHANGE_BLOCK_USER_CHANGE_EMAIL"
export const ADD_CHECKOUT_ID = "ADD_CHECKOUT_ID"
export const ADD_COMPANY_TRANSACTION_HISTORY = "ADD_COMPANY_TRANSACTION_HISTORY"
export const ADD_COINS_OFFER = "ADD_COINS_OFFER"
export const UPDATE_COMPANY_SMS_SETTINGS = "UPDATE_COMPANY_SMS_SETTINGS"
export const RESET_COMPANY_STATS = "RESET_COMPANY_STATS"
export const DELETE_WORKER_FROM_COMPANY = "DELETE_WORKER_FROM_COMPANY"
export const ACUTLIZATION_SMS_COMPANY_CLIENTS =
  "ACUTLIZATION_SMS_COMPANY_CLIENTS"
export const RESTART_COMPANY_SMS = "RESTART_COMPANY_SMS"
export const UPDATE_GEOLOCATION_MARKS = "UPDATE_GEOLOCATION_MARKS"
export const UPDATE_COMPANY_MARKER = "UPDATE_COMPANY_MARKER"
export const CHANGE_RESERWATION_USER = "CHANGE_RESERWATION_USER"
export const CHANGE_LIST_MAP_OFFERS = "CHANGE_LIST_MAP_OFFERS"
export const UPDATE_COMPANY_LINK_PATH = "UPDATE_COMPANY_LINK_PATH"
export const CHANGE_RESTART_COMPANY_LINK = "CHANGE_RESTART_COMPANY_LINK"
export const UPDATE_COMPANY_NIP = "UPDATE_COMPANY_NIP"
export const CHANGE_RESTART_COMPANY_NIP = "CHANGE_RESTART_COMPANY_NIP"
export const CHANGE_SELECTED_USER_COMPANY = "CHANGE_SELECTED_USER_COMPANY"
export const UPDATE_DEFAULT_COMPANY = "UPDATE_DEFAULT_COMPANY"
export const ADD_COMPANY_SERVICES = "ADD_COMPANY_SERVICES"
export const ADD_COMPANY_COMMUNITINGS = "ADD_COMPANY_COMMUNITINGS"
export const UPDATE_COMPANY_SERVICES = "UPDATE_COMPANY_SERVICES"
export const RESET_COMPANY_SERVICES = "RESET_COMPANY_SERVICES"
export const DELETE_COMPANY_SERVICE = "DELETE_COMPANY_SERVICE"
export const DELETE_COMPANY_COMMUNITING = "DELETE_COMPANY_COMMUNITING"
export const UPDATE_SERVICE_COMPANY_SERVICES = "UPDATE_SERVICE_COMPANY_SERVICES"
export const UPDATE_COMPANY_SERVICE_PHONE_USER =
  "UPDATE_COMPANY_SERVICE_PHONE_USER"
export const RESET_COMPANY_COMMUNITINGS = "RESET_COMPANY_COMMUNITINGS"
export const UPDATE_COMPANY_COMMUNITINGS = "UPDATE_COMPANY_COMMUNITINGS"
export const UPDATE_COMPANY_COMMUNITING_PHONE_USER =
  "UPDATE_COMPANY_COMMUNITING_PHONE_USER"
export const UPDATE_COMMUNITING_COMPANY_COMMUNITING =
  "UPDATE_COMMUNITING_COMPANY_COMMUNITING"
export const RESET_WORKER_DELETE = "RESET_WORKER_DELETE"
export const RESET_WORKER_NEW_CLIENT_RESERWATION =
  "RESET_WORKER_NEW_CLIENT_RESERWATION"
export const UPDATE_STATUS_ACTIVE_COMPANY_EMAIL =
  "UPDATE_STATUS_ACTIVE_COMPANY_EMAIL"
export const RESET_COMPANY_EDIT_PROFIL = "RESET_COMPANY_EDIT_PROFIL"
export const UPDATE_BLOCK_SEND_VERYFIED_PHONE_SMS =
  "UPDATE_BLOCK_SEND_VERYFIED_PHONE_SMS"
export const RESET_CREATE_COMPANY = "RESET_CREATE_COMPANY"
export const UPDATE_COMPANY_CHANGE_PHONE_EMAIL =
  "UPDATE_COMPANY_CHANGE_PHONE_EMAIL"
export const CANCEL_UPDATE_COMPANY_PHONE = "CANCEL_UPDATE_COMPANY_PHONE"
export const UPDATE_COMPANY_PHONE = "UPDATE_COMPANY_PHONE"
export const UPDATE_COMPANY_PHONE_SUCCESS = "UPDATE_COMPANY_PHONE_SUCCESS"
export const UPDATE_COMPANY_EMAIL_SUCCESS = "UPDATE_COMPANY_EMAIL_SUCCESS"
export const UPDATE_COMPANY_EMAIL = "UPDATE_COMPANY_EMAIL"
export const CANCEL_UPDATE_COMPANY_EMAIL = "CANCEL_UPDATE_COMPANY_EMAIL"
export const UPDATE_BLOCK_SEND_VERYFIED_EMAIL =
  "UPDATE_BLOCK_SEND_VERYFIED_EMAIL"

export const updateCompanyPhoneSuccess = (companyId, newPhone) => {
  return {
    type: UPDATE_COMPANY_PHONE_SUCCESS,
    companyId: companyId,
    newPhone: newPhone,
  }
}

export const updateCompanyEmailSuccess = (companyId, newEmail) => {
  return {
    type: UPDATE_COMPANY_EMAIL_SUCCESS,
    companyId: companyId,
    newEmail: newEmail,
  }
}

export const cancelUpdateCompanyPhone = companyId => {
  return {
    type: CANCEL_UPDATE_COMPANY_PHONE,
    companyId: companyId,
  }
}

export const cancelUpdateCompanyEmail = companyId => {
  return {
    type: CANCEL_UPDATE_COMPANY_EMAIL,
    companyId: companyId,
  }
}

export const updateCompanyChangePhoneEmail = (
  valuePhone = false,
  valueEmail = false
) => {
  return {
    type: UPDATE_COMPANY_CHANGE_PHONE_EMAIL,
    valuePhone: valuePhone,
    valueEmail: valueEmail,
  }
}

export const updateCompanyPhone = (companyId, newPhone) => {
  return {
    type: UPDATE_COMPANY_PHONE,
    companyId: companyId,
    newPhone: newPhone,
  }
}

export const updateCompanyEmail = (companyId, newEmail) => {
  return {
    type: UPDATE_COMPANY_EMAIL,
    companyId: companyId,
    newEmail: newEmail,
  }
}

export const updateResetCreateCompany = value => {
  return {
    type: RESET_CREATE_COMPANY,
    value: value,
  }
}

export const fetchResetCompanyEditProfil = value => {
  return {
    type: RESET_COMPANY_EDIT_PROFIL,
    value: value,
  }
}

export const fetchUpdateStatusActiveCompanyEmail = (
  companyId,
  accountEmailVerified,
  codeToVerifiedPhone
) => {
  return {
    type: UPDATE_STATUS_ACTIVE_COMPANY_EMAIL,
    companyId: companyId,
    accountEmailVerified: accountEmailVerified,
    codeToVerifiedPhone: codeToVerifiedPhone,
  }
}

export const updateBlockSendVerifiedEmail = (
  companyId,
  blockSendVerifiedEmail
) => {
  return {
    type: UPDATE_BLOCK_SEND_VERYFIED_EMAIL,
    companyId: companyId,
    blockSendVerifiedEmail: blockSendVerifiedEmail,
  }
}

export const updateBlockSendVerifiedPhoneSms = (
  companyId,
  blockSendVerifiedPhoneSms
) => {
  return {
    type: UPDATE_BLOCK_SEND_VERYFIED_PHONE_SMS,
    companyId: companyId,
    blockSendVerifiedPhoneSms: blockSendVerifiedPhoneSms,
  }
}

export const fetchResetWorkerNewClientReserwation = () => {
  return {
    type: RESET_WORKER_NEW_CLIENT_RESERWATION,
  }
}

export const resetWorkerDeleteFetch = () => {
  return {
    type: RESET_WORKER_DELETE,
  }
}

export const updateCompanyServicePhoneUser = (userPhone, serviceId) => {
  return {
    type: UPDATE_COMPANY_SERVICE_PHONE_USER,
    userPhone: userPhone,
    serviceId: serviceId,
  }
}

export const updateCompanyCommunitingPhoneUser = (userPhone, communitingId) => {
  return {
    type: UPDATE_COMPANY_COMMUNITING_PHONE_USER,
    userPhone: userPhone,
    communitingId: communitingId,
  }
}

export const fetchResetCompanyServices = () => {
  return {
    type: RESET_COMPANY_SERVICES,
  }
}

export const fetchResetCompanyCommunitings = () => {
  return {
    type: RESET_COMPANY_COMMUNITINGS,
  }
}

export const deleteCompanyServices = serviceId => {
  return {
    type: DELETE_COMPANY_SERVICE,
    serviceId: serviceId,
  }
}

export const deleteCompanyCommuniting = communitingId => {
  return {
    type: DELETE_COMPANY_COMMUNITING,
    communitingId: communitingId,
  }
}

export const updateServiceCompanyServices = updatedService => {
  return {
    type: UPDATE_SERVICE_COMPANY_SERVICES,
    updatedService: updatedService,
  }
}

export const updateServiceCompanyCommuniting = updatedCommuniting => {
  return {
    type: UPDATE_COMMUNITING_COMPANY_COMMUNITING,
    updatedCommuniting: updatedCommuniting,
  }
}

export const updateCompanyServices = newService => {
  return {
    type: UPDATE_COMPANY_SERVICES,
    newService: newService,
  }
}

export const updateCompanyCommunitings = newCommunitings => {
  return {
    type: UPDATE_COMPANY_COMMUNITINGS,
    newCommunitings: newCommunitings,
  }
}

export const addCompanyServices = (services, workers) => {
  return {
    type: ADD_COMPANY_SERVICES,
    services: services,
    workers: workers,
  }
}

export const addCompanyCommunitings = (communitings, workers) => {
  return {
    type: ADD_COMPANY_COMMUNITINGS,
    communitings: communitings,
    workers: workers,
  }
}

export const updateDefaultCompany = companyId => {
  return {
    type: UPDATE_DEFAULT_COMPANY,
    companyId: companyId,
  }
}

export const changeSelectedUserCompany = companyId => {
  return {
    type: CHANGE_SELECTED_USER_COMPANY,
    companyId: companyId,
  }
}

export const updateCompanyNip = (nip, dateInvoice) => {
  return {
    type: UPDATE_COMPANY_NIP,
    nip: nip,
    dateInvoice: dateInvoice,
  }
}

export const changeRestartCompanyNip = () => {
  return {
    type: CHANGE_RESTART_COMPANY_NIP,
  }
}

export const changeRestartCompanyLink = () => {
  return {
    type: CHANGE_RESTART_COMPANY_LINK,
  }
}

export const updateCompanyPath = linkPath => {
  return {
    type: UPDATE_COMPANY_LINK_PATH,
    linkPath: linkPath,
  }
}

export const changeListMapOffers = value => {
  return {
    type: CHANGE_LIST_MAP_OFFERS,
    value: value,
  }
}

export const changeReserwationUser = value => {
  return {
    type: CHANGE_RESERWATION_USER,
    value: value,
  }
}

export const changeCompanyMarker = data => {
  return {
    type: UPDATE_COMPANY_MARKER,
    data: data,
  }
}

export const updateGeolocationMarks = (geolocation, marks) => {
  return {
    type: UPDATE_GEOLOCATION_MARKS,
    geolocation: geolocation,
    marks: marks,
  }
}

export const restartCompanySMS = () => {
  return {
    type: RESTART_COMPANY_SMS,
  }
}

export const actualizationSMSCompanyClients = countMessages => {
  return {
    type: ACUTLIZATION_SMS_COMPANY_CLIENTS,
    countMessages: countMessages,
  }
}

export const deleteWorkerFromCompany = (companyId, workerUserId) => {
  return {
    type: DELETE_WORKER_FROM_COMPANY,
    companyId: companyId,
    workerUserId: workerUserId,
  }
}

export const resetCompanyStats = () => {
  return {
    type: RESET_COMPANY_STATS,
  }
}

export const updateCompanySMSSettings = (
  smsReserwationAvaible,
  smsReserwationChangedUserAvaible,
  smsNotifactionAvaible,
  smsCanceledAvaible,
  smsChangedAvaible,
  smsServiceCreatedAvaible,
  smsServiceChangedAvaible,
  smsServiceFinishedAvaible,
  smsServiceCanceledAvaible,
  smsCommunitingNotificationAvaible,
  smsCommunitingCreatedAvaible,
  smsCommunitingChangedAvaible,
  smsCommunitingCanceledAvaible
) => {
  return {
    type: UPDATE_COMPANY_SMS_SETTINGS,
    smsReserwationAvaible: smsReserwationAvaible,
    smsReserwationChangedUserAvaible: smsReserwationChangedUserAvaible,
    smsNotifactionAvaible: smsNotifactionAvaible,
    smsCanceledAvaible: smsCanceledAvaible,
    smsChangedAvaible: smsChangedAvaible,
    smsServiceCreatedAvaible: smsServiceCreatedAvaible,
    smsServiceChangedAvaible: smsServiceChangedAvaible,
    smsServiceFinishedAvaible: smsServiceFinishedAvaible,
    smsServiceCanceledAvaible: smsServiceCanceledAvaible,
    smsCommunitingNotificationAvaible: smsCommunitingNotificationAvaible,
    smsCommunitingCreatedAvaible: smsCommunitingCreatedAvaible,
    smsCommunitingChangedAvaible: smsCommunitingChangedAvaible,
    smsCommunitingCanceledAvaible: smsCommunitingCanceledAvaible,
  }
}

export const addCoinsOffer = data => {
  return {
    type: ADD_COINS_OFFER,
    data: data,
  }
}

export const addCompanyTransactionHistory = data => {
  return {
    type: ADD_COMPANY_TRANSACTION_HISTORY,
    data: data,
  }
}

export const addCheckoutId = paymentItem => {
  return {
    type: ADD_CHECKOUT_ID,
    paymentItem: paymentItem,
  }
}

export const changeUserBlockSmsSend = date => {
  return {
    type: CHANGE_USER_BLOCK_SMS_SEND,
    date: date,
  }
}

export const changeBlockUserChangeEmail = date => {
  return {
    type: CHANGE_BLOCK_USER_CHANGE_EMAIL,
    date: date,
  }
}

export const errorLoadingPage = value => {
  return {
    type: ERROR_LOADING_PAGE,
    value: value,
  }
}

export const veryfiedUserPhone = token => {
  return {
    type: VERYFIED_USER_PHONE,
    token: token,
  }
}

export const veryfiedUserEmail = token => {
  return {
    type: VERYFIED_USER_EMAIL,
    token: token,
  }
}

export const changeDeleteCompanyConfirm = () => {
  return {
    type: DELETE_COMPANY_CONFIRM,
  }
}

export const deleteCompanyUser = companyId => {
  return {
    type: DELETE_COMPANY_USER,
    companyId: companyId,
  }
}

export const confirmDeleteCompany = value => {
  return {
    type: CONFIRM_DELETE_COMPANY,
    value: value,
  }
}

export const updateReserwationWorkerDate = (
  reserwationId,
  changed,
  noFinished,
  newTimeStart,
  newTimeEnd,
  workerSelectedUserId,
  dateReserwation
) => {
  return {
    type: UPDATE_RESERWATION_WORKER_DATA,
    reserwationId: reserwationId,
    changed: changed,
    noFinished: noFinished,
    newTimeStart: newTimeStart,
    newTimeEnd: newTimeEnd,
    workerSelectedUserId: workerSelectedUserId,
    dateReserwation: dateReserwation,
  }
}

export const deleteReserwationWorkerDate = dataId => {
  return {
    type: DELETE_RESERWATION_WORKER_DATA,
    dataId: dataId,
  }
}

export const addReserwationWorkerDate = data => {
  return {
    type: ADD_RESERWATION_WORKER_DATA,
    data: data,
  }
}

export const addWorkerClientReserwationDate = data => {
  return {
    type: ADD_WORKER_CLIENT_RESERWATION_DATA,
    data: data,
  }
}

export const saveCompanyStats = (
  stats,
  services,
  raportSMS,
  raportServices,
  raportCommunitings
) => {
  return {
    type: SAVE_COMPANY_STATS,
    stats: stats,
    services: services,
    raportSMS: raportSMS,
    raportServices: raportServices,
    raportCommunitings: raportCommunitings,
  }
}

export const saveEditedCompanyShopStore = shopStore => {
  return {
    type: SAVE_EDITED_COMPANY_SHOP_STORE,
    shopStore: shopStore,
  }
}

export const editUserCompanyAvailability = (itemId, itemName, itemCount) => {
  return {
    type: EDIT_USER_COMPANY_AVAILABILITY,
    itemId: itemId,
    itemName: itemName,
    itemCount: itemCount,
  }
}

export const deleteUserCompanyAvailability = itemId => {
  return {
    type: DELETE_USER_COMPANY_AVAILABILITY,
    itemId: itemId,
  }
}

export const resetFetchUserCompanyAvailability = () => {
  return {
    type: RESER_USER_COMPANY_AVAILABILITY,
  }
}

export const addUserCompanyAvailability = (data, hasPermission) => {
  return {
    type: ADD_USER_COMPANY_AVAILABILITY,
    data: data,
    hasPermission: hasPermission,
  }
}

export const resetUserFavourites = () => {
  return {
    type: RESET_USER_FAVOURITES,
  }
}

export const deleteFavouritesCompany = companyId => {
  return {
    type: DELETE_FAVOURITES_COMPANY,
    companyId: companyId,
  }
}

export const addFavouritesCompany = favouriteAddData => {
  return {
    type: ADD_FAVOURITES_COMPANY,
    favouriteAddData: favouriteAddData,
  }
}

export const updateUserReserwationsCount = (
  companyId,
  isStampActive,
  countStampsToActive
) => {
  return {
    type: UPDATE_USER_RESERWATIONS_COUNT,
    companyId: companyId,
    isStampActive: isStampActive,
    countStampsToActive: countStampsToActive,
  }
}

export const daleteCompanyStamps = (companyId, stampId) => {
  return {
    type: DELETE_COMPANY_STAMPS,
    companyId: companyId,
    stampId: stampId,
  }
}

export const resetUpdateStamps = () => {
  return {
    type: RESET_UPDATE_STAMPS,
  }
}

export const updateCompanyStamps = (companyId, stampData) => {
  return {
    type: UPDATE_COMPANY_STAMPS,
    companyId: companyId,
    stampData: stampData,
  }
}

export const addNewCompanyStamps = (companyId, newCompanyStamps) => {
  return {
    type: ADD_NEW_COMPANY_STAMPS,
    newCompanyStamps: newCompanyStamps,
    companyId: companyId,
  }
}

export const resetUserProfil = () => {
  return {
    type: RESET_USER_PROFIL,
  }
}

export const updateUserImage = imageUrl => {
  return {
    type: UPDATE_USER_IMAGE,
    imageUrl: imageUrl,
  }
}

export const changeActiveWorker = value => {
  return {
    type: CHANGE_ACTIVE_WORKER,
    value: value,
  }
}

export const changeWorkerHours = dataWorkingHours => {
  return {
    type: CHANGE_WORKING_HOURS,
    dataWorkingHours: dataWorkingHours,
  }
}

export const changeCompanyMainImage = (companyId, imagePath) => {
  return {
    type: CHANGE_COMPANY_MAIN_IMAGE,
    companyId: companyId,
    imagePath: imagePath,
  }
}

export const updateUpdatedImageIdCompany = () => {
  return {
    type: UPDATED_IMAGE_ID_COMPANY,
  }
}

export const updateCompanyImage = (companyId, pathImage, imageId) => {
  return {
    type: UPDATE_COMPANY_IMAGE,
    pathImage: pathImage,
    companyId: companyId,
    imageId: imageId,
  }
}

export const deleteCompanyImage = (companyId, pathImage) => {
  return {
    type: DELETE_COMPANY_IMAGE,
    companyId: companyId,
    pathImage: pathImage,
  }
}

export const addEditedOpinionToCommuniting = (
  communitingId,
  opinionEdited,
  company,
  companyId,
  opinionId
) => {
  return {
    type: ADD_EDITED_OPINION_TO_COMMUNITING,
    communitingId: communitingId,
    opinionEdited: opinionEdited,
    companyName: company,
    companyId: companyId,
    opinionId: opinionId,
  }
}

export const addEditedOpinionToService = (
  serviceId,
  opinionEdited,
  company,
  companyId,
  opinionId
) => {
  return {
    type: ADD_EDITED_OPINION_TO_SERVICE,
    serviceId: serviceId,
    opinionEdited: opinionEdited,
    companyName: company,
    companyId: companyId,
    opinionId: opinionId,
  }
}

export const addEditedOpinionToReserwation = (
  reserwationId,
  opinionEdited,
  company,
  companyId,
  opinionId
) => {
  return {
    type: ADD_EDITED_OPINION_TO_RESERWATION,
    reserwationId: reserwationId,
    opinionEdited: opinionEdited,
    companyName: company,
    companyId: companyId,
    opinionId: opinionId,
  }
}

export const addNewOpinionToCommuniting = (
  communitingId,
  opinion,
  company,
  companyId
) => {
  return {
    type: ADD_NEW_OPINION_TO_COMMUNITING,
    communitingId: communitingId,
    opinion: opinion,
    companyName: company,
    companyId: companyId,
  }
}

export const addNewOpinionToService = (
  serviceId,
  opinion,
  company,
  companyId
) => {
  return {
    type: ADD_NEW_OPINION_TO_SERVICE,
    serviceId: serviceId,
    opinion: opinion,
    companyName: company,
    companyId: companyId,
  }
}

export const addNewOpinionToReserwation = (
  reserwationId,
  opinion,
  company,
  companyId
) => {
  return {
    type: ADD_NEW_OPINION_TO_RESERWATION,
    reserwationId: reserwationId,
    opinion: opinion,
    companyName: company,
    companyId: companyId,
  }
}

export const addReplayToOpinion = (opinionId, replay, companyId) => {
  return {
    type: ADD_REPLAY_TO_OPINION,
    opinionId: opinionId,
    replay: replay,
    companyId: companyId,
  }
}

export const resetOpinionFunction = () => {
  return {
    type: RESET_OPINION,
  }
}

export const addNewOpinionsCompany = (companyId, opinions) => {
  return {
    type: ADD_NEW_OPINIONS_COMPANY,
    companyId: companyId,
    opinions: opinions,
  }
}

export const updatePromotionsDispatch = () => {
  return {
    type: UPDATE_PROMOTIONS,
  }
}

export const updateCompanyPathPromotion = promotionDate => {
  return {
    type: UPDATE_COMPANY_PATH_PROMOTION,
    promotionDate: promotionDate,
  }
}

export const deleteCompanyPromotion = promotionId => {
  return {
    type: DELETE_COMPANY_PROMOTION,
    promotionId: promotionId,
  }
}

export const updateConstHappyHoursFunction = () => {
  return {
    type: UPDATE_CONST_HAPPY_HOURS,
  }
}

export const updateCompanyHappyHourConstPatch = dateConst => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH,
    dateConst: dateConst,
  }
}

export const deleteCompanyHappyHoursConst = happyHourId => {
  return {
    type: DELETE_COMPANY_HAPPY_HOUR_CONST,
    happyHourId: happyHourId,
  }
}

export const updateCompanyHappyHoursConst = constHappyHours => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOURS_CONST,
    constHappyHours: constHappyHours,
  }
}

export const updateCompanyPromotions = promotions => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOURS_NO_CONST,
    promotions: promotions,
  }
}

export const updateCompanyMaps = maps => {
  return {
    type: UPDATE_COMPANY_MAPS,
    maps: maps,
  }
}

export const updateOpeningHoursCompany = (openingHours, daysOff) => {
  return {
    type: UPDATE_COMPANY_OPENING_HOURS,
    openingHours: openingHours,
    daysOff: daysOff,
  }
}

export const updateComanyTeksts = texts => {
  return {
    type: UPDATE_COMPANY_TEKSTS,
    texts: texts,
  }
}

export const companyDeleteWorkerNoConstHours = (workerId, noConstHourId) => {
  return {
    type: COMPANY_DELETE_WORKER_NO_CONST_HOURS,
    workerId: workerId,
    noConstHourId: noConstHourId,
  }
}

export const companyAddWorkerNoConstHours = (workerId, data) => {
  return {
    type: COMPANY_ADD_WORKER_NO_CONST_HOURS,
    workerId: workerId,
    data: data,
  }
}

export const companyPatchWorkerNoConstHours = (workerId, data) => {
  return {
    type: COMPANY_PATCH_WORKER_NO_CONST_HOURS,
    workerId: workerId,
    data: data,
  }
}

export const resetWorkersPropsVisible = () => {
  return {
    type: RESET_WORKER_PROPS_VISIBLE,
  }
}

export const companyPatchWorkerContTime = dataTime => {
  return {
    type: COMPANY_PATCH_WORKER_CONST_TIME,
    dataTime: dataTime,
  }
}

export const companyPatchWorkerSettings = dataWorker => {
  return {
    type: COMPANY_PATCH_WORKER_SETTINGS,
    dataWorker: dataWorker,
  }
}

export const companyPatchSettings = data => {
  return {
    type: COMPANY_PATCH_SETTINGS,
    data: data,
  }
}

export const patchNewCompanyServices = (
  data,
  ownerDataServices,
  workers,
  promotions,
  happyHoursConst,
  companyStamps
) => {
  return {
    type: COMPANY_PATCH_NEW_SERVICES,
    data: data,
    ownerDataServices: ownerDataServices,
    workers: workers,
    promotions: promotions,
    happyHoursConst: happyHoursConst,
    companyStamps: companyStamps,
  }
}

export const addSelectedUserReserwations = (userSelectedId, reserwations) => {
  return {
    type: ADD_SELECTED_USER_RESERWATIONS,
    userSelectedId: userSelectedId,
    reserwations: reserwations,
  }
}

export const addToUserInformations = (userSelectedId, messages) => {
  return {
    type: ADD_TO_USER_INFORMATIONS,
    userSelectedId: userSelectedId,
    messages: messages,
  }
}

export const newWorkerUsersMessageInformations = (data, selectedUserId) => {
  return {
    type: WORKER_MORE_USERS_MESSAGES_INFORMATIONS,
    data: data,
    selectedUserId: selectedUserId,
  }
}

const deleteMessageToUserInformation = (selectedUserId, messageId) => {
  return {
    type: DELETE_MESSAGE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    messageId: messageId,
  }
}

export const resetBellAlerts = value => {
  return {
    type: RESET_BELL_ALERT,
    value: value,
  }
}

export const addNewMessageToUserInformation = (selectedUserId, newMessage) => {
  return {
    type: ADD_NEW_MESSAGE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    newMessage: newMessage,
  }
}

export const addPhoneToWorkerUserInformation = (selectedUserId, userPhone) => {
  return {
    type: ADD_NEW_PHONE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    userPhone: userPhone,
  }
}

export const newWorkerUsersInformationsBlock = (selectedUserId, isBlocked) => {
  return {
    type: WORKER_USERS_INFORMATIONS_BLOCK,
    selectedUserId: selectedUserId,
    isBlocked: isBlocked,
  }
}

export const newWorkerUsersHistoryInformations = (data, userSelectedId) => {
  return {
    type: WORKER_MORE_USERS_HISTORY_INFORMATIONS,
    data: data,
    userSelectedId: userSelectedId,
  }
}

export const newWorkerUsersInformations = data => {
  return {
    type: WORKER_USERS_INFORMATIONS,
    data: data,
  }
}

export const addNewAlerts = data => {
  return {
    type: ADD_NEW_ALERTS,
    data: data,
  }
}

export const resetUserAlerts = () => {
  return {
    type: RESET_USER_ALERTS,
  }
}

export const resetPlaces = () => {
  return {
    type: RESET_PLACES,
  }
}

export const avaibleUpdatePage = value => {
  return {
    type: AVAIBLE_UPDATE_PAGE,
    value: value,
  }
}

export const updatePage = () => {
  return {
    type: UPDATE_PAGE,
  }
}

export const updateUserOneReserwation = (reserwationId, companyName) => {
  return {
    type: UPDATE_USER_ONE_RESERWATION,
    reserwationId: reserwationId,
    companyName: companyName,
  }
}

export const updateUserReserwations = data => {
  return {
    type: UPDATE_USER_RESERWATIONS,
    data: data,
  }
}

export const updateWorkerReserwations = data => {
  return {
    type: UPDATE_WORKER_RESERWATIONS,
    data: data,
  }
}

export const updatePlacesData = data => {
  return {
    type: UPDATE_PLACES_DATA,
    data: data,
  }
}

export const updateNewPlacesData = data => {
  return {
    type: UPDATE_NEW_PLACES_DATA,
    data: data,
  }
}

export const updatePatchCompanyData = data => {
  return {
    type: UPDATE_PATCH_COMPANY_DATA,
    data: data,
  }
}

export const avaibleDateToReserwationUpdate = value => {
  return {
    type: AVAIBLE_DATE_TO_RESERWATION_UPDATE,
    value: value,
  }
}

export const avaibleDateToReserwation = date => {
  return {
    type: AVAIBLE_DATE_TO_RESERWATION,
    date: date,
  }
}

// export const changeEditedWorkerHours = item => {
//   return {
//     type: CHANGE_EDITED_WORKER_HOURS,
//     item: item,
//   }
// }

export const changeEditWorkerHours = (value, item) => {
  return {
    type: CHANGE_EDIT_WORKER_HOURS,
    value: value,
    item: item,
  }
}

export const changeReserwationValue = value => {
  return {
    type: CHANGE_RESERWATION_VALUE,
    value: value,
  }
}

export const resetEditCompany = value => {
  return {
    type: RESET_EDIT_COMPANY,
    value: value,
  }
}

export const replaceCompanyData = data => {
  return {
    type: REPLACE_COMPANY_DATA,
    data: data,
  }
}

export const fetchCompanyRegistration = (
  companyEmail,
  companyName,
  companyNumber,
  companyCity,
  companyDiscrict,
  companyAdress,
  userToken,
  userId,
  industries,
  companyNip,
  companyAdressCode
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
          companyIndustries: industries,
          companyNip: companyNip,
          companyAdressCode: companyAdressCode,
        },
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )

      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(fetchAutoLogin(true, true, userToken, userId, true))
        dispatch(updateResetCreateCompany(true))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Email jest zajęty", "red"))
            } else if (error.response.status === 442) {
              dispatch(addAlertItem("Podano nieprawidłowy adress", "red"))
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Nieprawidłowy numer NIP", "red"))
            } else {
              dispatch(
                addAlertItem("Błąd podczas tworzenia konta firmowego", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
            "Pomyślnie wysłano kod aktywacyjny do aktywowania konto firmowe podany adres email",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania kodu aktywującego konto firmowe",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchSentAgainCompanyActivedNewPhone = (token, companyId) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/company-sent-again-verification-new-phone`,
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
          updateBlockSendVerifiedPhoneSms(
            companyId,
            response.data.blockSendVerifiedPhoneSms
          )
        )
        dispatch(
          addAlertItem(
            "Pomyślnie wysłano kod aktywacyjny do aktywowania konto firmowe na podany numer telefonu",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania kodu aktywującego konto firmowe",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchSentAgainCompanyActivedPhone = (token, companyId) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/company-sent-again-verification-phone`,
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
          updateBlockSendVerifiedPhoneSms(
            companyId,
            response.data.blockSendVerifiedPhoneSms
          )
        )
        dispatch(
          addAlertItem(
            "Pomyślnie wysłano kod aktywacyjny do aktywowania konto firmowe na podany numer telefonu",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania kodu aktywującego konto firmowe",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
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
        dispatch(addAlertItem("Pomyślnie aktywowano email firmowy", "green"))
        dispatch(
          fetchUpdateStatusActiveCompanyEmail(
            companyId,
            response.data.accountEmailVerified,
            false
          )
        )

        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktywowania konta firmowego", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchActiveCompanyAccountPhone = (
  codeToVerified,
  companyId,
  token,
  userId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-veryfied-phone`,
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
        dispatch(addAlertItem("Pomyślnie aktywowano telefon firmowy", "green"))
        dispatch(fetchAutoLogin(true, true, token, userId))
        dispatch(fetchUpdateStatusActiveCompanyEmail(companyId, true, true))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktywowania konta firmowego", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
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
        dispatch(changeSpinner(false))
        dispatch(resetEditCompany(true))
        dispatch(errorLoadingPage(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(
                addAlertItem("Brak uprawnień do wyświetlenia zawartości", "red")
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas ładowania konta firmowego", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
        dispatch(resetEditCompany(false))
        dispatch(errorLoadingPage(true))
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
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 441) {
              dispatch(
                addAlertItem(
                  "Podany użytkownik znajduje się w bazie pracowników.",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania pracownika", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddAgainWorkerToCompany = (companyId, emailWorker, token) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/sent-again-email-to-active-company-worker`,
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
          addAlertItem(
            "Wysłano ponownie link aktywacyjny na podany email.",
            "green"
          )
        )
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas ponownego wysyłania linku aktywującego",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
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
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas dodawania pracownika do firmy",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeleteUserFromCompany = (
  companyId,
  workerUserId,
  token,
  password
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/delete-worker-from-company`,
        {
          companyId: companyId,
          workerUserId: workerUserId,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Usunięto pracownika.", "green"))
        dispatch(deleteWorkerFromCompany(companyId, workerUserId))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 441) {
              dispatch(addAlertItem("Błędne hasło", "red"))
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania pracownika", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDoReserwation = (
  token,
  companyId,
  workerUserId,
  workerId,
  dateStart,
  dateFull,
  reserwationMessage,
  serviceId,
  numberPhone,
  isStampActive,
  countStampsToActive
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-reserwation`,
        {
          workerUserId: workerUserId,
          workerId: workerId,
          companyId: companyId,
          dateStart: dateStart,
          dateFull: dateFull,
          reserwationMessage: reserwationMessage,
          serviceId: serviceId,
          numberPhone: numberPhone,
          isStampActive: isStampActive,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if (!!isStampActive) {
          dispatch(
            updateUserReserwationsCount(
              companyId,
              isStampActive,
              countStampsToActive
            )
          )
        }
        dispatch(addAlertItem("Dokonano rezerwacji.", "green"))
        dispatch(changeReserwationValue(null))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 419) {
              dispatch(addAlertItem("Konto firmowe jest nieaktywne", "red"))
            } else {
              dispatch(addAlertItem("Podany termin jest już zajęty", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchChangeReserwation = (
  token,
  companyId,
  workerUserId,
  workerId,
  dateStart,
  dateFull,
  reserwationMessage,
  serviceId,
  numberPhone,
  isStampActive,
  countStampsToActive,
  selectedReserwationId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/change-reserwation`,
        {
          workerUserId: workerUserId,
          workerId: workerId,
          companyId: companyId,
          dateStart: dateStart,
          dateFull: dateFull,
          reserwationMessage: reserwationMessage,
          serviceId: serviceId,
          numberPhone: numberPhone,
          isStampActive: isStampActive,
          selectedReserwationId: selectedReserwationId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if (!!isStampActive) {
          dispatch(
            updateUserReserwationsCount(
              companyId,
              isStampActive,
              countStampsToActive
            )
          )
        }
        dispatch(addAlertItem("Dokonano zmiany rezerwacji.", "green"))
        dispatch(changeReserwationUser(true))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 419) {
              dispatch(addAlertItem("Konto firmowe jest nieaktywne", "red"))
            } else {
              dispatch(addAlertItem("Podany termin jest już zajęty", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchWorkerDisabledHours = (
  token,
  companyId,
  selectedWorkerUserId,
  selectedWorkerId,
  selectedDay,
  selectedMonth,
  selectedYear,
  timeReserwation,
  serviceId
) => {
  return dispatch => {
    dispatch(
      changeAlertExtra("Ładowanie wylnych godzin wybranego pracownika", true)
    )
    dispatch(avaibleDateToReserwationUpdate(true))
    return axios
      .post(
        `${Site.serverUrl}/get-worker-disabled-hours`,
        {
          workerUserId: selectedWorkerUserId,
          workerId: selectedWorkerId,
          companyId: companyId,
          selectedDay: selectedDay,
          selectedMonth: selectedMonth,
          selectedYear: selectedYear,
          timeReserwation: timeReserwation,
          serviceId: serviceId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(avaibleDateToReserwationUpdate(false))
        dispatch(
          avaibleDateToReserwation(response.data.avaibleHoursWithPromotions)
        )
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(avaibleDateToReserwationUpdate(false))
        dispatch(avaibleDateToReserwation([]))
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchPathCompany = companyPath => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie dancyh o firmie", true))
    return axios
      .post(`${Site.serverUrl}/company-path`, {
        companyPath: companyPath,
      })
      .then(response => {
        dispatch(updatePatchCompanyData(response.data.companyDoc))
        dispatch(changeAlertExtra(null, false))
        dispatch(errorLoadingPage(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania danych o firmie", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
        dispatch(errorLoadingPage(true))
      })
  }
}

export const fetchAllCompanys = (
  page = 1,
  sorts,
  filters,
  localization,
  selectedName,
  district
) => {
  return dispatch => {
    if (page === 1) {
      dispatch(changeLoadingPlaces(true))
    } else {
      dispatch(changeAlertExtra("Ładowanie firm", true))
    }
    return axios
      .post(`${Site.serverUrl}/all-companys`, {
        page: page,
        sorts: sorts,
        filters: filters,
        localization: localization,
        selectedName: selectedName,
        district: district,
      })
      .then(response => {
        if (page === 1) {
          dispatch(
            updatePlacesData(
              response.data.companysDoc,
              response.data.geolocation
            )
          )
          dispatch(changeLoadingPlaces(false))
          if (response.data.companysDoc.length === 0) {
            dispatch(
              addAlertItem("Brak więcej firm w danej kategorii.", "blue")
            )
          }
        } else if (page > 1 && response.data.companysDoc.length > 0) {
          dispatch(updateNewPlacesData(response.data.companysDoc))
          dispatch(changeAlertExtra(null, false))
        }
      })
      .catch(error => {
        if (!!error.response) {
          if (error.response.status === 403) {
            dispatch(
              addAlertItem("Brak więcej firm w danej kategorii.", "blue")
            )
          } else if (error.response.status === 401) {
            dispatch(logout())
          } else {
            dispatch(addAlertItem("Błąd podczas pobierania firm.", "red"))
          }
        }
        if (page === 1) {
          dispatch(changeLoadingPlaces(false))
          dispatch(resetPlaces())
        } else {
          dispatch(changeAlertExtra(null, false))
        }
      })
  }
}

export const fetchAllCompanysOfType = (
  page = 1,
  type = 1,
  sorts,
  filters,
  localization,
  selectedName,
  district
) => {
  return dispatch => {
    if (page === 1) {
      dispatch(changeLoadingPlaces(true))
    } else {
      dispatch(changeAlertExtra("Ładowanie firm", true))
    }
    return axios
      .post(`${Site.serverUrl}/all-companys-type`, {
        page: page,
        type: type,
        sorts: sorts,
        filters: filters,
        localization: localization,
        selectedName: selectedName,
        district: district,
      })
      .then(response => {
        if (page === 1) {
          dispatch(changeLoadingPlaces(false))
          dispatch(
            updatePlacesData(
              response.data.companysDoc,
              response.data.geolocation
            )
          )
          if (response.data.companysDoc.length === 0) {
            dispatch(
              addAlertItem("Brak więcej firm w danej kategorii.", "blue")
            )
          }
        } else if (page > 1 && response.data.companysDoc.length > 0) {
          dispatch(updateNewPlacesData(response.data.companysDoc))
          dispatch(changeAlertExtra(null, false))
        }
      })
      .catch(error => {
        if (!!error.response) {
          if (error.response.status === 403) {
            dispatch(
              addAlertItem("Brak więcej firm w danej kategorii.", "blue")
            )
          } else if (error.response.status === 401) {
            dispatch(logout())
          } else {
            dispatch(addAlertItem("Błąd podczas pobierania firm.", "red"))
          }
        }
        if (page === 1) {
          dispatch(changeLoadingPlaces(false))
          dispatch(resetPlaces())
        } else {
          dispatch(changeAlertExtra(null, false))
        }
      })
  }
}

export const fetchAllMapsMarks = (
  type = 1,
  sorts,
  filters,
  localization,
  selectedName,
  district
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Ładowanie znaczników na mapę", true))

    return axios
      .post(`${Site.serverUrl}/all-map-marks`, {
        type: !!type ? type : 1,
        sorts: sorts,
        filters: filters,
        localization: localization,
        selectedName: selectedName,
        district: district,
      })
      .then(response => {
        dispatch(
          updateGeolocationMarks(
            response.data.geolocation,
            response.data.mapMarks
          )
        )
        dispatch(changeAlertExtra(null, false))
        if (response.data.mapMarks.length > 500) {
          dispatch(
            addAlertItem(
              "Uwaga pobrano 500 wyników na mapę. Użyj filtrów aby znależć najbardziej odpowiadające wyniki.",
              "blue"
            )
          )
        }
      })
      .catch(error => {
        if (!!error.response) {
          dispatch(addAlertItem("Błąd podczas znaczników na mapie.", "red"))
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchUserReserwations = token => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie rezerwacji", true))
    return axios
      .get(`${Site.serverUrl}/user-reserwations`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(updateUserReserwations(response.data.reserwations))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania rezerwacji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchUserReserwationsAll = (
  token,
  yearPicker,
  monthPicker,
  onlyToOpinion
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie wszystkich rezerwacji", true))
    return axios
      .post(
        `${Site.serverUrl}/user-reserwations-all`,
        {
          yearPicker: yearPicker,
          monthPicker: monthPicker,
          onlyToOpinion: onlyToOpinion,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(updateUserReserwations(response.data.reserwations))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania rezerwacji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchGetWorkerWorkingHours = (
  token,
  companyId,
  workerId,
  year,
  month
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-workers-working-hours`,
        {
          companyId: companyId,
          workerId: workerId,
          year: year,
          month: month,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        const dataWorkingHours = {
          constWorkingHours: response.data.constWorkingHours,
          noConstWorkingHours: response.data.noConstWorkingHours,
          daysOff: response.data.daysOff,
          openingDays: response.data.openingDays,
          reservationEveryTime: response.data.reservationEveryTime,
        }
        dispatch(changeWorkerHours(dataWorkingHours))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania godzin pracy", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
      })
  }
}

export const fetchGetOwnerWorkingHours = (token, companyId, year, month) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-owner-working-hours`,
        {
          companyId: companyId,
          year: year,
          month: month,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        const dataWorkingHours = {
          constWorkingHours: response.data.constWorkingHours,
          noConstWorkingHours: response.data.noConstWorkingHours,
          daysOff: response.data.daysOff,
          openingDays: response.data.openingDays,
          reservationEveryTime: response.data.reservationEveryTime,
        }
        dispatch(changeWorkerHours(dataWorkingHours))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania godzin rpacy", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
      })
  }
}

export const fetchWorkerReserwationsAll = (
  token,
  workerUserId,
  yearPicker,
  monthPicker,
  companyId,
  isAdmin
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/worker-reserwations-all`,
        {
          workerUserId: workerUserId,
          yearPicker: yearPicker,
          monthPicker: monthPicker,
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if (!!isAdmin) {
          dispatch(
            fetchGetOwnerWorkingHours(token, companyId, yearPicker, monthPicker)
          )
        } else {
          dispatch(
            fetchGetWorkerWorkingHours(
              token,
              companyId,
              workerUserId,
              yearPicker,
              monthPicker
            )
          )
        }
        dispatch(updateWorkerReserwations(response.data.reserwations))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania rezerwacji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDoReserwationWorker = (
  token,
  workerUserId,
  companyId,
  dateStart,
  dateEnd,
  dateFull,
  reserwationMessage,
  yearPicker,
  monthPicker
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-reserwation-worker`,
        {
          workerUserId: workerUserId,
          companyId: companyId,
          dateStart: dateStart,
          dateEnd: dateEnd,
          dateFull: dateFull,
          reserwationMessage: reserwationMessage,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Dokonano rezerwacje czasu.", "green"))
        dispatch(changeSpinner(false))
        dispatch(addReserwationWorkerDate(response.data.reserwation))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas robienia rezerwacji czasu lub konto firmowe jest nieaktywne",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeleteReserwation = (
  token,
  reserwationId,
  canceled = null,
  companyName = ""
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Aktualizacja rezerwacji", true))
    return axios
      .patch(
        `${Site.serverUrl}/update-reserwation`,
        {
          reserwationId: reserwationId,
          canceled: canceled,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(updateUserOneReserwation(reserwationId, companyName))
        dispatch(addAlertItem("Zaktualizowano rezerwację.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji rezerwacji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchUpdateWorkerReserwation = (
  token,
  workerUserId,
  reserwationId,
  canceled = null,
  changed = null,
  noFinished = null,
  yearPicker,
  monthPicker,
  companyId,
  newTimeStart,
  newTimeEnd,
  workerSelectedUserId,
  dateReserwation = null
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/update-reserwation-worker`,
        {
          workerUserId: workerUserId,
          reserwationId: reserwationId,
          canceled: canceled,
          changed: changed,
          noFinished: noFinished,
          newTimeStart: newTimeStart,
          newTimeEnd: newTimeEnd,
          workerSelectedUserId: workerSelectedUserId,
          dateReserwation: dateReserwation,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if (
          !!canceled ||
          workerUserId !==
            (!!workerSelectedUserId ? workerSelectedUserId : workerUserId)
        ) {
          dispatch(deleteReserwationWorkerDate(reserwationId))
        } else {
          dispatch(
            updateReserwationWorkerDate(
              reserwationId,
              changed,
              noFinished,
              newTimeStart,
              newTimeEnd,
              workerSelectedUserId,
              dateReserwation
            )
          )
        }
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano rezerwację.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji rezerwacji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateUserAlert = token => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/update-user-alert`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(resetUserAlerts())
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji powiadomień", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchGetMoreAlerts = (token, page) => {
  return dispatch => {
    dispatch(changeAlertExtra("Ładowanie alertów", true))
    return axios
      .post(
        `${Site.serverUrl}/get-more-alerts`,
        {
          page: page,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addNewAlerts(response.data.newAllerts))
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji powiadomień", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchworkerUsersInformations = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-reserwations`,
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
        dispatch(changeSpinner(false))
        dispatch(newWorkerUsersInformations(response.data.reserwations))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas ładowania infromacji o klientach",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchworkerUsersMoreInformationsHistory = (
  token,
  companyId,
  userSelectedId,
  page
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie informacji o kliencie", true))
    return axios
      .post(
        `${Site.serverUrl}/get-selected-users-reserwations`,
        {
          companyId: companyId,
          userSelectedId: userSelectedId,
          page: page + 1,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(
          newWorkerUsersHistoryInformations(
            response.data.reserwations,
            userSelectedId
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas ładowania historii klienta", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchworkerUsersMoreInformationsMessage = (
  token,
  companyId,
  selectedUserId,
  page
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie informacji o kliencie", true))
    return axios
      .post(
        `${Site.serverUrl}/get-more-company-user-informations-messages`,
        {
          companyId: companyId,
          selectedUserId: selectedUserId,
          page: page,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(
          newWorkerUsersMessageInformations(
            response.data.newMessages,
            selectedUserId
          )
        )
      })
      .catch(error => {
        dispatch(changeAlertExtra(null, false))
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas ładowania historii klienta", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchCompanyUsersInformationsBlock = (
  token,
  companyId,
  selectedUserId,
  isBlocked
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Blokowanie użytkownika", true))
    return axios
      .post(
        `${Site.serverUrl}/company-users-informations-block`,
        {
          companyId: companyId,
          selectedUserId: selectedUserId,
          isBlocked: isBlocked,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        dispatch(newWorkerUsersInformationsBlock(selectedUserId, isBlocked))
        if (!!isBlocked) {
          dispatch(
            addAlertItem("Konto zostało zablokowane na stronie.", "green")
          )
        } else {
          dispatch(
            addAlertItem("Konto zostało odblokowane na stronie.", "green")
          )
        }
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas blokowania użytkownika", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchCompanyUsersInformationsMessage = (
  token,
  companyId,
  selectedUserId,
  workerMessage
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-company-users-informations-message`,
        {
          companyId: companyId,
          workerMessage: workerMessage,
          selectedUserId: selectedUserId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addNewMessageToUserInformation(selectedUserId, response.data.message)
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano wiadomość o kliencie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd dodawania wiadomości o kliencie", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyUsersInformationsDeleteMessage = (
  token,
  companyId,
  selectedUserId,
  messageId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/delete-selected-users-informations-message`,
        {
          companyId: companyId,
          selectedUserId: selectedUserId,
          messageId: messageId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(deleteMessageToUserInformation(selectedUserId, messageId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto wiadomość o kliencie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd dodawania wiadomości i klienicie", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCustomUserPhone = (token, selectedUserId, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/get-custom-user-phone`,
        {
          selectedUserId: selectedUserId,
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          addPhoneToWorkerUserInformation(
            selectedUserId,
            response.data.userPhone
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUserInformations = (token, companyId, userSelectedId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/get-selected-users-informations-message`,
        {
          companyId: companyId,
          userSelectedId: userSelectedId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addToUserInformations(userSelectedId, response.data.message))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas ładowania historii klienta", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSelectedUserReserwations = (
  token,
  userSelectedId,
  companyId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/get-selected-users-reserwations`,
        {
          companyId: companyId,
          userSelectedId: userSelectedId,
          page: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          addSelectedUserReserwations(
            userSelectedId,
            response.data.reserwations
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas ładowania rezerwacji klienta", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveCompanyServices = (token, companyId, services) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-services-patch`,
        {
          companyId: companyId,
          services: services,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        if (!!services.new) {
          if (services.new.length > 0) {
            dispatch(
              addAlertItem(
                "Zaktualizowano usługi, nie zapomnij przypisać pracownika do dodanych usług.",
                "blue"
              )
            )
          }
        } else {
          dispatch(addAlertItem("Zaktualizowano usługi.", "green"))
        }
        dispatch(
          patchNewCompanyServices(
            response.data.services,
            response.data.ownerDataServices,
            response.data.workers,
            response.data.promotions,
            response.data.happyHoursConst,
            response.data.companyStamps
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktualizacji usług", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveCompanySettings = (token, companyId, dataSettings) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-settings-patch`,
        {
          companyId: companyId,
          dataSettings: dataSettings,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addAlertItem("Zaktualizowano ustawienia działalności", "green")
        )
        dispatch(changeSpinner(false))
        dispatch(companyPatchSettings(dataSettings))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji ustawień firmy", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveWorkerProps = (
  token,
  companyId,
  dateProps = null,
  constTime = null
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-workers-save-props`,
        {
          companyId: companyId,
          dateProps: dateProps,
          constTime: constTime,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        if (!!dateProps) {
          dispatch(companyPatchWorkerSettings(dateProps))
        }
        if (!!constTime) {
          dispatch(companyPatchWorkerContTime(constTime))
        }
        dispatch(addAlertItem("Zaktualizowano pracownika.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji pracownika", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchGetWorkerNoConstData = (
  token,
  companyId,
  workerId,
  year,
  month
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-workers-no-const-data`,
        {
          companyId: companyId,
          workerId: workerId,
          year: year,
          month: month,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          companyPatchWorkerNoConstHours(
            workerId,
            response.data.noConstWorkingHours
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania godzin pracy pracownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
      })
  }
}

export const fetchGetOwnerNoConstData = (
  token,
  companyId,
  year,
  month,
  ownerId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-owner-no-const-data`,
        {
          companyId: companyId,
          year: year,
          month: month,
          ownerId: ownerId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          companyPatchWorkerNoConstHours(
            "owner",
            response.data.noConstWorkingHours
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania godzin pracy pracownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
      })
  }
}

export const addNewNoConstHour = (token, companyId, workerId, newDate) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-workers-add-no-const-data`,
        {
          companyId: companyId,
          workerId: workerId,
          newDate: newDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          companyAddWorkerNoConstHours(workerId, response.data.noConstantDay)
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania godzin pracy pracownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const deleteNoConstHour = (
  token,
  companyId,
  workerId,
  noConstDateId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-workers-delete-no-const-data`,
        {
          companyId: companyId,
          workerId: workerId,
          noConstDateId: noConstDateId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(companyDeleteWorkerNoConstHours(workerId, noConstDateId))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania godzin pracy pracownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveTextsCompany = (
  token,
  companyId,
  textAboutUs = null,
  textReserwation = null,
  links = null
) => {
  return dispatch => {
    const allTextsCompany = {
      textAboutUs: textAboutUs,
      textReserwation: textReserwation,
      links: links,
    }
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-teksts-update`,
        {
          companyId: companyId,
          allTextsCompany: allTextsCompany,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(updateComanyTeksts(allTextsCompany))
        dispatch(addAlertItem("Zaktualizowano tekst", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktaulizacji tekstu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveOpeningHoursCompany = (
  token,
  companyId,
  openingHours = null,
  daysOff = null
) => {
  return dispatch => {
    const openingHoursCompany = {
      openingHours: openingHours,
      daysOff: daysOff,
    }
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-opening-hours-update`,
        {
          companyId: companyId,
          openingHoursCompany: openingHoursCompany,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(updateOpeningHoursCompany(openingHours, daysOff))
        dispatch(addAlertItem("Zaktualizowano godziny otwarcia.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji godzin otwarcia", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveMaps = (token, companyId, maps) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-map-update`,
        {
          companyId: companyId,
          maps: maps,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyMaps(maps))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano mapę.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktualizacji mapy", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddConstDateHappyHour = (token, companyId, constDate) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/add-const-date-happy-hour`,
        {
          companyId: companyId,
          constDate: constDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyHappyHoursConst(response.data.happyHoursConst))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano happy hour.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania kappy hour", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddPromotion = (token, companyId, promotionDate) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/add-promotion`,
        {
          companyId: companyId,
          promotionDate: promotionDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyPromotions(response.data.promotions))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano promocję.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania promocji", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeleteConstHappyHour = (token, companyId, happyHourId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/delete-const-date-happy-hour`,
        {
          companyId: companyId,
          happyHourId: happyHourId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(deleteCompanyHappyHoursConst(happyHourId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto happy hour.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania happy hour", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateConstDateHappyHour = (token, companyId, constDate) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/update-const-date-happy-hour`,
        {
          companyId: companyId,
          constDate: constDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyHappyHourConstPatch(constDate))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano happy hour.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji happy hour", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeletePromotion = (token, companyId, promotionId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/delete-promotion`,
        {
          companyId: companyId,
          promotionId: promotionId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(deleteCompanyPromotion(promotionId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto promocję.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania promocji", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdatePromotion = (token, companyId, promotionDate) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/update-promotion`,
        {
          companyId: companyId,
          promotionDate: promotionDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyPathPromotion(promotionDate))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zatualizowano promocję.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji promocji", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddOpinion = (token, opinionData, company) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addNewOpinionToReserwation(
            opinionData.reserwationId,
            response.data.opinion.opinionId,
            company,
            opinionData.company
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(
                addAlertItem(
                  "Nie można wystawić więcej niż 10 opinii w ciągu miesiąca",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateEditedOpinion = (token, opinionData, company) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-edited-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addEditedOpinionToReserwation(
            opinionData.reserwationId,
            opinionData.opinionEditedMessage,
            company,
            opinionData.company,
            opinionData.opinionId
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchLoadMoreOpinions = (page, companyId) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie opinii", true))
    return axios
      .post(`${Site.serverUrl}/load-more-opinions`, {
        page: page,
        companyId: companyId,
      })
      .then(response => {
        dispatch(addNewOpinionsCompany(companyId, response.data.opinions))
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchAddReplayOpinion = (token, companyId, replay, opinionId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-replay-opinion`,
        {
          companyId: companyId,
          replay: replay,
          opinionId: opinionId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addReplayToOpinion(opinionId, replay, companyId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano odpowiedz do opinii.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas dodawania odpowiedzi do opinii",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyUploadImage = (token, companyId, file, imageId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-upload-image`,
        {
          companyId: companyId,
          image: file,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyImage(companyId, response.data.imageUrl, imageId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania zdjęcia", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyDeleteImage = (token, companyId, imagePath) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-image`,
        {
          companyId: companyId,
          imagePath: imagePath,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(deleteCompanyImage(companyId, imagePath))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania zdjęcia", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyMainImage = (token, companyId, imagePath) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-main-image`,
        {
          companyId: companyId,
          imagePath: imagePath,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeCompanyMainImage(companyId, imagePath))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Ustawiono nowe główne zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas ustawiania nowego głównego zdjęcia",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUserUploadImage = (token, image) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-upload-image`,
        {
          image: image,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateUserImage(response.data.imageUrl))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania zdjęcia", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUserDeleteImage = (token, imagePath) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-delete-image`,
        {
          imagePath: imagePath,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateUserImage(""))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania zdjęcia", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUserDeleteImageOther = (token, imagePath) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-delete-image-other`,
        {
          imagePath: imagePath,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateUserImage(""))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto zdjęcie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania zdjęcia", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const companyAddStamp = (token, companyId, stampData) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-add-stamp`,
        {
          ...stampData,
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addNewCompanyStamps(companyId, response.data.newCompanyStamps))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano pieczątke.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania pieczątki", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const companyDeleteStamp = (token, companyId, stampId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-stamp`,
        {
          stampId: stampId,
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(daleteCompanyStamps(companyId, stampId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto pieczątke.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania pieczątki", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const companyUpdateStamp = (token, companyId, stampData) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-update-stamp`,
        {
          ...stampData,
          companyId: companyId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyStamps(companyId, stampData))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano pieczątke.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji pieczątki", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const addCompanyFavourites = (token, favouriteAddData) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/add-company-favourites`,
        {
          companyId: favouriteAddData._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addFavouritesCompany(favouriteAddData))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano do ulubionych.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas dodawania do ulubionych", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const deleteCompanyFavourites = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/delete-company-favourites`,
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
        dispatch(deleteFavouritesCompany(companyId))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto z ulubionych.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas usuwania z ulubionych", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const getCompanyAvailability = (token, companyId) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie stanu magazynowego", true))
    return axios
      .post(
        `${Site.serverUrl}/get-company-availability`,
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
          addUserCompanyAvailability(
            response.data.availability,
            response.data.hasPermission
          )
        )
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania stanu magazynowego",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const addCompanyAvailability = (
  token,
  companyId,
  itemName,
  itemCount
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-company-availability`,
        {
          companyId: companyId,
          itemName: itemName,
          itemCount: itemCount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addUserCompanyAvailability(response.data.availability, null))
        dispatch(addAlertItem("Zaktualizowano stan magazynowy", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania stanu magazynowego",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const deleteCompanyAvailability = (token, companyId, itemId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/delete-company-availability`,
        {
          companyId: companyId,
          itemId: itemId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(deleteUserCompanyAvailability(itemId))
        dispatch(addAlertItem("Zaktualizowano stan magazynowy", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania przedmiotu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const editCompanyAvailability = (
  token,
  companyId,
  itemId,
  itemName,
  itemCount
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/edit-company-availability`,
        {
          companyId: companyId,
          itemId: itemId,
          itemName: itemName,
          itemCount: itemCount,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(editUserCompanyAvailability(itemId, itemName, itemCount))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano stan magazynowy", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas edytowania przedmiotu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveShopStore = (
  token,
  companyId,
  newCategorys,
  editedCategory,
  deletedCategory
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/edit-company-shop-store`,
        {
          companyId: companyId,
          newCategorys: newCategorys,
          editedCategory: editedCategory,
          deletedCategory: deletedCategory,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(saveEditedCompanyShopStore(response.data.shopStore))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano stan sklepu.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas edytowania stanu sklepu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyStaticts = (token, companyId, months, year) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/get-company-statistics`,
        {
          companyId: companyId,
          months: months,
          year: year,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          saveCompanyStats(
            response.data.stats,
            response.data.services,
            response.data.raportSMS,
            response.data.raportServices,
            response.data.raportCommunitings
          )
        )
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas pobierania statystyk", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentCodeConfirmDelete = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-sent-code-delete-company`,
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
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Wysłano na e-maila kod do usunięcia działalności.",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania na adres e-mail kodu do usunięcia działalności",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchConfirmDelete = (token, companyId, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-company`,
        {
          companyId: companyId,
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(confirmDeleteCompany(false))
        dispatch(deleteCompanyUser(companyId))
        dispatch(addAlertItem("Usunięto działalność.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 422) {
              dispatch(
                addAlertItem(
                  "Nieprawidłowy kod do usunięcia działalności",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas usuwania działalności", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchConfirmDeleteCreatedCompany = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-created-company`,
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
        dispatch(changeSpinner(false))
        dispatch(deleteCompanyUser(companyId))
        dispatch(addAlertItem("Usunięto działalność.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas usuwania działalności", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentCodeConfirmDeleteAccount = token => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-sent-code-delete-account`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Wysłano na e-maila kod do usunięcia konta.", "green")
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania na adres e-mail kodu do usunięcia konta",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentCodeConfirmVerifiedPhone = token => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-sent-code-verified-phone`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          changeUserBlockSmsSend(response.data.blockUserSendVerifiedPhoneSms)
        )
        dispatch(
          addAlertItem(
            "Wysłano na telefon kod potwierdzenia numeru telefonu.",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 423) {
              dispatch(
                addAlertItem(
                  "Nie można teraz wysłać kodu do aktywacji numeru telefonu",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania na adres telefon kodu do potwierdzenia numeru telefonu",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeleteAccount = (token, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/delete-user-account`,
        {
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        changeUserProfilVisible(false)
        dispatch(changeSpinner(false))
        localStorage.removeItem("USERID")
        localStorage.removeItem("TOKEN")
        dispatch(changeLogout())
        dispatch(addAlertItem("Usunięto konto.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 422) {
              dispatch(addAlertItem("Błędny kod do usunięcia konta", "red"))
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania konta", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchVerifiedPhone = (token, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/verified-user-phone`,
        {
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(veryfiedUserPhone(response.data.token))
        dispatch(addAlertItem("Zweryfikowano numer telefonu.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 423) {
              dispatch(addAlertItem("Numer telefonu jest zajęty", "red"))
            } else if (error.response.status === 422) {
              dispatch(
                addAlertItem(
                  "Błędny kod do zweryfikowania numeru telefonu",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas weryfikacji numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchNewOrder = (token, companyId, coinsIds) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/payment-session`,
        {
          companyId: companyId,
          coinsIds: coinsIds,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addCheckoutId(response.data.paymentItem))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas dokonywania płatności", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const getCompanyTransactionHistory = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-history-transaction`,
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
        dispatch(addCompanyTransactionHistory(response.data.companyPayments))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania histori tranzakcji",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const getCoinsOffer = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .get(`${Site.serverUrl}/get-coins-offer`)
      .then(response => {
        dispatch(addCoinsOffer(response.data.coinsOffer))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania ofert ze sklepu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const sendInvoiceToCompanyEmail = (token, companyId, invoiceId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/send-invoice-to-company`,
        {
          companyId: companyId,
          invoiceId: invoiceId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania faktury vat na adres e-mail firmy",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSaveCompanySMS = (
  token,
  companyId,
  smsReserwationAvaible = false,
  smsReserwationChangedUserAvaible = false,
  smsNotifactionAvaible = false,
  smsCanceledAvaible = false,
  smsChangedAvaible = false,
  smsServiceCreatedAvaible = false,
  smsServiceChangedAvaible = false,
  smsServiceFinishedAvaible = false,
  smsServiceCanceledAvaible = false,
  smsCommunitingNotificationAvaible = false,
  smsCommunitingCreatedAvaible = false,
  smsCommunitingChangedAvaible = false,
  smsCommunitingCanceledAvaible = false
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-sms-update`,
        {
          companyId: companyId,
          smsReserwationAvaible: smsReserwationAvaible,
          smsReserwationChangedUserAvaible: smsReserwationChangedUserAvaible,
          smsNotifactionAvaible: smsNotifactionAvaible,
          smsCanceledAvaible: smsCanceledAvaible,
          smsChangedAvaible: smsChangedAvaible,
          smsServiceCreatedAvaible: smsServiceCreatedAvaible,
          smsServiceChangedAvaible: smsServiceChangedAvaible,
          smsServiceFinishedAvaible: smsServiceFinishedAvaible,
          smsServiceCanceledAvaible: smsServiceCanceledAvaible,
          smsCommunitingNotificationAvaible: smsCommunitingNotificationAvaible,
          smsCommunitingCreatedAvaible: smsCommunitingCreatedAvaible,
          smsCommunitingChangedAvaible: smsCommunitingChangedAvaible,
          smsCommunitingCanceledAvaible: smsCommunitingCanceledAvaible,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          updateCompanySMSSettings(
            smsReserwationAvaible,
            smsReserwationChangedUserAvaible,
            smsNotifactionAvaible,
            smsCanceledAvaible,
            smsChangedAvaible,
            smsServiceCreatedAvaible,
            smsServiceChangedAvaible,
            smsServiceFinishedAvaible,
            smsServiceCanceledAvaible,
            smsCommunitingNotificationAvaible,
            smsCommunitingCreatedAvaible,
            smsCommunitingChangedAvaible,
            smsCommunitingCanceledAvaible
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano ustawienia sms.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji ustawień sms", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSendSMSCompanyClients = (
  token,
  companyId,
  allClients = false,
  selectedClients = [],
  textMessage = ""
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/company-sms-send-clients`,
        {
          companyId: companyId,
          allClients: allClients,
          selectedClients: selectedClients,
          textMessage: textMessage,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Wysłano wiadomości SMS.", "green"))
        dispatch(actualizationSMSCompanyClients(response.data.countMessages))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 441) {
              dispatch(addAlertItem("Niewystarczająca ilość SMS", "red"))
            } else {
              dispatch(
                addAlertItem("Błąd podczas wysyłania wiadomości SMS", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyMarker = companyId => {
  return dispatch => {
    dispatch(changeAlertExtra("Ładowanie danych firmy", true))
    dispatch(changeCompanyMarker(null))
    return axios
      .post(`${Site.serverUrl}/company-marker`, {
        companyId: companyId,
      })
      .then(response => {
        dispatch(changeCompanyMarker(response.data.companyMarker))
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            dispatch(addAlertItem("Błąd podczas ładowania danych firmy", "red"))
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchAddReport = (
  token,
  companyId,
  reportValue,
  opinionId = null
) => {
  return dispatch => {
    if (!!opinionId) {
      dispatch(changeAlertExtra("Raportowanie opinii", true))
    } else {
      dispatch(changeAlertExtra("Raportowanie firmy", true))
    }
    return axios
      .post(
        `${Site.serverUrl}/company-report`,
        {
          companyId: companyId,
          reportValue: reportValue,
          opinionId: opinionId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        if (!!opinionId) {
          dispatch(addAlertItem("Zgłoszono opinie.", "green"))
        } else {
          dispatch(addAlertItem("Zgłoszono firmę.", "green"))
        }
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(
                addAlertItem(
                  "Nie można dokonać reportu więcej niż 3 razy dziennie",
                  "red"
                )
              )
            } else {
              if (!!opinionId) {
                dispatch(
                  addAlertItem("Błąd podczas raportowania opinii", "red")
                )
              } else {
                dispatch(addAlertItem("Błąd podczas raportowania firmy", "red"))
              }
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchNotificationEndpoint = (token, endpoint) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/save-notification-endpoint`,
        {
          endpoint: endpoint,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {})
      .catch(error => {})
  }
}

export const fetchAddCompanyLink = (token, companyId, pathValue) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-add-link`,
        {
          companyId: companyId,
          pathValue: pathValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano link firmowy.", "green"))
        dispatch(updateCompanyPath(pathValue))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Link jest zajęty", "red"))
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania linku", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyUpdateNip = (token, companyId, nipValue) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-update-nip`,
        {
          companyId: companyId,
          nipValue: nipValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          updateCompanyNip(response.data.nip, response.data.dataToInvoice)
        )
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Zaktualizowano NIP firmowy oraz informacje działalności.",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Numer NIP jest niepoprawny", "red"))
            } else if (error.response.status === 441) {
              dispatch(
                addAlertItem(
                  "Nie można teraz zaktualizować numeru NIP. Spróbuj ponownie póżniej.",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji numeru NIP", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyUpdateNipInfo = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-update-nip-info`,
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
          updateCompanyNip(response.data.nip, response.data.dataToInvoice)
        )
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Zaktualizowano informacje działalności.", "green")
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Numer NIP jest niepoprawny", "red"))
            } else if (error.response.status === 441) {
              dispatch(
                addAlertItem(
                  "Nie można teraz zaktualizować numeru NIP. Spróbuj ponownie póżniej.",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas aktualizacji numeru NIP", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateDefaultCompany = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-update-default-company`,
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
        dispatch(changeSpinner(false))
        dispatch(updateDefaultCompany(companyId))
        dispatch(addAlertItem("Zaktualizowano domyślną działalność.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas aktualizacji domyślnej działalności",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddService = (
  token,
  companyId,
  nameInput,
  surnameInput,
  isActiveUser,
  phoneInput,
  objectInput,
  descriptionInput,
  costInput,
  statusValue,
  email,
  workerUserId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-add-service`,
        {
          companyId: companyId,
          name: !!nameInput ? nameInput : null,
          surname: !!surnameInput ? surnameInput : null,
          isActiveUser: isActiveUser,
          phone: phoneInput,
          objectName: objectInput,
          description: descriptionInput,
          cost: !!costInput ? costInput : null,
          statusValue: statusValue,
          email: !!email ? email : null,
          workerUserId: workerUserId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyServices(response.data.newService))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano usługę.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Nie znaleziono użytkownika", "red"))
            } else if (error.response.status === 441) {
              dispatch(
                addAlertItem(
                  "Nie można dodać serwisu do uzytkownika, który pracuje w działalności",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania usługi", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchGetCompanyServices = (
  token,
  companyId,
  year,
  month,
  workerUserId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-get-services`,
        {
          companyId: companyId,
          year: year,
          month: month,
          workerUserId: workerUserId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          addCompanyServices(response.data.services, response.data.workers)
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas pobierania usług", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyDeleteService = (token, companyId, serviceId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-service`,
        {
          companyId: companyId,
          serviceId: serviceId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto usługę", "green"))
        dispatch(deleteCompanyServices(serviceId))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania usługi", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateCompanyService = (
  token,
  companyId,
  serviceId,
  descriptionInput,
  objectInput,
  costInput,
  selectedWorkerUserId,
  statusValue
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-update-service`,
        {
          companyId: companyId,
          serviceId: serviceId,
          objectName: objectInput,
          description: descriptionInput,
          cost: !!costInput ? costInput : null,
          statusValue: statusValue,
          selectedWorkerUserId: selectedWorkerUserId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          updateServiceCompanyServices({
            serviceId: serviceId,
            objectName: objectInput,
            description: descriptionInput,
            cost: !!costInput ? costInput : null,
            statusValue: statusValue,
            selectedWorkerUserId: selectedWorkerUserId,
          })
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano serwis.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktualizacji serwisu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCheckUserPhone = (token, companyId, serviceId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-get-service-user-phone`,
        {
          companyId: companyId,
          serviceId: serviceId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          updateCompanyServicePhoneUser(response.data.userPhone, serviceId)
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCheckUserPhoneCommuniting = (
  token,
  companyId,
  communitingId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-get-communiting-user-phone`,
        {
          companyId: companyId,
          communitingId: communitingId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          updateCompanyCommunitingPhoneUser(
            response.data.userPhone,
            communitingId
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem("Błąd podczas pobierania numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchGetUserHistoryServices = (token, month, year) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-history-services`,
        {
          month: month,
          year: year,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addUserHistoryServices(response.data.userServices))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania serwisów użytkownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddCommuniting = (
  token,
  companyId,
  nameInput,
  surnameInput,
  isActiveUser,
  phoneInput,
  descriptionInput,
  costInput,
  statusValue,
  email,
  workerUserId,
  cityInput,
  streetInput,
  timeStart,
  timeEnd,
  addWorkerTime,
  fullDate
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-add-communiting`,
        {
          companyId: companyId,
          name: !!nameInput ? nameInput : null,
          surname: !!surnameInput ? surnameInput : null,
          isActiveUser: isActiveUser,
          phone: phoneInput,
          description: descriptionInput,
          cost: !!costInput ? costInput : null,
          statusValue: statusValue,
          email: !!email ? email : null,
          workerUserId: workerUserId,
          cityInput: cityInput,
          streetInput: streetInput,
          timeStart: timeStart,
          timeEnd: timeEnd,
          addWorkerTime: addWorkerTime,
          fullDate: fullDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyCommunitings(response.data.newCommuniting))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano dojazd.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(addAlertItem("Nie znaleziono użytkownika", "red"))
            } else if (error.response.status === 441) {
              dispatch(
                addAlertItem(
                  "Nie można dodać dojazdu do uzytkownika, który pracuje w działalności",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania dojazdu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchGetCompanyCommunitings = (
  token,
  companyId,
  year,
  month,
  workerUserId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-get-communitings`,
        {
          companyId: companyId,
          year: year,
          month: month,
          workerUserId: workerUserId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(
          addCompanyCommunitings(
            response.data.communitings,
            response.data.workers
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas pobierania dojazdów", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCompanyDeleteCommuniting = (
  token,
  companyId,
  communitingId,
  reserwationId,
  opinionId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-delete-communiting`,
        {
          companyId: companyId,
          communitingId: communitingId,
          reserwationId: reserwationId,
          opinionId: opinionId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Usunięto dojazd", "green"))
        dispatch(deleteCompanyCommuniting(communitingId))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas usuwania usługi", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateCompanyCommuniting = (
  token,
  companyId,
  communitingId,
  descriptionInput,
  costInput,
  selectedWorkerUserId,
  statusValue,
  timeStart,
  timeEnd,
  fullDate,
  reserwationId
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/company-update-communiting`,
        {
          companyId: companyId,
          communitingId: communitingId,
          description: descriptionInput,
          cost: !!costInput ? costInput : null,
          statusValue: statusValue,
          selectedWorkerUserId: selectedWorkerUserId,
          timeStart: timeStart,
          timeEnd: timeEnd,
          fullDate: fullDate,
          reserwationId: reserwationId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if (statusValue === 4) {
          dispatch(deleteCompanyCommuniting(communitingId))
        } else {
          dispatch(
            updateServiceCompanyCommuniting({
              communitingId: communitingId,
              description: descriptionInput,
              cost: !!costInput ? costInput : null,
              statusValue: statusValue,
              selectedWorkerUserId: selectedWorkerUserId,
              timeStart: timeStart,
              timeEnd: timeEnd,
              fullDate: fullDate,
            })
          )
        }
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Zaktualizowano dojazd.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktualizacji dojazdu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchGetUserHistoryCommuniting = (token, month, year) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-history-communiting`,
        {
          month: month,
          year: year,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addUserHistoryCommunitings(response.data.userCommuniting))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas pobierania dojazdów użytkownika",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUserCancelCommunity = (token, communityId, reserwationId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/cancel-user-communiting`,
        {
          communityId: communityId,
          reserwationId: reserwationId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(cancelUserCommuniting(communityId))
        dispatch(addAlertItem("Odwołano dojazd", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas aktualizacji dojazdu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddOpinionCommuniting = (token, opinionData, company) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addNewOpinionToCommuniting(
            opinionData.communitingId,
            response.data.opinion.opinionId,
            company,
            opinionData.company
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(
                addAlertItem(
                  "Nie można wystawić więcej niż 10 opinii w ciągu miesiąca",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateEditedOpinionCommuniting = (
  token,
  opinionData,
  company
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-edited-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addEditedOpinionToCommuniting(
            opinionData.communitingId,
            opinionData.opinionEditedMessage,
            company,
            opinionData.company,
            opinionData.opinionId
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddOpinionService = (token, opinionData, company) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addNewOpinionToService(
            opinionData.serviceId,
            response.data.opinion.opinionId,
            company,
            opinionData.company
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 440) {
              dispatch(
                addAlertItem(
                  "Nie można wystawić więcej niż 10 opinii w ciągu miesiąca",
                  "red"
                )
              )
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateEditedOpinionService = (
  token,
  opinionData,
  company
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-edited-opinion`,
        {
          opinionData: opinionData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          addEditedOpinionToService(
            opinionData.serviceId,
            opinionData.opinionEditedMessage,
            company,
            opinionData.company,
            opinionData.opinionId
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania opinii", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDownloadCommuniting = communitingId => {
  return dispatch => {
    dispatch(changeSpinner(true))
    dispatch(updateDownloadCommuniting(null))
    return axios
      .post(`${Site.serverUrl}/download-communiting`, {
        communitingId: communitingId,
      })
      .then(response => {
        dispatch(updateDownloadCommuniting(response.data.communiting))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Nie znaleziono dojazdu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchDownloadService = serviceId => {
  return dispatch => {
    dispatch(changeSpinner(true))
    dispatch(updateDownloadService(null))
    return axios
      .post(`${Site.serverUrl}/download-service`, {
        serviceId: serviceId,
      })
      .then(response => {
        dispatch(updateDownloadService(response.data.service))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Nie znaleziono dojazdu", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchAddWorkerClientReserwation = (
  token,
  companyId,
  dateStart,
  dateEnd,
  dateFull,
  reserwationMessage,
  selectedWorkerUserId,
  selectedServiceId,
  isActiveUser,
  phone,
  name,
  surname,
  email,
  activePromotion,
  activeHappyHour
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/add-worker-client-reserwation`,
        {
          companyId: companyId,
          dateStart: dateStart,
          dateEnd: dateEnd,
          dateFull: dateFull,
          reserwationMessage: reserwationMessage,
          selectedWorkerUserId: selectedWorkerUserId,
          selectedServiceId: selectedServiceId,
          isActiveUser: isActiveUser,
          phone: phone,
          name: name,
          surname: surname,
          email: email,
          activePromotion: activePromotion,
          activeHappyHour: activeHappyHour,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Dodano rezerwację.", "green"))
        dispatch(addWorkerClientReserwationDate(response.data.reserwation))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(addAlertItem("Błąd podczas dodawania rezerwacji", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateUserProps = (token, language, darkMode, blindMode) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/update-user-props`,
        {
          language: language,
          darkMode: darkMode,
          blindMode: blindMode,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {})
      .catch(() => {})
  }
}

export const fetchUpdateCompanyPhone = (
  token,
  companyId,
  newPhone,
  password
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-company-phone`,
        {
          companyId: companyId,
          newPhone: newPhone,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyPhone(companyId, newPhone))
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Wysłano kod aktywacyjny na podany numer telefonu",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 442) {
              dispatch(
                addAlertItem(
                  "Numer telefonu jest takie samo jak poprzednie",
                  "red"
                )
              )
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Numer telefonu zajęty", "red"))
            } else {
              dispatch(
                addAlertItem("Błąd podczas zmiany numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCancelUpdateCompanyPhone = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/cancel-update-company-phone`,
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
        dispatch(changeSpinner(false))
        dispatch(cancelUpdateCompanyPhone(companyId))
        dispatch(addAlertItem("Anulowano zmianę numeru telefonu", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas anulowania zmiany numeru telefonu",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchCancelUpdateCompanyEmail = (token, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/cancel-update-company-email`,
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
        dispatch(changeSpinner(false))
        dispatch(cancelUpdateCompanyEmail(companyId))
        dispatch(addAlertItem("Anulowano zmianę adresu email", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas anulowania zmiany adresu email",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateCompanyPhoneVeryfiedCode = (token, companyId, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-company-phone-veryfied-code`,
        {
          companyId: companyId,
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyPhoneSuccess(companyId, response.data.newPhone))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Numer telefonu został zmieniony", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Błędny kod", "red"))
            } else {
              dispatch(
                addAlertItem("Błąd podczas zmiany numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateCompanyEmail = (
  token,
  companyId,
  newEmail,
  password
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-company-email`,
        {
          companyId: companyId,
          newEmail: newEmail,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyEmail(companyId, newEmail))
        dispatch(changeSpinner(false))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Podany adres email jest zajęty.", "red"))
            } else {
              dispatch(
                addAlertItem("Błąd podczas zmiany numeru telefonu", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentAgainCompanyActivedNewEmail = (token, companyId) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/company-sent-again-verification-new-email`,
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
          updateBlockSendVerifiedEmail(
            companyId,
            response.data.blockSendVerifiedEmail
          )
        )
        dispatch(
          addAlertItem(
            "Pomyślnie wysłano kod aktywacyjny do aktywowania konto firmowe na podany adres email",
            "green"
          )
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania kodu aktywującego konto firmowe",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
      })
  }
}

export const fetchUpdateCompanyEmailVeryfiedCode = (token, companyId, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/update-company-email-veryfied-code`,
        {
          companyId: companyId,
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updateCompanyEmailSuccess(companyId, response.data.newEmail))
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Adres email został zmieniony", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 443) {
              dispatch(addAlertItem("Błędny kod", "red"))
            } else if (error.response.status === 442) {
              dispatch(addAlertItem("Adres email jest zajęty", "red"))
            } else {
              dispatch(addAlertItem("Błąd podczas zmiany adresu email", "red"))
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchVerifiedEmail = (token, code) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/verified-user-email`,
        {
          code: code,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(veryfiedUserEmail(response.data.token))
        dispatch(addAlertItem("Zweryfikowano adres e-mail.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 423) {
              dispatch(addAlertItem("Adres e-mail jest zajęty", "red"))
            } else if (error.response.status === 422) {
              dispatch(
                addAlertItem(
                  "Błędny kod do zweryfikowania adresu e-mail",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem("Błąd podczas weryfikacji adresu e-mail", "red")
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchSentCodeConfirmVerifiedEmail = token => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-sent-code-verified-email`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(changeBlockUserChangeEmail(response.data.blockUserChangeEmail))
        dispatch(
          addAlertItem("Wysłano na adres e-mail kod potwierdzenia.", "green")
        )
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else if (error.response.status === 423) {
              dispatch(
                addAlertItem(
                  "Nie można teraz wysłać kodu do aktywacji adresu e-mail",
                  "red"
                )
              )
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas wysyłania na adres e-mail kodu do potwierdzenia",
                  "red"
                )
              )
            }
          } else {
            dispatch(addAlertItem("Brak internetu.", "red"))
          }
        }
        dispatch(changeSpinner(false))
      })
  }
}
