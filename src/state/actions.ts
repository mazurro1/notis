import axios from "axios"
import { Site } from "@common/Site"
import { Dispatch } from "redux"

// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
export const DISABLE_FETCH_ACTIONS = "DISABLE_FETCH_ACTIONS"
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

export const disableFetchactions = (data: any) => {
  return {
    type: DISABLE_FETCH_ACTIONS,
    data: data,
  }
}

export const updateDownloadService = (service: any) => {
  return {
    type: UPDATE_DOWNLOADED_SERVICE,
    service: service,
  }
}

export const updateDownloadCommuniting = (communiting: any) => {
  return {
    type: UPDATE_DOWNLOADED_COMMUNITING,
    communiting: communiting,
  }
}

export const fetchResetUserMenu = (value: any) => {
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

export const cancelUserCommuniting = (communityId: any) => {
  return {
    type: CANCEL_USER_COMMUNITING,
    communityId: communityId,
  }
}

export const addUserHistoryCommunitings = (userCommunitings: any) => {
  return {
    type: ADD_USER_HISTORY_COMMUNITINGS,
    userCommunitings: userCommunitings,
  }
}

export const addUserHistoryServices = (userServices: any) => {
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

export const changeSelectedNameMenu = (value: any) => {
  return {
    type: CHANGE_SELECTED_NAME_MENU,
    value: value,
  }
}

export const changePopupTakePlace = (value: any) => {
  return {
    type: CHANGE_POPUP_TAKE_PLACE,
    value: value,
  }
}

export const changeMapsActive = (value: any) => {
  return {
    type: CHANGE_MAP_ACTIVE,
    value: value,
  }
}

export const verifiedPhoneComponent = (value: any) => {
  return {
    type: VERIFIED_PHONE_COMPONENT,
    value: value,
  }
}

export const verifiedEmailComponent = (value: any) => {
  return {
    type: VERIFIED_EMAIL_COMPONENT,
    value: value,
  }
}

export const saveUserTokenToAutoLogin = (value: any) => {
  return {
    type: ADD_TOKEN_AUTO_LOGIN_VISIBLE,
    value: value,
  }
}

export const setVisibleMenuIndustries = (value: any) => {
  return {
    type: VISIBLE_NAV_INDUSTRIES,
    value: value,
  }
}

export const setHeightMenuIndustries = (value: any) => {
  return {
    type: HEIGHT_NAV_INDUSTRIES,
    value: value,
  }
}

export const changeActiveAccount = (data: any) => {
  return {
    type: CHANGE_ACCTIVE_ACCOUNT,
    data: data,
  }
}

export const changeAlertExtra = (name: any, value: any) => {
  return {
    type: CHANGE_ALERT_EXTRA,
    name: name,
    value: value,
  }
}

export const addNewUserAlert = (data: any) => {
  return {
    type: ADD_NEW_USER_ALERT,
    data: data,
  }
}

export const changeLanguageStyle = (value: any) => {
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

export const changeCreateCompanyVisible = (value: any) => {
  return {
    type: CHANGE_CREATE_COMPANY_VISIBLE,
    value: value,
  }
}

export const changeRemindPasswordEmailSent = (value: any) => {
  return {
    type: CHANGE_REMIND_PASSWORD_EMAIL_SENT,
    value: value,
  }
}

export const changeRemindPasswordVisible = (value: any) => {
  return {
    type: CHANGE_REMIND_PASSWORD_VISIBLE,
    value: value,
  }
}

export const changeUserProfilVisible = (value: any) => {
  return {
    type: CHANGE_USER_PROFIL_VISIBLE,
    value: value,
  }
}

export const updateUserPhone = (phone: any) => {
  return {
    type: UPDATE_USER_PHONE,
    phone: phone,
  }
}

export const addUserPhone = (
  phone: number,
  email: string,
  token: string,
  phoneVerified: boolean,
  hasPhone: boolean,
  blockUserChangePhoneNumber: Date,
  blockUserSendVerifiedPhoneSms: Date,
  emailVerified: boolean,
  emailToVerified: boolean,
  blockUserChangeEmail: Date
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

export const addAlertItem = (text: string, color: string) => {
  return {
    type: ADD_ALERT_ITEM,
    text: text,
    color: color,
  }
}

export const removeAlertItem = (id: string) => {
  return {
    type: REMOVE_ALERT_ITEM,
    id: id,
  }
}

export const changeLoginVisible = (value: any) => {
  return {
    type: CHANGE_LOGIN_VISIBLE,
    value: value,
  }
}

export const changeRegistrationVisible = (value: any) => {
  return {
    type: CHANGE_REGISTRATION_VISIBLE,
    value: value,
  }
}

export const changeLoadingPlaces = (value: any) => {
  return {
    type: LOADING_PLACES,
    value: value,
  }
}

export const changeSpinner = (value: any) => {
  return {
    type: CHANGE_SPINNER,
    value: value,
  }
}

export const changeIndustries = (value: any) => {
  return {
    type: CHANGE_INDUSTRIES,
    value: value,
  }
}

export const changeLocalizationValue = (value: any, district: any) => {
  return {
    type: CHANGE_LOCALIZATION_VALUE,
    value: value,
    district: district,
  }
}

export const changeSortValue = (value: any) => {
  return {
    type: CHANGE_SORT_VALUE,
    value: value,
  }
}

export const changeFilterValue = (value: any) => {
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

export const loginUser = (user: any) => {
  return {
    type: LOGIN,
    user: user,
  }
}

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(changeSpinner(true))
    localStorage.removeItem("USERID")
    localStorage.removeItem("TOKEN")
    dispatch(addAlertItem("Zostałeś wylogowany", "red"))
    dispatch(changeSpinner(false))
    dispatch(changeLogout())
  }
}

export const saveUserTokenToLocal = (userId: string, token: string) => {
  return (dispatch: Dispatch) => {
    localStorage.removeItem("USERID")
    localStorage.removeItem("TOKEN")
    localStorage.setItem("USERID", userId)
    localStorage.setItem("TOKEN", token)
    dispatch(addAlertItem("Zapamiętano użytkownika", "green"))
  }
}

export const fetchLoginUser = (
  email: string,
  password: string,
  checkboxAutoLogin: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchRegisterUser = (
  email: string,
  name: string,
  surname: string,
  phone: number,
  password: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  noAlert: boolean = false,
  noSpinner: boolean = false,
  tokenComing: string = "",
  userIdComing: string = "",
  lastSpinnerCreateCompany: boolean = false
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchLoginFacebookUser = (token: string, id: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchLoginGoogleUser = (token: string, id: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSentAgainActivedEmail = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUserPhone = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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
  newPhone: string,
  newPassword: string,
  password: string,
  token: string,
  editPhone: boolean = false,
  newEmail: string
) => {
  return (dispatch: Dispatch) => {
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

export const fetchActiveAccount = (
  codeToVerified: number,
  token: string,
  userId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSentEmailResetPassword = (email: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchResetPassword = (
  email: string,
  password: string,
  codeReset: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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
export const ADD_NEW_PHONE_WORKER_RESERWATION =
  "ADD_NEW_PHONE_WORKER_RESERWATION"
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
export const CHANGE_VERIFIED_USER_FIELDS = "CHANGE_VERIFIED_USER_FIELDS"
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

export const updateCompanyPhoneSuccess = (
  companyId: string,
  newPhone: string
) => {
  return {
    type: UPDATE_COMPANY_PHONE_SUCCESS,
    companyId: companyId,
    newPhone: newPhone,
  }
}

export const updateCompanyEmailSuccess = (
  companyId: string,
  newEmail: string
) => {
  return {
    type: UPDATE_COMPANY_EMAIL_SUCCESS,
    companyId: companyId,
    newEmail: newEmail,
  }
}

export const cancelUpdateCompanyPhone = (companyId: string) => {
  return {
    type: CANCEL_UPDATE_COMPANY_PHONE,
    companyId: companyId,
  }
}

export const cancelUpdateCompanyEmail = (companyId: string) => {
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

export const updateCompanyPhone = (companyId: string, newPhone: string) => {
  return {
    type: UPDATE_COMPANY_PHONE,
    companyId: companyId,
    newPhone: newPhone,
  }
}

export const updateCompanyEmail = (companyId: string, newEmail: string) => {
  return {
    type: UPDATE_COMPANY_EMAIL,
    companyId: companyId,
    newEmail: newEmail,
  }
}

export const updateResetCreateCompany = (value: any) => {
  return {
    type: RESET_CREATE_COMPANY,
    value: value,
  }
}

export const fetchResetCompanyEditProfil = (value: any) => {
  return {
    type: RESET_COMPANY_EDIT_PROFIL,
    value: value,
  }
}

export const fetchUpdateStatusActiveCompanyEmail = (
  companyId: string,
  accountEmailVerified: boolean,
  codeToVerifiedPhone: number | null
) => {
  return {
    type: UPDATE_STATUS_ACTIVE_COMPANY_EMAIL,
    companyId: companyId,
    accountEmailVerified: accountEmailVerified,
    codeToVerifiedPhone: codeToVerifiedPhone,
  }
}

export const updateBlockSendVerifiedEmail = (
  companyId: string,
  blockSendVerifiedEmail: Date
) => {
  return {
    type: UPDATE_BLOCK_SEND_VERYFIED_EMAIL,
    companyId: companyId,
    blockSendVerifiedEmail: blockSendVerifiedEmail,
  }
}

export const updateBlockSendVerifiedPhoneSms = (
  companyId: string,
  blockSendVerifiedPhoneSms: Date
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

export const updateCompanyServicePhoneUser = (
  userPhone: number,
  serviceId: string
) => {
  return {
    type: UPDATE_COMPANY_SERVICE_PHONE_USER,
    userPhone: userPhone,
    serviceId: serviceId,
  }
}

export const updateCompanyCommunitingPhoneUser = (
  userPhone: number,
  communitingId: string
) => {
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

export const deleteCompanyServices = (serviceId: string) => {
  return {
    type: DELETE_COMPANY_SERVICE,
    serviceId: serviceId,
  }
}

export const deleteCompanyCommuniting = (communitingId: string) => {
  return {
    type: DELETE_COMPANY_COMMUNITING,
    communitingId: communitingId,
  }
}

export const updateServiceCompanyServices = (updatedService: any) => {
  return {
    type: UPDATE_SERVICE_COMPANY_SERVICES,
    updatedService: updatedService,
  }
}

export const updateServiceCompanyCommuniting = (updatedCommuniting: any) => {
  return {
    type: UPDATE_COMMUNITING_COMPANY_COMMUNITING,
    updatedCommuniting: updatedCommuniting,
  }
}

export const updateCompanyServices = (newService: any) => {
  return {
    type: UPDATE_COMPANY_SERVICES,
    newService: newService,
  }
}

export const updateCompanyCommunitings = (newCommunitings: any) => {
  return {
    type: UPDATE_COMPANY_COMMUNITINGS,
    newCommunitings: newCommunitings,
  }
}

export const addCompanyServices = (services: any, workers: any) => {
  return {
    type: ADD_COMPANY_SERVICES,
    services: services,
    workers: workers,
  }
}

export const addCompanyCommunitings = (communitings: any, workers: any) => {
  return {
    type: ADD_COMPANY_COMMUNITINGS,
    communitings: communitings,
    workers: workers,
  }
}

export const updateDefaultCompany = (companyId: string) => {
  return {
    type: UPDATE_DEFAULT_COMPANY,
    companyId: companyId,
  }
}

export const changeSelectedUserCompany = (companyId: string) => {
  return {
    type: CHANGE_SELECTED_USER_COMPANY,
    companyId: companyId,
  }
}

export const updateCompanyNip = (nip: number, dateInvoice: Date) => {
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

export const updateCompanyPath = (linkPath: string) => {
  return {
    type: UPDATE_COMPANY_LINK_PATH,
    linkPath: linkPath,
  }
}

export const changeListMapOffers = (value: any) => {
  return {
    type: CHANGE_LIST_MAP_OFFERS,
    value: value,
  }
}

export const changeReserwationUser = (value: any) => {
  return {
    type: CHANGE_RESERWATION_USER,
    value: value,
  }
}

export const changeCompanyMarker = (data: any) => {
  return {
    type: UPDATE_COMPANY_MARKER,
    data: data,
  }
}

export const updateGeolocationMarks = (geolocation: any, marks: any) => {
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

export const actualizationSMSCompanyClients = (countMessages: any) => {
  return {
    type: ACUTLIZATION_SMS_COMPANY_CLIENTS,
    countMessages: countMessages,
  }
}

export const deleteWorkerFromCompany = (
  companyId: string,
  workerUserId: string
) => {
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
  smsReserwationAvaible: boolean,
  smsReserwationChangedUserAvaible: boolean,
  smsNotifactionAvaible: boolean,
  smsCanceledAvaible: boolean,
  smsChangedAvaible: boolean,
  smsServiceCreatedAvaible: boolean,
  smsServiceChangedAvaible: boolean,
  smsServiceFinishedAvaible: boolean,
  smsServiceCanceledAvaible: boolean,
  smsCommunitingNotificationAvaible: boolean,
  smsCommunitingCreatedAvaible: boolean,
  smsCommunitingChangedAvaible: boolean,
  smsCommunitingCanceledAvaible: boolean
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

export const addCoinsOffer = (data: any) => {
  return {
    type: ADD_COINS_OFFER,
    data: data,
  }
}

export const addCompanyTransactionHistory = (data: any) => {
  return {
    type: ADD_COMPANY_TRANSACTION_HISTORY,
    data: data,
  }
}

export const addCheckoutId = (paymentItem: any) => {
  return {
    type: ADD_CHECKOUT_ID,
    paymentItem: paymentItem,
  }
}

export const changeUserBlockSmsSend = (date: any) => {
  return {
    type: CHANGE_USER_BLOCK_SMS_SEND,
    date: date,
  }
}

export const changeBlockUserChangeEmail = (date: any) => {
  return {
    type: CHANGE_BLOCK_USER_CHANGE_EMAIL,
    date: date,
  }
}

export const changeVerifiedUserFields = (
  changePhone: any,
  changeEmail: any
) => {
  return {
    type: CHANGE_VERIFIED_USER_FIELDS,
    changePhone: changePhone,
    changeEmail: changeEmail,
  }
}

export const errorLoadingPage = (value: any) => {
  return {
    type: ERROR_LOADING_PAGE,
    value: value,
  }
}

export const veryfiedUserPhone = (token: string) => {
  return {
    type: VERYFIED_USER_PHONE,
    token: token,
  }
}

export const veryfiedUserEmail = (token: string) => {
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

export const deleteCompanyUser = (companyId: string) => {
  return {
    type: DELETE_COMPANY_USER,
    companyId: companyId,
  }
}

export const confirmDeleteCompany = (value: any) => {
  return {
    type: CONFIRM_DELETE_COMPANY,
    value: value,
  }
}

export const updateReserwationWorkerDate = (
  reserwationId: string,
  changed: boolean,
  noFinished: boolean,
  newTimeStart: string,
  newTimeEnd: string,
  workerSelectedUserId: string,
  dateReserwation: Date
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

export const deleteReserwationWorkerDate = (dataId: string) => {
  return {
    type: DELETE_RESERWATION_WORKER_DATA,
    dataId: dataId,
  }
}

export const addReserwationWorkerDate = (data: any) => {
  return {
    type: ADD_RESERWATION_WORKER_DATA,
    data: data,
  }
}

export const addWorkerClientReserwationDate = (data: any) => {
  return {
    type: ADD_WORKER_CLIENT_RESERWATION_DATA,
    data: data,
  }
}

export const saveCompanyStats = (
  stats: any,
  services: any,
  raportSMS: any,
  raportServices: any,
  raportCommunitings: any
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

export const saveEditedCompanyShopStore = (shopStore: any) => {
  return {
    type: SAVE_EDITED_COMPANY_SHOP_STORE,
    shopStore: shopStore,
  }
}

export const editUserCompanyAvailability = (
  itemId: string,
  itemName: string,
  itemCount: number
) => {
  return {
    type: EDIT_USER_COMPANY_AVAILABILITY,
    itemId: itemId,
    itemName: itemName,
    itemCount: itemCount,
  }
}

export const deleteUserCompanyAvailability = (itemId: string) => {
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

export const addUserCompanyAvailability = (
  data: any,
  hasPermission: boolean
) => {
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

export const deleteFavouritesCompany = (companyId: string) => {
  return {
    type: DELETE_FAVOURITES_COMPANY,
    companyId: companyId,
  }
}

export const addFavouritesCompany = (favouriteAddData: any) => {
  return {
    type: ADD_FAVOURITES_COMPANY,
    favouriteAddData: favouriteAddData,
  }
}

export const updateUserReserwationsCount = (
  companyId: string,
  isStampActive: boolean,
  countStampsToActive: number
) => {
  return {
    type: UPDATE_USER_RESERWATIONS_COUNT,
    companyId: companyId,
    isStampActive: isStampActive,
    countStampsToActive: countStampsToActive,
  }
}

export const daleteCompanyStamps = (companyId: string, stampId: string) => {
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

export const updateCompanyStamps = (companyId: string, stampData: any) => {
  return {
    type: UPDATE_COMPANY_STAMPS,
    companyId: companyId,
    stampData: stampData,
  }
}

export const addNewCompanyStamps = (
  companyId: string,
  newCompanyStamps: any
) => {
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

export const updateUserImage = (imagestring: string) => {
  return {
    type: UPDATE_USER_IMAGE,
    imagestring: imagestring,
  }
}

export const changeActiveWorker = (value: any) => {
  return {
    type: CHANGE_ACTIVE_WORKER,
    value: value,
  }
}

export const changeWorkerHours = (dataWorkingHours: any) => {
  return {
    type: CHANGE_WORKING_HOURS,
    dataWorkingHours: dataWorkingHours,
  }
}

export const changeCompanyMainImage = (
  companyId: string,
  imagePath: string
) => {
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

export const updateCompanyImage = (
  companyId: string,
  pathImage: string,
  imageId: string
) => {
  return {
    type: UPDATE_COMPANY_IMAGE,
    pathImage: pathImage,
    companyId: companyId,
    imageId: imageId,
  }
}

export const deleteCompanyImage = (companyId: string, pathImage: string) => {
  return {
    type: DELETE_COMPANY_IMAGE,
    companyId: companyId,
    pathImage: pathImage,
  }
}

export const addEditedOpinionToCommuniting = (
  communitingId: string,
  opinionEdited: boolean,
  company: any,
  companyId: string,
  opinionId: string
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
  serviceId: string,
  opinionEdited: boolean,
  company: any,
  companyId: string,
  opinionId: string
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
  reserwationId: string,
  opinionEdited: boolean,
  company: any,
  companyId: string,
  opinionId: string
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
  communitingId: string,
  opinion: any,
  company: any,
  companyId: string
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
  serviceId: string,
  opinion: any,
  company: any,
  companyId: string
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
  reserwationId: string,
  opinion: any,
  company: any,
  companyId: string
) => {
  return {
    type: ADD_NEW_OPINION_TO_RESERWATION,
    reserwationId: reserwationId,
    opinion: opinion,
    companyName: company,
    companyId: companyId,
  }
}

export const addReplayToOpinion = (
  opinionId: string,
  replay: any,
  companyId: string
) => {
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

export const addNewOpinionsCompany = (companyId: string, opinions: any) => {
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

export const updateCompanyPathPromotion = (promotionDate: any) => {
  return {
    type: UPDATE_COMPANY_PATH_PROMOTION,
    promotionDate: promotionDate,
  }
}

export const deleteCompanyPromotion = (promotionId: string) => {
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

export const updateCompanyHappyHourConstPatch = (dateConst: any) => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH,
    dateConst: dateConst,
  }
}

export const deleteCompanyHappyHoursConst = (happyHourId: string) => {
  return {
    type: DELETE_COMPANY_HAPPY_HOUR_CONST,
    happyHourId: happyHourId,
  }
}

export const updateCompanyHappyHoursConst = (constHappyHours: any) => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOURS_CONST,
    constHappyHours: constHappyHours,
  }
}

export const updateCompanyPromotions = (promotions: any) => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOURS_NO_CONST,
    promotions: promotions,
  }
}

export const updateCompanyMaps = (maps: any) => {
  return {
    type: UPDATE_COMPANY_MAPS,
    maps: maps,
  }
}

export const updateOpeningHoursCompany = (openingHours: any, daysOff: any) => {
  return {
    type: UPDATE_COMPANY_OPENING_HOURS,
    openingHours: openingHours,
    daysOff: daysOff,
  }
}

export const updateComanyTeksts = (texts: any) => {
  return {
    type: UPDATE_COMPANY_TEKSTS,
    texts: texts,
  }
}

export const companyDeleteWorkerNoConstHours = (
  workerId: string,
  noConstHourId: string
) => {
  return {
    type: COMPANY_DELETE_WORKER_NO_CONST_HOURS,
    workerId: workerId,
    noConstHourId: noConstHourId,
  }
}

export const companyAddWorkerNoConstHours = (workerId: string, data: any) => {
  return {
    type: COMPANY_ADD_WORKER_NO_CONST_HOURS,
    workerId: workerId,
    data: data,
  }
}

export const companyPatchWorkerNoConstHours = (workerId: string, data: any) => {
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

export const companyPatchWorkerContTime = (dataTime: any) => {
  return {
    type: COMPANY_PATCH_WORKER_CONST_TIME,
    dataTime: dataTime,
  }
}

export const companyPatchWorkerSettings = (dataWorker: any) => {
  return {
    type: COMPANY_PATCH_WORKER_SETTINGS,
    dataWorker: dataWorker,
  }
}

export const companyPatchSettings = (data: any) => {
  return {
    type: COMPANY_PATCH_SETTINGS,
    data: data,
  }
}

export const patchNewCompanyServices = (
  data: any,
  ownerDataServices: any,
  workers: any,
  promotions: any,
  happyHoursConst: any,
  companyStamps: any
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

export const addSelectedUserReserwations = (
  userSelectedId: string,
  reserwations: any
) => {
  return {
    type: ADD_SELECTED_USER_RESERWATIONS,
    userSelectedId: userSelectedId,
    reserwations: reserwations,
  }
}

export const addToUserInformations = (
  userSelectedId: string,
  messages: any
) => {
  return {
    type: ADD_TO_USER_INFORMATIONS,
    userSelectedId: userSelectedId,
    messages: messages,
  }
}

export const newWorkerUsersMessageInformations = (
  data: any,
  selectedUserId: string
) => {
  return {
    type: WORKER_MORE_USERS_MESSAGES_INFORMATIONS,
    data: data,
    selectedUserId: selectedUserId,
  }
}

const deleteMessageToUserInformation = (
  selectedUserId: string,
  messageId: string
) => {
  return {
    type: DELETE_MESSAGE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    messageId: messageId,
  }
}

export const resetBellAlerts = (value: any) => {
  return {
    type: RESET_BELL_ALERT,
    value: value,
  }
}

export const addNewMessageToUserInformation = (
  selectedUserId: string,
  newMessage: string
) => {
  return {
    type: ADD_NEW_MESSAGE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    newMessage: newMessage,
  }
}

export const addPhoneToWorkerUserInformation = (
  selectedUserId: string,
  userPhone: number
) => {
  return {
    type: ADD_NEW_PHONE_WORKER_USER_INFORMATION,
    selectedUserId: selectedUserId,
    userPhone: userPhone,
  }
}

export const addPhoneToWorkerReserwation = (
  selectedUserId: string,
  userPhone: number,
  reserwationId: string
) => {
  return {
    type: ADD_NEW_PHONE_WORKER_RESERWATION,
    selectedUserId: selectedUserId,
    userPhone: userPhone,
    reserwationId: reserwationId,
  }
}

export const newWorkerUsersInformationsBlock = (
  selectedUserId: string,
  isBlocked: boolean
) => {
  return {
    type: WORKER_USERS_INFORMATIONS_BLOCK,
    selectedUserId: selectedUserId,
    isBlocked: isBlocked,
  }
}

export const newWorkerUsersHistoryInformations = (
  data: any,
  userSelectedId: string
) => {
  return {
    type: WORKER_MORE_USERS_HISTORY_INFORMATIONS,
    data: data,
    userSelectedId: userSelectedId,
  }
}

export const newWorkerUsersInformations = (data: any) => {
  return {
    type: WORKER_USERS_INFORMATIONS,
    data: data,
  }
}

export const addNewAlerts = (data: any) => {
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

export const avaibleUpdatePage = (value: any) => {
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

export const updateUserOneReserwation = (
  reserwationId: string,
  companyName: string
) => {
  return {
    type: UPDATE_USER_ONE_RESERWATION,
    reserwationId: reserwationId,
    companyName: companyName,
  }
}

export const updateUserReserwations = (data: any) => {
  return {
    type: UPDATE_USER_RESERWATIONS,
    data: data,
  }
}

export const updateWorkerReserwations = (data: any) => {
  return {
    type: UPDATE_WORKER_RESERWATIONS,
    data: data,
  }
}

export const updatePlacesData = (data: any) => {
  return {
    type: UPDATE_PLACES_DATA,
    data: data,
  }
}

export const updateNewPlacesData = (data: any) => {
  return {
    type: UPDATE_NEW_PLACES_DATA,
    data: data,
  }
}

export const updatePatchCompanyData = (data: any) => {
  return {
    type: UPDATE_PATCH_COMPANY_DATA,
    data: data,
  }
}

export const avaibleDateToReserwationUpdate = (value: any) => {
  return {
    type: AVAIBLE_DATE_TO_RESERWATION_UPDATE,
    value: value,
  }
}

export const avaibleDateToReserwation = (date: any) => {
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

export const changeEditWorkerHours = (value: any, item: any) => {
  return {
    type: CHANGE_EDIT_WORKER_HOURS,
    value: value,
    item: item,
  }
}

export const changeReserwationValue = (value: any) => {
  return {
    type: CHANGE_RESERWATION_VALUE,
    value: value,
  }
}

export const resetEditCompany = (value: any) => {
  return {
    type: RESET_EDIT_COMPANY,
    value: value,
  }
}

export const replaceCompanyData = (data: any) => {
  return {
    type: REPLACE_COMPANY_DATA,
    data: data,
  }
}

export const fetchCompanyRegistration = (
  companyEmail: string,
  companyName: string,
  companyNumber: number,
  companyCity: string,
  companyDiscrict: string,
  companyAdress: string,
  userToken: string,
  userId: string,
  industries: any,
  companyNip: number,
  companyAdressCode: string
) => {
  return (dispatch: Dispatch<any>) => {
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

      .then(() => {
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

export const fetchSentAgainCompanyActivedEmail = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchSentAgainCompanyActivedNewPhone = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSentAgainCompanyActivedPhone = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  codeToVerified: number,
  companyId: string,
  token: string
) => {
  return (dispatch: Dispatch<any>) => {
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
            null
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
  codeToVerified: number,
  companyId: string,
  token: string,
  userId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
        dispatch(addAlertItem("Pomyślnie aktywowano telefon firmowy", "green"))
        dispatch(fetchAutoLogin(true, true, token, userId))
        dispatch(fetchUpdateStatusActiveCompanyEmail(companyId, true, null))
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

export const fetchCompanyData = (companyId: string, token: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchAddWorkerToCompany = (
  companyId: string,
  emailWorker: string,
  token: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchAddAgainWorkerToCompany = (
  companyId: string,
  emailWorker: string,
  token: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  companyId: string,
  workerEmail: string,
  codeToActive: number
) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/confirm-added-worker-to-company`, {
        companyId: companyId,
        workerEmail: workerEmail,
        codeToActive: codeToActive,
      })
      .then(() => {
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
  companyId: string,
  workerUserId: string,
  token: string,
  password: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  workerUserId: string,
  workerId: string,
  dateStart: string,
  dateFull: string,
  reserwationMessage: string,
  serviceId: string,
  numberPhone: number,
  isStampActive: boolean,
  countStampsToActive: number
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  workerUserId: string,
  workerId: string,
  dateStart: string,
  dateFull: string,
  reserwationMessage: string,
  serviceId: string,
  numberPhone: number,
  isStampActive: boolean,
  countStampsToActive: number,
  selectedReserwationId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  selectedWorkerUserId: string,
  selectedWorkerId: string,
  selectedDay: number,
  selectedMonth: number,
  selectedYear: number,
  timeReserwation: number,
  serviceId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchPathCompany = (companyPath: string) => {
  return (dispatch: Dispatch<any>) => {
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
  page: number = 1,
  sorts: any,
  filters: any,
  localization: string,
  selectedName: string,
  district: string
) => {
  return (dispatch: Dispatch<any>) => {
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
              response.data.companysDoc
              // response.data.geolocation ?
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
  page: number = 1,
  type: number = 1,
  sorts: any,
  filters: any,
  localization: string,
  selectedName: string,
  district: string
) => {
  return (dispatch: Dispatch<any>) => {
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
              response.data.companysDoc
              // response.data.geolocation ?
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
  type: number = 1,
  sorts: any,
  filters: any,
  localization: string,
  selectedName: string,
  district: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUserReserwations = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  yearPicker: number,
  monthPicker: number,
  onlyToOpinion: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  workerId: string,
  year: number,
  month: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchGetOwnerWorkingHours = (
  token: string,
  companyId: string,
  year: number,
  month: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  workerUserId: string,
  yearPicker: number,
  monthPicker: number,
  companyId: string,
  isAdmin: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  workerUserId: string,
  companyId: string,
  dateStart: string,
  dateEnd: string,
  dateFull: string,
  reserwationMessage: string,
  yearPicker: number,
  monthPicker: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  reserwationId: string,
  canceled: any = null,
  companyName: string = ""
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  workerUserId: string,
  reserwationId: string,
  canceled: any = null,
  changed: any = null,
  noFinished: any = null,
  yearPicker: number,
  monthPicker: number,
  companyId: string,
  newTimeStart: string,
  newTimeEnd: string,
  workerSelectedUserId: string,
  dateReserwation: any = null
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUpdateUserAlert = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchGetMoreAlerts = (token: string, page: number) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchworkerUsersInformations = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  userSelectedId: string,
  page: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  selectedUserId: string,
  page: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  selectedUserId: string,
  isBlocked: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  selectedUserId: string,
  workerMessage: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  selectedUserId: string,
  messageId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCustomUserPhone = (
  token: string,
  selectedUserId: string,
  companyId: string,
  reserwationId: string = ""
) => {
  return (dispatch: Dispatch<any>) => {
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
        if (!!reserwationId) {
          dispatch(
            addPhoneToWorkerReserwation(
              selectedUserId,
              response.data.userPhone,
              reserwationId
            )
          )
        } else {
          dispatch(
            addPhoneToWorkerUserInformation(
              selectedUserId,
              response.data.userPhone
            )
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

export const fetchUserInformations = (
  token: string,
  companyId: string,
  userSelectedId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  userSelectedId: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSaveCompanyServices = (
  token: string,
  companyId: string,
  services: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSaveCompanySettings = (
  token: string,
  companyId: string,
  dataSettings: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  dateProps: any = null,
  constTime: any = null
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  workerId: string,
  year: number,
  month: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  year: number,
  month: number,
  ownerId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const addNewNoConstHour = (
  token: string,
  companyId: string,
  workerId: string,
  newDate: any
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  workerId: string,
  noConstDateId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  textAboutUs: string | null = null,
  textReserwation: string | null = null,
  links: any = null
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  openingHours: any = null,
  daysOff: any = null
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchSaveMaps = (token: string, companyId: string, maps: any) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchAddConstDateHappyHour = (
  token: string,
  companyId: string,
  constDate: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchAddPromotion = (
  token: string,
  companyId: string,
  promotionDate: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchDeleteConstHappyHour = (
  token: string,
  companyId: string,
  happyHourId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUpdateConstDateHappyHour = (
  token: string,
  companyId: string,
  constDate: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchDeletePromotion = (
  token: string,
  companyId: string,
  promotionId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUpdatePromotion = (
  token: string,
  companyId: string,
  promotionDate: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchAddOpinion = (
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUpdateEditedOpinion = (
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchLoadMoreOpinions = (page: number, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchAddReplayOpinion = (
  token: string,
  companyId: string,
  replay: any,
  opinionId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCompanyUploadImage = (
  token: string,
  companyId: string,
  file: any,
  imageId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
        dispatch(
          updateCompanyImage(companyId, response.data.imagestring, imageId)
        )
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

export const fetchCompanyDeleteImage = (
  token: string,
  companyId: string,
  imagePath: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCompanyMainImage = (
  token: string,
  companyId: string,
  imagePath: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUserUploadImage = (token: string, image: any) => {
  return (dispatch: Dispatch<any>) => {
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
        dispatch(updateUserImage(response.data.imagestring))
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

export const fetchUserDeleteImage = (token: string, imagePath: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUserDeleteImageOther = (token: string, imagePath: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const companyAddStamp = (
  token: string,
  companyId: string,
  stampData: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const companyDeleteStamp = (
  token: string,
  companyId: string,
  stampId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const companyUpdateStamp = (
  token: string,
  companyId: string,
  stampData: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const addCompanyFavourites = (token: string, favouriteAddData: any) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const deleteCompanyFavourites = (token: string, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const getCompanyAvailability = (token: string, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  itemName: string,
  itemCount: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const deleteCompanyAvailability = (
  token: string,
  companyId: string,
  itemId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  itemId: string,
  itemName: string,
  itemCount: number
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  newCategorys: any,
  editedCategory: any,
  deletedCategory: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchCompanyStaticts = (
  token: string,
  companyId: string,
  months: number,
  year: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSentCodeConfirmDelete = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchConfirmDelete = (
  token: string,
  companyId: string,
  code: number
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchConfirmDeleteCreatedCompany = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchSentCodeConfirmDeleteAccount = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchSentCodeConfirmVerifiedPhone = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchDeleteAccount = (token: string, code: number) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchVerifiedPhone = (token: string, code: number) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchNewOrder = (
  token: string,
  companyId: string,
  coinsIds: any
) => {
  return (dispatch: Dispatch<any>) => {
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

export const getCompanyTransactionHistory = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const getCoinsOffer = (token: string, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const sendInvoiceToCompanyEmail = (
  token: string,
  companyId: string,
  invoiceId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  smsReserwationAvaible: boolean = false,
  smsReserwationChangedUserAvaible: boolean = false,
  smsNotifactionAvaible: boolean = false,
  smsCanceledAvaible: boolean = false,
  smsChangedAvaible: boolean = false,
  smsServiceCreatedAvaible: boolean = false,
  smsServiceChangedAvaible: boolean = false,
  smsServiceFinishedAvaible: boolean = false,
  smsServiceCanceledAvaible: boolean = false,
  smsCommunitingNotificationAvaible: boolean = false,
  smsCommunitingCreatedAvaible: boolean = false,
  smsCommunitingChangedAvaible: boolean = false,
  smsCommunitingCanceledAvaible: boolean = false
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  allClients: any = false,
  selectedClients: any = [],
  textMessage: string = ""
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchCompanyMarker = (companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  reportValue: any,
  opinionId: string | null = null
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchNotificationEndpoint = (token: string, endpoint: any) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchAddCompanyLink = (
  token: string,
  companyId: string,
  pathValue: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCompanyUpdateNip = (
  token: string,
  companyId: string,
  nipValue: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchCompanyUpdateNipInfo = (token: string, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUpdateDefaultCompany = (token: string, companyId: string) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  nameInput: string,
  surnameInput: string,
  isActiveUser: boolean,
  phoneInput: number,
  objectInput: any,
  descriptionInput: string,
  costInput: number,
  statusValue: number,
  email: string,
  workerUserId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  year: number,
  month: number,
  workerUserId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchCompanyDeleteService = (
  token: string,
  companyId: string,
  serviceId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  serviceId: string,
  descriptionInput: string,
  objectInput: string,
  costInput: number,
  selectedWorkerUserId: string,
  statusValue: number
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCheckUserPhone = (
  token: string,
  companyId: string,
  serviceId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  communitingId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchGetUserHistoryServices = (
  token: string,
  month: number,
  year: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  nameInput: string,
  surnameInput: string,
  isActiveUser: boolean,
  phoneInput: number,
  descriptionInput: string,
  costInput: number,
  statusValue: number,
  email: string,
  workerUserId: string,
  cityInput: string,
  streetInput: string,
  timeStart: string,
  timeEnd: string,
  addWorkerTime: any,
  fullDate: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  year: number,
  month: number,
  workerUserId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  communitingId: string,
  reserwationId: string,
  opinionId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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
  token: string,
  companyId: string,
  communitingId: string,
  descriptionInput: string,
  costInput: number,
  selectedWorkerUserId: string,
  statusValue: number,
  timeStart: string,
  timeEnd: string,
  fullDate: string,
  reserwationId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchGetUserHistoryCommuniting = (
  token: string,
  month: number,
  year: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUserCancelCommunity = (
  token: string,
  communityId: string,
  reserwationId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchAddOpinionCommuniting = (
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchAddOpinionService = (
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  opinionData: any,
  company: any
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchDownloadCommuniting = (communitingId: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchDownloadService = (serviceId: string) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  dateStart: string,
  dateEnd: string,
  dateFull: string,
  reserwationMessage: string,
  selectedWorkerUserId: string,
  selectedServiceId: string,
  isActiveUser: boolean,
  phone: number,
  name: string,
  surname: string,
  email: string,
  activePromotion: boolean,
  activeHappyHour: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUpdateUserProps = (
  token: string,
  language: string,
  darkMode: boolean,
  blindMode: boolean
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  newPhone: string,
  password: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCancelUpdateCompanyPhone = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchCancelUpdateCompanyEmail = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchUpdateCompanyPhoneVeryfiedCode = (
  token: string,
  companyId: string,
  code: number
) => {
  return (dispatch: Dispatch<any>) => {
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
  token: string,
  companyId: string,
  newEmail: string,
  password: string
) => {
  return (dispatch: Dispatch<any>) => {
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
      .then(() => {
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

export const fetchSentAgainCompanyActivedNewEmail = (
  token: string,
  companyId: string
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchUpdateCompanyEmailVeryfiedCode = (
  token: string,
  companyId: string,
  code: number
) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchVerifiedEmail = (token: string, code: number) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchSentCodeConfirmVerifiedEmail = (token: string) => {
  return (dispatch: Dispatch<any>) => {
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

export const fetchDeleteVerifiedUserPhone = (token: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-delete-verified-phone`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(changeVerifiedUserFields(response.data.userPhone, null))
        dispatch(addAlertItem("Anulowano zmianę numeru telefonu.", "green"))
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

export const fetchDeleteVerifiedUserEmail = (token: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/user-delete-verified-email`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(changeVerifiedUserFields(null, response.data.userEmail))
        dispatch(addAlertItem("Anulowano zmianę adresu e-mail.", "green"))
      })
      .catch(error => {
        if (!!error) {
          if (!!error.response) {
            if (error.response.status === 401) {
              dispatch(logout())
            } else {
              dispatch(
                addAlertItem(
                  "Błąd podczas anulowania zmiany adresu e-mail",
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
