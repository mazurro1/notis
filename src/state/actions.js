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

export const UPDATE_PLACES_DATA = "UPDATE_PLACES_DATA"
export const CHANGE_EDIT_WORKER_HOURS = "EDIT_WORKER_HOURS"
export const REPLACE_COMPANY_DATA = "REPLACE_COMPANY_DATA"
export const RESET_EDIT_COMPANY = "RESET_EDIT_COMPANY"
export const CHANGE_RESERWATION_VALUE = "CHANGE_RESERWATION_VALUE"
export const CHANGE_EDITED_WORKER_HOURS = "CHANGE_EDITED_WORKER_HOURS"
export const AVAIBLE_DATE_TO_RESERWATION = "AVAIBLE_DATE_TO_RESERWATION"
export const AVAIBLE_DATE_TO_RESERWATION_UPDATE =
  "AVAIBLE_DATE_TO_RESERWATION_UPDATE"
export const UPDATE_PATCH_COMPANY_DATA = "UPDATE_PATCH_COMPANY_DATA"
export const UPDATE_USER_RESERWATIONS = "UPDATE_USER_RESERWATIONS"
export const UPDATE_USER_ONE_RESERWATION = "UPDATE_USER_ONE_RESERWATION"

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

export const updatePlacesData = data => {
  return {
    type: UPDATE_PLACES_DATA,
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

export const changeEditedWorkerHours = item => {
  return {
    type: CHANGE_EDITED_WORKER_HOURS,
    item: item,
  }
}

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
        dispatch(resetEditCompany(true))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas ładowania konta firmowego.", "red"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
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
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
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
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(
          addAlertItem(
            "Błąd podczas ponownego wysyłania linku aktywacyjnego.",
            "red"
          )
        )
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
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
  }
}

export const fetchUpdateCompanyProfil = (
  token,
  companyId,
  textAboutUsToSent,
  textRezerwationTextToSent,
  editedWorkersToSent,
  editedAdressToSent,
  editedLinksToSent,
  ownerSpecializationToSent,
  openingHoursToSentFinall,
  companyPaused,
  services,
  reservationEveryTime,
  reservationMonthTime,
  newOwnerServicesCategory,
  editedWorkersHours,
  createdDayOffToSaveIsChanges,
  deletedDayOffToSaveIsChanges
) => {
  return dispatch => {
    dispatch(changeSpinner(true))
    return axios
      .patch(
        `${Site.serverUrl}/update-company-profil`,
        {
          companyId: companyId,
          textAboutUs: textAboutUsToSent,
          textRezerwation: textRezerwationTextToSent,
          ownerSpecialization: ownerSpecializationToSent,
          editedWorkers: editedWorkersToSent,
          editedAdress: editedAdressToSent,
          editedLinks: editedLinksToSent,
          openingHours: openingHoursToSentFinall,
          companyPaused: companyPaused,
          services: services,
          reservationEveryTime: reservationEveryTime,
          reservationMonthTime: reservationMonthTime,
          ownerSerwiceCategory: newOwnerServicesCategory,
          editedWorkersHours: editedWorkersHours,
          createdDayOff: createdDayOffToSaveIsChanges,
          deletedDayOff: deletedDayOffToSaveIsChanges,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(addAlertItem("Zaktualizowano profil firmowy.", "green"))
        dispatch(fetchCompanyData(companyId, token))
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas aktualizowania profilu firmowego.", "red")
        )
        dispatch(resetEditCompany(false))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
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
  costReserwation,
  timeReserwation,
  serviceName,
  extraCost,
  extraTime
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
          costReserwation: costReserwation,
          timeReserwation: timeReserwation,
          serviceName: serviceName,
          extraCost: extraCost,
          extraTime: extraTime,
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
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas robienia rezerwacji.", "red"))
        setTimeout(() => {
          dispatch(changeSpinner(false))
        }, 1000)
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
  timeReserwation
) => {
  return dispatch => {
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
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        setTimeout(() => {
          dispatch(avaibleDateToReserwationUpdate(false))
          dispatch(avaibleDateToReserwation(response.data.avaibleHours))
        }, 1000)
      })
      .catch(error => {
        setTimeout(() => {
          dispatch(avaibleDateToReserwationUpdate(false))
          dispatch(avaibleDateToReserwation([]))
        }, 1000)
      })
  }
}

export const fetchPathCompany = (token, companyPath) => {
  return dispatch => {
    return axios
      .post(
        `${Site.serverUrl}/company-path`,
        {
          companyPath: companyPath,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        dispatch(updatePatchCompanyData(response.data.companyDoc))
      })
      .catch(error => {
        dispatch(
          addAlertItem("Błąd podczas pobierania danych o firmie.", "red")
        )
      })
  }
}

export const fetchAllCompanys = (page = 0) => {
  return dispatch => {
    return axios
      .post(`${Site.serverUrl}/all-companys`, {
        page: page,
      })
      .then(response => {
        dispatch(updatePlacesData(response.data.companysDoc))
        if (page === 0) {
          dispatch(changeLoadingPlaces(true))
        }
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas pobierania firm.", "red"))
        if (page === 0) {
          dispatch(changeLoadingPlaces(false))
        }
      })
  }
}

export const fetchUserReserwations = token => {
  return dispatch => {
    return axios
      .get(`${Site.serverUrl}/user-reserwations`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(response => {
        dispatch(updateUserReserwations(response.data.reserwations))
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas pobierania rezerwacji.", "red"))
      })
  }
}

export const fetchDeleteReserwation = (
  token,
  reserwationId,
  canceled = null,
  changed = null,
  finished = null,
  changedName = ""
) => {
  return dispatch => {
    return axios
      .patch(
        `${Site.serverUrl}/update-reserwation`,
        {
          reserwationId: reserwationId,
          canceled: canceled,
          changed: changed,
          finished: finished,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(response => {
        if ((changedName = "userReserwation")) {
          dispatch(updateUserOneReserwation(response.data.reserwation))
          dispatch(addAlertItem("Zaktualizowano rezerwację.", "green"))
        }
      })
      .catch(error => {
        dispatch(addAlertItem("Błąd podczas aktualizacji rezerwacji.", "red"))
      })
  }
}
