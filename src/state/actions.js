import axios from "axios"
import { Site } from "../common/Site"

// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
// USER ACTIONS
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

export const changeLanguageStyle = (value) => {
  return {
    type: CHANGE_LANGUAGE_STYLE,
    value: value
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
    dispatch(changeSpinner(false))
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

export const fetchRegisterUser = (
  email,
  name,
  surname,
  phone,
  password,
  dateBirth = 1,
  monthBirth = 0,
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(`${Site.serverUrl}/registration`, {
        email: email,
        userName: name,
        userSurname: surname,
        phoneNumber: phone,
        password: password,
        dateBirth: dateBirth,
        monthBirth: monthBirth,
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
            if (!!error.response) {
              if (!noAlert) {
                dispatch(addAlertItem("Autologowanie się nie powiodło", "red"))
              }
              if (error.response.status === 401) {
                // dispatch(logout())
              }
              if (!noSpinner) {
                  dispatch(changeSpinner(false))
              }
              if (lastSpinnerCreateCompany) {
                dispatch(
                  addAlertItem("Błąd podczas tworzenia konta firmowego.", "red")
                )
                  dispatch(changeSpinner(false))
              }
            } else {
              // dispatch(logout())
                dispatch(changeSpinner(false))
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
          dispatch(changeSpinner(false))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas aktywowania konta.", "red"))
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
export const ADD_NEW_PHONE_WORKER_USER_INFORMATION = "ADD_NEW_PHONE_WORKER_USER_INFORMATION"
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
export const COMPANY_PATCH_WORKER_NO_CONST_HOURS = "COMPANY_PATCH_WORKER_NO_CONST_HOURS"
export const COMPANY_ADD_WORKER_NO_CONST_HOURS = "COMPANY_ADD_WORKER_NO_CONST_HOURS"
export const COMPANY_DELETE_WORKER_NO_CONST_HOURS = "COMPANY_DELETE_WORKER_NO_CONST_HOURS"
export const UPDATE_COMPANY_TEKSTS = "UPDATE_COMPANY_TEKSTS"
export const UPDATE_COMPANY_OPENING_HOURS = "UPDATE_COMPANY_OPENING_HOURS"
export const UPDATE_COMPANY_MAPS = "UPDATE_COMPANY_MAPS"
export const UPDATE_COMPANY_HAPPY_HOURS_CONST = "UPDATE_COMPANY_HAPPY_HOURS_CONST"
export const DELETE_COMPANY_HAPPY_HOUR_CONST = "DELETE_COMPANY_HAPPY_HOUR_CONST"
export const UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH = "UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH"
export const UPDATE_CONST_HAPPY_HOURS = "UPDATE_CONST_HAPPY_HOURS"
export const UPDATE_COMPANY_HAPPY_HOURS_NO_CONST = "UPDATE_COMPANY_HAPPY_HOURS_NO_CONST"
export const DELETE_COMPANY_PROMOTION = "DELETE_COMPANY_PROMOTION"
export const UPDATE_COMPANY_PATH_PROMOTION = "UPDATE_COMPANY_PATH_PROMOTION"
export const UPDATE_PROMOTIONS = "UPDATE_PROMOTIONS"
export const ADD_NEW_OPINIONS_COMPANY = "ADD_NEW_OPINIONS_COMPANY"
export const ADD_REPLAY_TO_OPINION = "ADD_REPLAY_TO_OPINION"
export const ADD_NEW_OPINION_TO_RESERWATION = "ADD_NEW_OPINION_TO_RESERWATION"

export const addNewOpinionToReserwation = (reserwationId, opinion, company, companyId) => {
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

export const updateCompanyPathPromotion = (promotionDate) => {
  return {
    type: UPDATE_COMPANY_PATH_PROMOTION,
    promotionDate: promotionDate,
  }
}

export const deleteCompanyPromotion = (promotionId) => {
  return {
    type: DELETE_COMPANY_PROMOTION,
    promotionId: promotionId,
  }
}

export const updateConstHappyHoursFunction = () => {
  return {
    type: UPDATE_CONST_HAPPY_HOURS
  }
}

export const updateCompanyHappyHourConstPatch = (dateConst) => {
  return {
    type: UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH,
    dateConst: dateConst,
  }
}

export const deleteCompanyHappyHoursConst = (happyHourId) => {
  return {
    type: DELETE_COMPANY_HAPPY_HOUR_CONST,
    happyHourId: happyHourId,
  }
}

export const updateCompanyHappyHoursConst = (constHappyHours) => {
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

export const updateCompanyMaps = (maps) => {
  return {
    type: UPDATE_COMPANY_MAPS,
    maps: maps
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
    type: RESET_WORKER_PROPS_VISIBLE
  }
}

export const companyPatchWorkerContTime = (dataTime) => {
  return {
    type: COMPANY_PATCH_WORKER_CONST_TIME,
    dataTime: dataTime,
  }
}

export const companyPatchWorkerSettings = (dataWorker) => {
  return {
    type: COMPANY_PATCH_WORKER_SETTINGS,
    dataWorker: dataWorker,
  }
}

export const companyPatchSettings = (data) => {
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
  happyHoursConst
) => {
  return {
    type: COMPANY_PATCH_NEW_SERVICES,
    data: data,
    ownerDataServices: ownerDataServices,
    workers: workers,
    promotions: promotions,
    happyHoursConst: happyHoursConst,
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

  export const resetBellAlerts = (value) => {
    return {
      type: RESET_BELL_ALERT,
      value: value
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

export const newWorkerUsersInformations = (data) => {
  return {
    type: WORKER_USERS_INFORMATIONS,
    data: data,
  }
}

export const addNewAlerts = (data) => {
  return {
    type: ADD_NEW_ALERTS,
    data: data
  }
}

export const resetUserAlerts = () => {
  return{
    type: RESET_USER_ALERTS
  }
}

export const resetPlaces = () => {
  return {
    type: RESET_PLACES
  }
}

export const avaibleUpdatePage = (value) => {
  return {
    type: AVAIBLE_UPDATE_PAGE,
    value: value
  }
}

export const updatePage = () => {
  return {
    type: UPDATE_PAGE,
  }
}

export const updateUserOneReserwation = data => {
  return {
    type: UPDATE_USER_ONE_RESERWATION,
    data: data,
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
  userId,
  industries
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
          dispatch(changeSpinner(false))
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas aktywowania konta firmowego.", "red")
        )
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
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas ładowania konta firmowego.", "red"))
          dispatch(changeSpinner(false))
        dispatch(resetEditCompany(false))
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
        dispatch(
          addAlertItem(
            "Błąd podczas ponownego wysyłania linku aktywacyjnego.",
            "red"
          )
        )
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
        dispatch(
          addAlertItem("Błąd podczas dodawania pracownika do firmy.", "red")
        )
          dispatch(changeSpinner(false))
      })
  }
}

export const fetchDeleteUserFromCompany = (companyId, workerId, token) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/delete-worker-from-company`,
        {
          companyId: companyId,
          workerEmail: workerId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Usunięto pracownika.", "green"))
        dispatch(fetchCompanyData(companyId, token))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas usuwania pracownika.", "red"))
          dispatch(changeSpinner(false))
      })
  }
}

// export const fetchUpdateCompanyProfil = (
//   token,
//   companyId,
//   textAboutUsToSent,
//   textRezerwationTextToSent,
//   editedWorkersToSent,
//   editedAdressToSent,
//   editedLinksToSent,
//   ownerSpecializationToSent,
//   openingHoursToSentFinall,
//   companyPaused,
//   services,
//   reservationEveryTime,
//   reservationMonthTime,
//   newOwnerServicesCategory,
//   editedWorkersHours,
//   createdDayOffToSaveIsChanges,
//   deletedDayOffToSaveIsChanges,
//   newIndustriesToSent,
//   deletedIndustriesToSent
// ) => {
//   return dispatch => {
//     dispatch(changeSpinner(true))
//     return axios
//       .patch(
//         `${Site.serverUrl}/update-company-profil`,
//         {
//           companyId: companyId,
//           textAboutUs: textAboutUsToSent,
//           textRezerwation: textRezerwationTextToSent,
//           ownerSpecialization: ownerSpecializationToSent,
//           editedWorkers: editedWorkersToSent,
//           editedAdress: editedAdressToSent,
//           editedLinks: editedLinksToSent,
//           openingHours: openingHoursToSentFinall,
//           companyPaused: companyPaused,
//           services: services,
//           reservationEveryTime: reservationEveryTime,
//           reservationMonthTime: reservationMonthTime,
//           ownerSerwiceCategory: newOwnerServicesCategory,
//           editedWorkersHours: editedWorkersHours,
//           createdDayOff: createdDayOffToSaveIsChanges,
//           deletedDayOff: deletedDayOffToSaveIsChanges,
//           newIndustries: newIndustriesToSent,
//           deletedIndustries: deletedIndustriesToSent,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       )
//       .then(response => {
//         dispatch(addAlertItem("Zaktualizowano profil firmowy.", "green"))
//         dispatch(fetchCompanyData(companyId, token))
//       })
//       .catch(error => {
//         dispatch(
//           addAlertItem("Błąd podczas aktualizowania profilu firmowego.", "red")
//         )
//         dispatch(resetEditCompany(false))
//           dispatch(changeSpinner(false))
//       })
//   }
// }

export const fetchDoReserwation = (
  token,
  companyId,
  workerUserId,
  workerId,
  dateStart,
  dateFull,
  reserwationMessage,
  serviceId,
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
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Dokonano rezerwacji.", "green"))
        dispatch(changeReserwationValue(null))
          dispatch(changeSpinner(false))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas robienia rezerwacji.", "red"))
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
  monthPicker,
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
        dispatch(
          fetchWorkerReserwationsAll(token, workerUserId, yearPicker, monthPicker, companyId)
        )
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas robienia rezerwacji czasu.", "red"))
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
  serviceId,
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Ładowanie wylnych godzin wybranego pracownika", true))
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
        //avaibleHoursWithPromotions avaibleHours
        dispatch(avaibleDateToReserwationUpdate(false))
        dispatch(avaibleDateToReserwation(response.data.avaibleHoursWithPromotions))
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        dispatch(avaibleDateToReserwationUpdate(false))
        dispatch(avaibleDateToReserwation([]))
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchPathCompany = (companyPath) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie dancyh o firmie", true))
    return axios
      .post(
        `${Site.serverUrl}/company-path`,
        {
          companyPath: companyPath,
        },
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // }
      )
      .then(response => {
        dispatch(updatePatchCompanyData(response.data.companyDoc))
        dispatch(changeAlertExtra(null, false))
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas pobierania danych o firmie.", "red")
        )
        dispatch(changeAlertExtra(null, false))
      })
  }
}

export const fetchAllCompanys = (page = 1) => {
  return dispatch => {
    if (page === 1) {
      dispatch(changeLoadingPlaces(true))
    }else{
      dispatch(changeAlertExtra("Ładowanie firm", true))
    }
    return axios
      .post(`${Site.serverUrl}/all-companys`, {
        page: page,
      })
      .then(response => {
        if (page === 1) {
          dispatch(updatePlacesData(response.data.companysDoc))
          dispatch(changeLoadingPlaces(false))
        }else if (page > 1 && response.data.companysDoc.length > 0) {
          dispatch(updateNewPlacesData(response.data.companysDoc))
          dispatch(changeAlertExtra(null, false))
        }
      })
      .catch(error => {
       if (error.response) {
         if (error.response.status === 403) {
           dispatch(
             addAlertItem("Brak więcej firm w danej kategorii.", "blue")
           )
         }
       } else {
         dispatch(addAlertItem("Błąd podczas pobierania firm.", "red"))
       }
       if (page === 1) {
         dispatch(changeLoadingPlaces(false))
         dispatch(resetPlaces())
       }else{
        dispatch(changeAlertExtra(null, false))
       }
      })
  }
}

export const fetchAllCompanysOfType = (page = 1, type = 1) => {
  return dispatch => {
    if (page === 1) {
      dispatch(changeLoadingPlaces(true))
    }else{
      dispatch(changeAlertExtra("Ładowanie firm", true))
    }
    return axios
      .post(`${Site.serverUrl}/all-companys-type`, {
        page: page,
        type: type,
      })
      .then(response => {
        if (page === 1) {
          dispatch(changeLoadingPlaces(false))
          dispatch(updatePlacesData(response.data.companysDoc))
        } else if (page > 1 && response.data.companysDoc.length > 0) {
          dispatch(updateNewPlacesData(response.data.companysDoc))
          dispatch(changeAlertExtra(null, false))
        }
      })
      .catch(error => {
        if(error.response){
          if (error.response.status === 403) {
            dispatch(addAlertItem("Brak więcej firm w danej kategorii.", "blue")) 
          }
          
        }else{
          dispatch(addAlertItem("Błąd podczas pobierania firm.", "red")) 
        }
        if (page === 1) {
          dispatch(changeLoadingPlaces(false))
          dispatch(resetPlaces())
        }else{
          dispatch(changeAlertExtra(null, false))
        }
      })
  }
}

export const fetchUserReserwations = (token) => {
  return dispatch => {
    dispatch(changeAlertExtra("Pobieranie rezerwacji", true))
    return axios
      .get(
        `${Site.serverUrl}/user-reserwations`,
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
        dispatch(changeAlertExtra(null, false))
        dispatch(addAlertItem("Błąd podczas pobierania rezerwacji.", "red"))
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
        dispatch(changeAlertExtra(null, false))
        dispatch(addAlertItem("Błąd podczas pobierania rezerwacji.", "red"))
      })
  }
}

export const fetchWorkerReserwationsAll = (token, workerUserId, yearPicker, monthPicker, companyId) => {
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
        dispatch(changeSpinner(false))
        dispatch(updateWorkerReserwations(response.data.reserwations))
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas pobierania rezerwacji.", "red"))
      })
  }
}

export const fetchDeleteReserwation = (
  token,
  reserwationId,
  canceled = null,
  changed = null,
  noFinished = null,
  changedName = ""
) => {
  return dispatch => {
    dispatch(changeAlertExtra("Aktualizacja rezerwacji", true))
    return axios
      .patch(
        `${Site.serverUrl}/update-reserwation`,
        {
          reserwationId: reserwationId,
          canceled: canceled,
          changed: changed,
          noFinished: noFinished,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeAlertExtra(null, false))
        if ((changedName = "userReserwation")) {
          dispatch(updateUserOneReserwation(response.data.reserwation))
          dispatch(addAlertItem("Zaktualizowano rezerwację.", "green"))
        }
      })
      .catch(error => {
        dispatch(changeAlertExtra(null, false))
        dispatch(addAlertItem("Błąd podczas aktualizacji rezerwacji.", "red"))
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
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(
          fetchWorkerReserwationsAll(token, workerUserId, yearPicker, monthPicker, companyId)
        )
        dispatch(addAlertItem("Zaktualizowano rezerwację.", "green"))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas aktualizacji rezerwacji.", "red"))
        dispatch(changeSpinner(false))
      })
  }
}

export const fetchUpdateUserAlert = (
  token,
) => {
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
        dispatch(addAlertItem("Błąd podczas aktualizacji powiadomień.", "red"))
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
          page: page
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
        dispatch(addAlertItem("Błąd podczas aktualizacji powiadomień.", "red"))
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
        dispatch(addAlertItem("Błąd podczas ładowania informacji o klientach.", "red"))
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
        dispatch(changeAlertExtra(null, false))
        dispatch(
          addAlertItem("Błąd podczas ładowania historii klienta.", "red")
        )
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
        dispatch(
          addAlertItem("Błąd podczas ładowania historii klienta.", "red")
        )
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
        dispatch(changeAlertExtra(null, false))
        dispatch(
          addAlertItem("Błąd podczas blokowania użytkownika.", "red")
        )
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
        console.log(response.data.message)
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano wiadomość o kliencie.", "green"))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd dodawania wiadomości o kliencie.", "red"))
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
        dispatch(addAlertItem("Błąd dodawania wiadomości o kliencie.", "red"))
        dispatch(changeSpinner(false))
      })
  }
}


export const fetchCustomUserPhone = (
  token,
  selectedUserId,
  companyId
) => {
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
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Błąd podczas ładowania historii klienta.", "red")
        )
      })
  }
}


export const fetchSelectedUserReserwations = (token, userSelectedId, companyId) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .post(
        `${Site.serverUrl}/get-selected-users-reserwations`,
        {
          companyId: companyId,
          userSelectedId: userSelectedId,
          page: 1
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(changeSpinner(false))
        dispatch(addSelectedUserReserwations(userSelectedId, response.data.reserwations))
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Błąd podczas ładowania rezerwacji klienta.", "red")
        )
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
        console.log(services)
        if (!!services.new){
          if (services.new.length > 0) {
            dispatch(addAlertItem("Nie zapomnij przypisać pracownika do dodanych usług.", "blue"))
          }
        }
        dispatch(
          patchNewCompanyServices(
            response.data.services,
            response.data.ownerDataServices,
            response.data.workers,
            response.data.promotions,
            response.data.happyHoursConst
          )
        )
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas aktualizacji usług.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(companyPatchSettings(dataSettings))
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas aktualizacji ustawień firmy.", "red"))
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
        if (!!constTime){
          dispatch(companyPatchWorkerContTime(constTime))
        }
          dispatch(addAlertItem("Zaktualizowano pracownika.", "green"))
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas aktualizacji pracownika.", "red"))
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
            workerId, response.data.noConstWorkingHours
          )
        )
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
        dispatch(addAlertItem("Błąd podczas pobierania godzin pracy pracownika.", "red"))
      })
  }
}

export const fetchGetOwnerNoConstData = (
  token,
  companyId,
  year,
  month
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
        dispatch(changeSpinner(false))
        dispatch(changeEditWorkerHours(false, null))
        dispatch(
          addAlertItem(
            "Błąd podczas pobierania godzin pracy pracownika.",
            "red"
          )
        )
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
          newDate: newDate
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
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Błąd podczas pobierania godzin pracy pracownika.",
            "red"
          )
        )
      })
  }
}

export const deleteNoConstHour = (token, companyId, workerId, noConstDateId) => {
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
        dispatch(
          companyDeleteWorkerNoConstHours(workerId, noConstDateId)
        )
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        // dispatch(changeEditWorkerHours(false, null))
        dispatch(
          addAlertItem(
            "Błąd podczas pobierania godzin pracy pracownika.",
            "red"
          )
        )
      })
  }
}

export const fetchSaveTextsCompany = (token, companyId, textAboutUs = null, textReserwation = null, links = null) => {
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
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Błąd podczas aktualizacji tekstu.",
            "red"
          )
        )
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
        dispatch(
          addAlertItem("Zaktualizowano godziny otwarcia.", "green")
        )
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Błąd podczas aktualizacji godzin otwarcia.", "red")
        )
      })
  }
}


export const fetchSaveMaps = (
  token,
  companyId,
  maps,
) => {
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
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem("Błąd podczas aktualizacji mapy.", "red")
        )
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas dodawania happy hour.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas dodawania promocji.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas usuwania happy hour.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas aktualizacji happy hour.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas usuwania promocji.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas aktualizacji promocji.", "red"))
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
        console.log(response.data.opinion)
        dispatch(
          addNewOpinionToReserwation(
            opinionData.reserwationId,
            response.data.opinion,
            company,
            opinionData.company,
          )
        )
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Dodano opinie.", "green"))
      })
      .catch(error => {
        dispatch(changeSpinner(false))
        dispatch(addAlertItem("Błąd podczas dodawania opinii.", "red"))
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
        dispatch(changeSpinner(false))
        dispatch(
          addAlertItem(
            "Błąd podczas dodawania odpowiedzi do opinii opinii.",
            "red"
          )
        )
      })
  }
}