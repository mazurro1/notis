import { createStore as reduxCreateStore } from "redux"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"

import {
  CHANGE_SORT_VISIBLE,
  CHANGE_FILTER_VISIBLE,
  CHANGE_SORT_VALUE,
  CHANGE_LOCALIZATION_VISIBLE,
  CHANGE_FILTER_VALUE,
  CHANGE_LOCALIZATION_VALUE,
  CHANGE_INDUSTRIES,
  LOADING_PLACES,
  CHANGE_SPINNER,
  LOGOUT,
  LOGIN,
  CHANGE_LOGIN_VISIBLE,
  REMOVE_ALERT_ITEM,
  ADD_ALERT_ITEM,
  CHANGE_REGISTRATION_VISIBLE,
  ADD_USER_PHONE,
  CHANGE_USER_PROFIL_VISIBLE,
  CHANGE_REMIND_PASSWORD_VISIBLE,
  CHANGE_REMIND_PASSWORD_EMAIL_SENT,
  CHANGE_CREATE_COMPANY_VISIBLE,
  CHANGE_BLIND_STYLE,
  CHANGE_DARK_STYLE,
  CHANGE_LANGUAGE_STYLE,
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  WORKER_USERS_INFORMATIONS_BLOCK,
  WORKER_MORE_USERS_HISTORY_INFORMATIONS,
  WORKER_USERS_INFORMATIONS,
  ADD_NEW_ALERTS,
  RESET_USER_ALERTS,
  ADD_NEW_USER_ALERT,
  AVAIBLE_UPDATE_PAGE,
  UPDATE_PAGE,
  REPLACE_COMPANY_DATA,
  RESET_EDIT_COMPANY,
  CHANGE_RESERWATION_VALUE,
  CHANGE_EDIT_WORKER_HOURS,
  CHANGE_EDITED_WORKER_HOURS,
  AVAIBLE_DATE_TO_RESERWATION,
  AVAIBLE_DATE_TO_RESERWATION_UPDATE,
  UPDATE_PATCH_COMPANY_DATA,
  UPDATE_PLACES_DATA,
  UPDATE_NEW_PLACES_DATA,
  UPDATE_USER_RESERWATIONS,
  UPDATE_WORKER_RESERWATIONS,
  UPDATE_USER_ONE_RESERWATION,
  RESET_PLACES,
} from "./actions"

