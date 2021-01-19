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
  COMPANY_DELETE_WORKER_NO_CONST_HOURS,
  COMPANY_ADD_WORKER_NO_CONST_HOURS,
  COMPANY_PATCH_WORKER_NO_CONST_HOURS,
  COMPANY_PATCH_WORKER_CONST_TIME,
  RESET_WORKER_PROPS_VISIBLE,
  COMPANY_PATCH_WORKER_SETTINGS,
  COMPANY_PATCH_NEW_SERVICES,
  ADD_SELECTED_USER_RESERWATIONS,
  RESET_BELL_ALERT,
  ADD_NEW_MESSAGE_WORKER_USER_INFORMATION,
  WORKER_USERS_INFORMATIONS_BLOCK,
  WORKER_MORE_USERS_HISTORY_INFORMATIONS,
  WORKER_MORE_USERS_MESSAGES_INFORMATIONS,
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
  ADD_NEW_PHONE_WORKER_USER_INFORMATION,
  DELETE_MESSAGE_WORKER_USER_INFORMATION,
  ADD_TO_USER_INFORMATIONS,
  COMPANY_PATCH_SETTINGS,
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
  bellAlertsActive: false,
  companyUsersInformations: [],
  avaibleHoursReserwation: [],
  avaibleHoursReserwationUpdate: false,
  resetCompany: false,
  reserwationData: {},
  reserwationEnable: false,
  editWorkerHours: false,
  editWorkerHoursData: null,
  // editedWorkersHours: [],
  pathCompanyData: null,
  workCompanyData: null,
  userHistoryReserwations: [],
  workerHistoryReserwations: null,
  resetWorkerProps: false,
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
        userId: action.user.userId,
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

    case RESET_WORKER_PROPS_VISIBLE: {
      return {
        ...state,
        resetWorkerProps: false,
      }
    }

    case COMPANY_PATCH_WORKER_CONST_TIME: {
      if(!!state.workCompanyData){
        const newWorkCompanyDataWorkersTime = { ...state.workCompanyData }
        if(action.dataTime.indexWorker === "owner"){
          if (action.dataTime.constantWorkingHours.length > 0) {
            action.dataTime.constantWorkingHours.forEach((constDate) => {
              const dateIsInBackend = newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours.findIndex(
                item => item.dayOfTheWeek === constDate.dayOfTheWeek
              )
              if (dateIsInBackend >= 0) {
                newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[dateIsInBackend].dayOfTheWeek = constDate.dayOfTheWeek;
                newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[dateIsInBackend].startWorking = constDate.startWorking;
                newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[dateIsInBackend].endWorking = constDate.endWorking;
                newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[dateIsInBackend].disabled = constDate.disabled;
              } else {
                newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours.push(constDate);
              }
            });
          }
        }else{
          const selectedWorkerIndex = newWorkCompanyDataWorkersTime.workers.findIndex(item => item._id === action.dataTime.indexWorker);
          if(selectedWorkerIndex >= 0){
            if (action.dataTime.constantWorkingHours.length > 0) {
              action.dataTime.constantWorkingHours.forEach((constDate) => {
                const dateIsInBackend = newWorkCompanyDataWorkersTime.workers[
                  selectedWorkerIndex
                ].constantWorkingHours.findIndex(
                  item => item.dayOfTheWeek === constDate.dayOfTheWeek
                )
                if (dateIsInBackend >= 0) {
                  newWorkCompanyDataWorkersTime.workers[selectedWorkerIndex].constantWorkingHours[dateIsInBackend].dayOfTheWeek = constDate.dayOfTheWeek;
                  newWorkCompanyDataWorkersTime.workers[selectedWorkerIndex].constantWorkingHours[dateIsInBackend].startWorking = constDate.startWorking;
                  newWorkCompanyDataWorkersTime.workers[selectedWorkerIndex].constantWorkingHours[dateIsInBackend].endWorking = constDate.endWorking;
                  newWorkCompanyDataWorkersTime.workers[selectedWorkerIndex].constantWorkingHours[dateIsInBackend].disabled = constDate.disabled;
                } else {
                  newWorkCompanyDataWorkersTime.workers[selectedWorkerIndex].constantWorkingHours.push(constDate);
                }
              });
            }
          }
        }
        return {
          ...state,
          workCompanyData: newWorkCompanyDataWorkersTime,
          resetWorkerProps: true,
        }
      }else{
        return {
          ...state,
        }
      }
    }

    case COMPANY_PATCH_WORKER_SETTINGS: {
      if(!!state.workCompanyData){
        const newWorkCompanyDataWorkersProps = { ...state.workCompanyData }
        if (action.dataWorker.workerId === "owner") {
          newWorkCompanyDataWorkersProps.ownerData.specialization = action.dataWorker.inputSpecializationValue
          newWorkCompanyDataWorkersProps.ownerData.permissions = action.dataWorker.mapWorkerPermissionsIds
          newWorkCompanyDataWorkersProps.ownerData.servicesCategory = action.dataWorker.workerServicesCategoryValue
        } else {
          const selectedWorkerIndex = newWorkCompanyDataWorkersProps.workers.findIndex(
            item => item._id === action.dataWorker.workerId
          )
          if (selectedWorkerIndex >= 0) {
            newWorkCompanyDataWorkersProps.workers[
              selectedWorkerIndex
            ].specialization = action.dataWorker.inputSpecializationValue
            newWorkCompanyDataWorkersProps.workers[
              selectedWorkerIndex
            ].permissions = action.dataWorker.mapWorkerPermissionsIds
            newWorkCompanyDataWorkersProps.workers[
              selectedWorkerIndex
            ].servicesCategory = action.dataWorker.workerServicesCategoryValue
          }
        }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataWorkersProps,
        resetWorkerProps: true,
      }
      }else{
        return {
          ...state
        }
      }
    }

    case COMPANY_DELETE_WORKER_NO_CONST_HOURS: {
      if (!!state.editWorkerHoursData) {
        if (!!state.editWorkerHoursData) {
          const editWorkerHoursDataNoConstHours = {
            ...state.editWorkerHoursData,
          }
          const filterNoConstDate = editWorkerHoursDataNoConstHours.noConstantWorkingHours.filter(
            item => item._id !== action.noConstHourId
          )

           editWorkerHoursDataNoConstHours.noConstantWorkingHours = filterNoConstDate

          return {
            ...state,
            editWorkerHoursData: editWorkerHoursDataNoConstHours,
          }
        } else {
          return {
            ...state,
          }
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case COMPANY_ADD_WORKER_NO_CONST_HOURS: {
      if (!!state.editWorkerHoursData) {
        if (!!state.editWorkerHoursData) {
          const editWorkerHoursDataNoConstHours = {
            ...state.editWorkerHoursData,
          }
          const filterNoConstDate = editWorkerHoursDataNoConstHours.noConstantWorkingHours.filter(
            item => item.fullDate !== action.data.fullDate
          )
          editWorkerHoursDataNoConstHours.noConstantWorkingHours = [
            ...filterNoConstDate,
            action.data,
          ]
          return {
            ...state,
            editWorkerHoursData: editWorkerHoursDataNoConstHours,
          }
        } else {
          return {
            ...state,
          }
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case COMPANY_PATCH_WORKER_NO_CONST_HOURS: {
      if(!!state.editWorkerHoursData){
        if (!!state.editWorkerHoursData) {
          const editWorkerHoursDataNoConstHours = {
            ...state.editWorkerHoursData,
          }
          editWorkerHoursDataNoConstHours.noConstantWorkingHours = action.data
          return {
            ...state,
            editWorkerHoursData: editWorkerHoursDataNoConstHours,
          }
        } else {
          return {
            ...state,
          }
        }
      }else{
        return {
          ...state
        }
      }
    }

    case COMPANY_PATCH_SETTINGS: {
      if (!!state.workCompanyData){
        const newWorkCompanyDataSettings = { ...state.workCompanyData }
        if(!!action.data.industriesComponent){
          newWorkCompanyDataSettings.companyType =
            action.data.industriesComponent
        }
        if (action.data.pauseCompanyToServer !== null) {
          newWorkCompanyDataSettings.pauseCompany =
            action.data.pauseCompanyToServer
        }
        if (!!action.data.reserwationEverToServer) {
          newWorkCompanyDataSettings.reservationEveryTime =
            action.data.reserwationEverToServer
        }
        if (!!action.data.reserwationMonthToServer) {
          newWorkCompanyDataSettings.reservationMonthTime =
            action.data.reserwationMonthToServer
        }
        if (!!action.data.updateAdressInput) {
          newWorkCompanyDataSettings.adress = action.data.updateAdressInput
        }
        if (!!action.data.updateDiscrictInput) {
          newWorkCompanyDataSettings.district = action.data.updateDiscrictInput
        }
        if (!!action.data.updateNompanyNameInput) {
          newWorkCompanyDataSettings.name = action.data.updateNompanyNameInput
        }
        if (!!action.data.updatePhoneInput) {
          newWorkCompanyDataSettings.phone = action.data.updatePhoneInput
        }
        if (!!action.data.updateCityInput) {
          newWorkCompanyDataSettings.city = action.data.updateCityInput
        }
        return {
          ...state,
          workCompanyData: newWorkCompanyDataSettings,
        }
      }else{
        return {
          ...state
        }
      }
    }

    case COMPANY_PATCH_NEW_SERVICES: {
      if (!!state.workCompanyData){
        const newWorkCompanyDataServices = { ...state.workCompanyData }
        newWorkCompanyDataServices.services = action.data
        newWorkCompanyDataServices.ownerData.servicesCategory =
          action.ownerDataServices
        newWorkCompanyDataServices.workers.forEach((worker, index)=> {
          const findSentWorker = action.workers.find(sentWorker => sentWorker.user === worker.user._id)
          if(!!findSentWorker){
            newWorkCompanyDataServices.workers[index].servicesCategory = findSentWorker.servicesCategory
          }
        })
        return {
          ...state,
          workCompanyData: newWorkCompanyDataServices,
          resetWorkerProps: true,
        }
      }else{
        return {
          ...state
        }
      }
    }

    case ADD_SELECTED_USER_RESERWATIONS: {
      const newCompanyUsersInformationsReserwations = [
        ...state.companyUsersInformations,
      ]
      const userSelectedIndex = state.companyUsersInformations.findIndex(
        item => item.userId._id === action.userSelectedId
      )
      if (userSelectedIndex >= 0) {
        newCompanyUsersInformationsReserwations[
          userSelectedIndex
        ].reserwations = action.reserwations
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformationsReserwations,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case RESET_BELL_ALERT: {
      return {
        ...state,
        bellAlertsActive: action.value,
      }
    }

    case ADD_NEW_MESSAGE_WORKER_USER_INFORMATION: {
       const newCompanyUsersInformationsInformations = [
         ...state.companyUsersInformations,
       ]
       const userSelectedIndex = state.companyUsersInformations.findIndex(
         item => item.userId._id === action.selectedUserId
       )
       if (userSelectedIndex >= 0) {
         const validUserInformations =
           newCompanyUsersInformationsInformations[userSelectedIndex]
             .informations ? newCompanyUsersInformationsInformations[userSelectedIndex]
             .informations : []

         validUserInformations.unshift(action.newMessage)
         newCompanyUsersInformationsInformations[
           userSelectedIndex
         ].informations = validUserInformations
         return {
           ...state,
           companyUsersInformations: newCompanyUsersInformationsInformations,
         }
       } else {
         return {
           ...state,
         }
       }
    }

    case ADD_NEW_PHONE_WORKER_USER_INFORMATION: {
      const newCompanyUsersInformationsPhone = [
        ...state.companyUsersInformations,
      ]
      const findIndexUserPhone = newCompanyUsersInformationsPhone.findIndex(
        hist => hist.userId._id === action.selectedUserId
      )
      if (findIndexUserPhone >= 0) {
        newCompanyUsersInformationsPhone[findIndexUserPhone].numberPhone =
          action.userPhone
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformationsPhone,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case DELETE_MESSAGE_WORKER_USER_INFORMATION: {
      const newCompanyUsersInformationsDelete = [
        ...state.companyUsersInformations,
      ]
      const findIndexUserMessageDelete = newCompanyUsersInformationsDelete.findIndex(
        hist => hist.userId._id === action.selectedUserId
      )
      if (findIndexUserMessageDelete >= 0) {
        const filterArray = newCompanyUsersInformationsDelete[
          findIndexUserMessageDelete
        ].informations.filter(message => message._id !== action.messageId)
        newCompanyUsersInformationsDelete[
          findIndexUserMessageDelete
        ].informations = filterArray
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformationsDelete,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case ADD_TO_USER_INFORMATIONS: {
      const newCompanyUsersInformationsInformations = [
        ...state.companyUsersInformations,
      ]
      const userSelectedIndex = state.companyUsersInformations.findIndex(
        item => item.userId._id === action.userSelectedId
      )
      if (userSelectedIndex >= 0){
        newCompanyUsersInformationsInformations[userSelectedIndex].informations = action.messages
        newCompanyUsersInformationsInformations[userSelectedIndex].firstUserInformationsFetch = true
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformationsInformations,
        }
      }else{
        return {
          ...state,
        }
      }
        
    }

    case WORKER_USERS_INFORMATIONS_BLOCK: {
      const newCompanyUsersInformationsBlocked = [
        ...state.companyUsersInformations,
      ]
      const findIndexUserHistory = newCompanyUsersInformationsBlocked.findIndex(
        hist => hist.userId._id === action.selectedUserId
      )
      if (findIndexUserHistory >= 0) {
        newCompanyUsersInformationsBlocked[findIndexUserHistory].isBlocked =
          action.isBlocked
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformationsBlocked,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case WORKER_MORE_USERS_HISTORY_INFORMATIONS: {
      const newCompanyUsersInformations = [...state.companyUsersInformations]
      const findIndexUserHistory = newCompanyUsersInformations.findIndex(
        hist => hist.userId._id === action.userSelectedId
      )
      if (findIndexUserHistory >= 0) {
        newCompanyUsersInformations[
          findIndexUserHistory
        ].reserwations.push(...action.data)
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformations,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case WORKER_MORE_USERS_MESSAGES_INFORMATIONS: {
      const newCompanyUsersInformations = [...state.companyUsersInformations]
      const findIndexUserHistory = newCompanyUsersInformations.findIndex(
        hist => hist.userId._id === action.selectedUserId
      )
      if (findIndexUserHistory >= 0) {
        newCompanyUsersInformations[
          findIndexUserHistory
        ].informations.push(...action.data)
        return {
          ...state,
          companyUsersInformations: newCompanyUsersInformations,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case WORKER_USERS_INFORMATIONS: {
      return {
        ...state,
        companyUsersInformations: action.data,
      }
    }

    case ADD_NEW_ALERTS: {
      const newAllertsUser = { ...state.user }
      if (!!newAllertsUser) {
        newAllertsUser.alerts.push(...action.data)
      }
      return {
        ...state,
        user: newAllertsUser,
      }
    }
    case ADD_NEW_USER_ALERT: {
      const newUserWithAlerts = { ...state.user }
      const alertsUserValid = !!state.user.alerts ? state.user.alerts : []
      if (!!newUserWithAlerts) {
        newUserWithAlerts.alerts = [action.data, ...alertsUserValid]
        newUserWithAlerts.alertActiveCount = state.user.alertActiveCount + 1
      }
      return {
        ...state,
        user: newUserWithAlerts,
      }
    }

    case RESET_USER_ALERTS: {
      const newResetUserWithAlerts = { ...state.user }
      if (!!newResetUserWithAlerts) {
        newResetUserWithAlerts.alertActiveCount = 0
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
      } else {
        return {
          ...state,
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
    // case CHANGE_EDITED_WORKER_HOURS:
    //   return {
    //     ...state,
    //     editedWorkersHours: action.item,
    //   }
    case CHANGE_EDIT_WORKER_HOURS:{
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
        }, 100)
        return {
          ...state,
          editWorkerHours: action.value,
        }
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
