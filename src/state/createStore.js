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
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  REPLACE_COMPANY_DATA,
  RESET_EDIT_COMPANY,
  CHANGE_RESERWATION_VALUE,
  CHANGE_EDIT_WORKER_HOURS,
  CHANGE_EDITED_WORKER_HOURS,
  AVAIBLE_DATE_TO_RESERWATION,
  AVAIBLE_DATE_TO_RESERWATION_UPDATE,
  UPDATE_PATCH_COMPANY_DATA,
  UPDATE_PLACES_DATA,
  UPDATE_USER_RESERWATIONS,
  UPDATE_USER_ONE_RESERWATION,
} from "./actions"

const initialState = {
  colorBlind: {
    blind: false,
    dark: false,
  },
  user: null,
  userPhone: null,
  page: 1,
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
  avaibleHoursReserwation: [],
  avaibleHoursReserwationUpdate: false,
  resetCompany: false,
  reserwationData: {},
  reserwationEnable: false,
  editWorkerHours: false,
  editWorkerHoursData: null,
  editedWorkersHours: [],
  pathCompanyData: null,
  userHistoryReserwations: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PATCH_COMPANY_DATA:
      return {
        ...state,
        pathCompanyData: action.data,
      }
    case CHANGE_DARK_STYLE:
      const newDarkStyle = {
        blind: false,
        dark: !state.colorBlind.dark,
      }
      return {
        ...state,
        colorBlind: newDarkStyle,
      }
    case CHANGE_BLIND_STYLE:
      const newBlindStyle = {
        blind: !state.colorBlind.blind,
        dark: false,
      }
      return {
        ...state,
        colorBlind: newBlindStyle,
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
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
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

    case UPDATE_PLACES_DATA:
      return {
        ...state,
        placesData: action.data,
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
      const newUserCompany = { ...state.user }
      if (!!newUserCompany.company) {
        newUserCompany.company = action.data
      }
      return {
        ...state,
        user: newUserCompany,
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