const initialState = {
  siteProps: {
    blind: false,
    dark: false,
    language: "PL",
  },
  user: null,
  userId: null,
  userPhone: null,
  page: 1,
  avaibleUpdatePage: false,
  spinnerEnable: false,
  industries: null,
  createCompanyVisible: false,
  remindPasswordVisible: false,
  remindPasswordEmailSent: false,
  userProfilVisible: false,
  loginVisible: false,
  registrationVisible: false,
  localizationVisible: false,
  localization: false,
  localizationData: [
    { value: "warszawa", label: "Warszawa" },
    { value: "krakow", label: "Kraków" },
  ],
  localizationDataLoading: false,
  filterVisible: false,
  filters: null,
  filtersData: [
    { value: "Hybryda", label: "Hybryda" },
    { value: "strawberry1", label: "Strawberry1" },
    { value: "vanilla1", label: "Vanilla1" },
  ],
  filterDataLoading: false,
  sortVisible: false,
  sorts: null,
  sortDataLoading: false,
  placesData: [],
  loadingPlaces: false,
  alerts: [],
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  companyUsersInformations: [],
  avaibleHoursReserwation: [],
  avaibleHoursReserwationUpdate: false,
  resetCompany: false,
  reserwationData: {},
  reserwationEnable: false,
  editWorkerHours: false,
  editWorkerHoursData: null,
  editedWorkersHours: [],
  pathCompanyData: null,
  workCompanyData: null,
  userHistoryReserwations: [],
  workerHistoryReserwations: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DARK_STYLE:
      const newDarkStyle = {
        blind: false,
        dark: !state.siteProps.dark,
        language: state.siteProps.language,
      }
      return {
        ...state,
        siteProps: newDarkStyle,
      }
    case CHANGE_BLIND_STYLE:
      const newBlindStyle = {
        blind: !state.siteProps.blind,
        dark: false,
        language: state.siteProps.language,
      }
      return {
        ...state,
        siteProps: newBlindStyle,
      }
    case CHANGE_LANGUAGE_STYLE:
      const newLanguageStyle = {
        blind: state.siteProps.blind,
        dark: state.siteProps.dark,
        language: action.value,
      }
      return {
        ...state,
        siteProps: newLanguageStyle,
      }
    case CHANGE_CREATE_COMPANY_VISIBLE:
      return {
        ...state,
        createCompanyVisible: action.value,
      }

    case CHANGE_REMIND_PASSWORD_EMAIL_SENT:
      return {
        ...state,
        remindPasswordEmailSent: action.value,
      }

    case CHANGE_REMIND_PASSWORD_VISIBLE:
      return {
        ...state,
        remindPasswordVisible: action.value,
        loginVisible: false,
      }

    case CHANGE_USER_PROFIL_VISIBLE:
      return {
        ...state,
        userProfilVisible: action.value,
      }

    case ADD_USER_PHONE:
      return {
        ...state,
        userPhone: action.phone,
      }

    case ADD_ALERT_ITEM: {
      const newAlertId =
        state.alerts.length > 0
          ? state.alerts[state.alerts.length - 1].id + 1
          : 0
      const newAlert = {
        id: newAlertId,
        text: action.text,
        color: action.color,
      }
      const newAlerts = [...state.alerts, newAlert]
      return {
        ...state,
        alerts: newAlerts,
      }
    }

    case REMOVE_ALERT_ITEM: {
      const filterAlerts = state.alerts.filter(item => item.id !== action.id)
      return {
        ...state,
        alerts: filterAlerts,
      }
    }

    case CHANGE_LOGIN_VISIBLE:
      return {
        ...state,
        loginVisible: action.value,
      }

    case CHANGE_REGISTRATION_VISIBLE:
      return {
        ...state,
        registrationVisible: action.value,
      }

    case LOGIN:
      return {
        ...state,
        user: action.user,
        userId: action.user.userId
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        userId: null,
      }
    case CHANGE_SPINNER:
      return {
        ...state,
        spinnerEnable: action.value,
      }

    case LOADING_PLACES:
      return {
        ...state,
        loadingPlaces: action.value,
      }

    case CHANGE_INDUSTRIES:
      return {
        ...state,
        industries: action.value,
        page: 1,
      }

    case CHANGE_SORT_VISIBLE:
      return {
        ...state,
        sortVisible: !state.sortVisible,
      }

    case CHANGE_FILTER_VISIBLE:
      return {
        ...state,
        filterVisible: !state.filterVisible,
      }

    case CHANGE_LOCALIZATION_VISIBLE:
      return {
        ...state,
        localizationVisible: !state.localizationVisible,
      }

    case CHANGE_SORT_VALUE:
      return {
        ...state,
        sorts: action.value,
        sortVisible: false,
      }

    case CHANGE_FILTER_VALUE:
      return {
        ...state,
        filters: action.value,
        filterVisible: false,
      }

    case CHANGE_LOCALIZATION_VALUE:
      return {
        ...state,
        localization: action.value,
        localizationVisible: false,
      }

    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY
    case WORKER_USERS_INFORMATIONS_BLOCK: {
      const newCompanyUsersInformationsBlocked = [...state.companyUsersInformations]
      const findIndexUserHistory = newCompanyUsersInformationsBlocked.findIndex(
        hist => hist._id === action.userHistoryId
      )
      newCompanyUsersInformationsBlocked[findIndexUserHistory].isBlocked =
        action.isBlocked
      return {
        ...state,
        companyUsersInformations: newCompanyUsersInformationsBlocked,
      }
    }

    
    case WORKER_MORE_USERS_HISTORY_INFORMATIONS: {
      const newCompanyUsersInformations = [...state.companyUsersInformations]
      const findIndexUserHistory = newCompanyUsersInformations.findIndex(
        hist => hist._id === action.userHistoryId
      )
      newCompanyUsersInformations[findIndexUserHistory].allUserReserwations.push(
        ...action.data
      )
      console.log(findIndexUserHistory)
      return {
        ...state,
        companyUsersInformations: newCompanyUsersInformations,
      }
    }


    case WORKER_USERS_INFORMATIONS: {
      return {
        ...state,
        companyUsersInformations: action.data,
      }
    }

    case ADD_NEW_ALERTS: {
      const newAllertsUser = {...state.user}
      if (!!newAllertsUser){
        newAllertsUser.alerts.push(...action.data)
      }
        return {
          ...state,
          user: newAllertsUser,
        }
    }
    case ADD_NEW_USER_ALERT: {
      const newUserWithAlerts = {...state.user}
      const alertsUserValid = !!state.user.alerts ? state.user.alerts : []
      if (!!newUserWithAlerts) {
        newUserWithAlerts.alerts = [action.data, ...alertsUserValid]
        newUserWithAlerts.alertActiveCount = state.user.alertActiveCount + 1
      }
      return{
        ...state,
        user: newUserWithAlerts
      }
    }

    case RESET_USER_ALERTS: {
      const newResetUserWithAlerts = { ...state.user }
      if (!!newResetUserWithAlerts) {
        newResetUserWithAlerts.alertActiveCount = 0;
      }
      return {
        ...state,
        user: newResetUserWithAlerts,
      }
    }

    case RESET_PLACES: {
      if (state.page === 1) {
        return {
          ...state,
          placesData: [],
        }
      }
    }
    case AVAIBLE_UPDATE_PAGE:
      return {
        ...state,
        avaibleUpdatePage: action.value,
      }
    case UPDATE_PAGE:
      return {
        ...state,
        page: state.page + 1,
        avaibleUpdatePage: false,
      }
    case UPDATE_PATCH_COMPANY_DATA:
      return {
        ...state,
        pathCompanyData: action.data,
      }
    case UPDATE_USER_ONE_RESERWATION: {
      const newUserHistoryReserwations = [...state.userHistoryReserwations]
      const changedReserwation = action.data
      const indexCompany = newUserHistoryReserwations.findIndex(
        item => item.category === changedReserwation.company.name
      )
      if (indexCompany >= 0) {
        const indexReserwation = newUserHistoryReserwations[
          indexCompany
        ].items.findIndex(item => item._id === changedReserwation._id)

        if (indexReserwation >= 0) {
          newUserHistoryReserwations[indexCompany].items[
            indexReserwation
          ] = changedReserwation
        }
      }

      return {
        ...state,
        userHistoryReserwations: newUserHistoryReserwations,
      }
    }
    case UPDATE_USER_RESERWATIONS:
      return {
        ...state,
        userHistoryReserwations: action.data,
      }

    case UPDATE_WORKER_RESERWATIONS:
      return {
        ...state,
        workerHistoryReserwations: action.data,
      }

    case UPDATE_PLACES_DATA:
      return {
        ...state,
        placesData: action.data,
        avaibleUpdatePage: true,
      }

    case UPDATE_NEW_PLACES_DATA:
      const allPlacesData = [...state.placesData, ...action.data]
      return {
        ...state,
        placesData: allPlacesData,
        avaibleUpdatePage: true,
      }
    case AVAIBLE_DATE_TO_RESERWATION_UPDATE:
      return {
        ...state,
        avaibleHoursReserwationUpdate: action.value,
      }
    case AVAIBLE_DATE_TO_RESERWATION:
      return {
        ...state,
        avaibleHoursReserwation: action.date,
      }
    case CHANGE_EDITED_WORKER_HOURS:
      return {
        ...state,
        editedWorkersHours: action.item,
      }
    case CHANGE_EDIT_WORKER_HOURS:
      if (!!action.item) {
        return {
          ...state,
          editWorkerHours: action.value,
          editWorkerHoursData: action.item,
        }
      } else {
        setTimeout(() => {
          return {
            ...state,
            editWorkerHoursData: action.item,
          }
        }, 400)
        return {
          ...state,
          editWorkerHours: action.value,
        }
      }

    case CHANGE_RESERWATION_VALUE:
      const reserwationEnable = !!action.value ? true : false
      const itemReserwation = !!action.value ? action.value : {}
      if (!!action.value) {
        return {
          ...state,
          reserwationData: itemReserwation,
          reserwationEnable: reserwationEnable,
        }
      } else {
        setTimeout(() => {
          return {
            ...state,
            reserwationData: itemReserwation,
          }
        }, 1)
        return {
          ...state,
          reserwationEnable: reserwationEnable,
        }
      }

    case REPLACE_COMPANY_DATA:
      return {
        ...state,
        workCompanyData: action.data,
      }
    case RESET_EDIT_COMPANY:
      return {
        ...state,
        resetCompany: action.value,
      }
    default:
      return state
  }
}

const createStore = () =>
  reduxCreateStore(reducer, initialState, applyMiddleware(thunk))

export default createStore
