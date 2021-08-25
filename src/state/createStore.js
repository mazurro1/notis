import { createStore as reduxCreateStore } from "redux"
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"

import {
  CHANGE_ACCTIVE_ACCOUNT,
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
  UPDATE_USER_PHONE,
  CHANGE_USER_PROFIL_VISIBLE,
  CHANGE_REMIND_PASSWORD_VISIBLE,
  CHANGE_REMIND_PASSWORD_EMAIL_SENT,
  CHANGE_CREATE_COMPANY_VISIBLE,
  CHANGE_BLIND_STYLE,
  CHANGE_DARK_STYLE,
  CHANGE_LANGUAGE_STYLE,
  CHANGE_ALERT_EXTRA,
  RESET_USER_PROFIL,
  ADD_FAVOURITES_COMPANY,
  DELETE_FAVOURITES_COMPANY,
  RESET_USER_FAVOURITES,
  VERYFIED_USER_PHONE,
  HEIGHT_NAV_INDUSTRIES,
  VISIBLE_NAV_INDUSTRIES,
  ADD_TOKEN_AUTO_LOGIN_VISIBLE,
  VERIFIED_PHONE_COMPONENT,
  ADD_CHECKOUT_ID,
  ADD_COINS_OFFER,
  CHANGE_POPUP_TAKE_PLACE,
  CHANGE_SELECTED_NAME_MENU,
  CHANGE_SELECTED_USER_COMPANY,
  RESET_UPDATE_USER_PHONE,
  ADD_USER_HISTORY_SERVICES,
  ADD_USER_HISTORY_COMMUNITINGS,
  CANCEL_USER_COMMUNITING,
  RESET_USER_HISTORY_COMMUNITINGS,
  RESET_USER_HISTORY_SERVICES,
  RESET_USER_MENU,
  UPDATE_DOWNLOADED_COMMUNITING,
  UPDATE_DOWNLOADED_SERVICE,
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  UPDATE_BLOCK_SEND_VERYFIED_PHONE_SMS,
  RESET_COMPANY_EDIT_PROFIL,
  UPDATE_STATUS_ACTIVE_COMPANY_EMAIL,
  ADD_EDITED_OPINION_TO_SERVICE,
  ADD_EDITED_OPINION_TO_COMMUNITING,
  ADD_NEW_OPINION_TO_SERVICE,
  UPDATE_COMPANY_SERVICE_PHONE_USER,
  UPDATE_COMPANY_COMMUNITING_PHONE_USER,
  UPDATE_SERVICE_COMPANY_SERVICES,
  UPDATE_COMMUNITING_COMPANY_COMMUNITING,
  DELETE_COMPANY_SERVICE,
  DELETE_COMPANY_COMMUNITING,
  RESET_COMPANY_SERVICES,
  RESET_COMPANY_COMMUNITINGS,
  UPDATE_COMPANY_SERVICES,
  UPDATE_COMPANY_COMMUNITINGS,
  ADD_COMPANY_SERVICES,
  ADD_COMPANY_COMMUNITINGS,
  UPDATE_DEFAULT_COMPANY,
  CHANGE_RESTART_COMPANY_NIP,
  UPDATE_COMPANY_NIP,
  CHANGE_RESTART_COMPANY_LINK,
  UPDATE_COMPANY_LINK_PATH,
  CHANGE_LIST_MAP_OFFERS,
  CHANGE_MAP_ACTIVE,
  UPDATE_COMPANY_MARKER,
  UPDATE_GEOLOCATION_MARKS,
  RESTART_COMPANY_SMS,
  ACUTLIZATION_SMS_COMPANY_CLIENTS,
  RESET_COMPANY_STATS,
  UPDATE_COMPANY_SMS_SETTINGS,
  ADD_COMPANY_TRANSACTION_HISTORY,
  CHANGE_USER_BLOCK_SMS_SEND,
  ERROR_LOADING_PAGE,
  DELETE_COMPANY_CONFIRM,
  DELETE_COMPANY_USER,
  CONFIRM_DELETE_COMPANY,
  UPDATE_RESERWATION_WORKER_DATA,
  DELETE_RESERWATION_WORKER_DATA,
  ADD_RESERWATION_WORKER_DATA,
  ADD_WORKER_CLIENT_RESERWATION_DATA,
  RESET_WORKER_NEW_CLIENT_RESERWATION,
  SAVE_COMPANY_STATS,
  SAVE_EDITED_COMPANY_SHOP_STORE,
  EDIT_USER_COMPANY_AVAILABILITY,
  DELETE_USER_COMPANY_AVAILABILITY,
  RESER_USER_COMPANY_AVAILABILITY,
  ADD_USER_COMPANY_AVAILABILITY,
  UPDATE_USER_RESERWATIONS_COUNT,
  ADD_NEW_COMPANY_STAMPS,
  RESET_UPDATE_STAMPS,
  UPDATE_COMPANY_STAMPS,
  DELETE_COMPANY_STAMPS,
  UPDATE_USER_IMAGE,
  CHANGE_ACTIVE_WORKER,
  CHANGE_WORKING_HOURS,
  RESET_OPINION,
  CHANGE_COMPANY_MAIN_IMAGE,
  UPDATED_IMAGE_ID_COMPANY,
  UPDATE_COMPANY_IMAGE,
  DELETE_COMPANY_IMAGE,
  ADD_NEW_OPINION_TO_RESERWATION,
  ADD_NEW_OPINION_TO_COMMUNITING,
  ADD_EDITED_OPINION_TO_RESERWATION,
  ADD_REPLAY_TO_OPINION,
  ADD_NEW_OPINIONS_COMPANY,
  UPDATE_PROMOTIONS,
  UPDATE_COMPANY_PATH_PROMOTION,
  DELETE_COMPANY_PROMOTION,
  UPDATE_COMPANY_HAPPY_HOURS_NO_CONST,
  UPDATE_CONST_HAPPY_HOURS,
  UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH,
  DELETE_COMPANY_HAPPY_HOUR_CONST,
  UPDATE_COMPANY_HAPPY_HOURS_CONST,
  UPDATE_COMPANY_MAPS,
  UPDATE_COMPANY_OPENING_HOURS,
  UPDATE_COMPANY_TEKSTS,
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
  CHANGE_RESERWATION_USER,
  CHANGE_EDIT_WORKER_HOURS,
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
  DELETE_WORKER_FROM_COMPANY,
  RESET_WORKER_DELETE,
} from "./actions"

const initialState = {
  siteProps: {
    blind: false,
    dark: false,
    language: "PL",
  },
  user: null,
  userProfilReset: false,
  resetUserMenu: false,
  userId: null,
  userResetFavourites: false,
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
  district: null,
  localizationDataLoading: false,
  filterVisible: false,
  filters: null,
  filterDataLoading: false,
  sortVisible: false,
  sorts: null,
  sortDataLoading: false,
  placesData: [],
  loadingPlaces: false,
  alerts: [],
  alertExtra: {
    name: null,
    active: false,
  },
  activeAccountVisible: false,
  heightMenuIndustries: 137,
  visibleMenuIndustries: false,
  visibleTokenToAutoLogin: false,
  verifiedPhoneComponentVisible: false,
  checkoutPaymentItem: null,
  coinsOffer: [],
  resetUserPhone: false,
  userHistoryServices: [],
  resetUserHistoryService: false,
  userHistoryCommunitings: [],
  resetUserHistoryCommunitings: false,
  downloadedCommuniting: null,
  downloadedService: null,
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  selectedListMapView: {
    value: 1,
    label: "Lista ofert",
  },
  resetCompanyEditProfil: false,
  resetWorkerNewClientReserwation: false,
  companyTransactionHistory: [],
  errorLoadingPage: false,
  deleteCompanyConfirm: false,
  confirmDeleteCompanyVisible: false,
  userCompanyAvailability: [],
  userCompanyAvailabilityPermission: false,
  resetUserCompanyAvailability: false,
  updatedImageIdCompany: null,
  bellAlertsActive: false,
  companyUsersInformations: [],
  avaibleHoursReserwation: [],
  avaibleHoursReserwationUpdate: false,
  resetCompany: false,
  reserwationData: {},
  reserwationEnable: false,
  editWorkerHours: false,
  editWorkerHoursData: null,
  pathCompanyData: null,
  workCompanyData: null,
  resetWorkerDelete: false,
  updateConstHappyHours: false,
  updatePromotions: false,
  userHistoryReserwations: [],
  workerHistoryReserwations: null,
  resetWorkerProps: false,
  resetOpinion: false,
  workingHours: null,
  activeWorkerUserId: null,
  companyStats: null,
  stampsUpdate: false,
  restartSMSCompany: false,
  mapGeolocation: null,
  mapMarks: [],
  companyMarker: null,
  mapActive: false,
  resetChangeReserwationUser: false,
  popupTakePlace: false,
  selectedNameMenu: "",
  restartCompanyLink: false,
  restartCompanyNip: false,
  companyServices: {
    workers: null,
    services: [],
  },
  resetCompanyServices: false,
  companyCommunitings: {
    workers: null,
    communitings: [],
  },
  resetCompanyCommunitings: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DOWNLOADED_SERVICE: {
      return {
        ...state,
        downloadedService: action.service,
      }
    }

    case UPDATE_DOWNLOADED_COMMUNITING: {
      return {
        ...state,
        downloadedCommuniting: action.communiting,
      }
    }

    case RESET_USER_MENU: {
      return {
        ...state,
        resetUserMenu: action.value,
      }
    }

    case RESET_USER_HISTORY_SERVICES: {
      return {
        ...state,
        resetUserHistoryService: false,
      }
    }

    case RESET_USER_HISTORY_COMMUNITINGS: {
      return {
        ...state,
        resetUserHistoryCommunitings: false,
      }
    }

    case CANCEL_USER_COMMUNITING: {
      const cancelUserCommunitings = [...state.userHistoryCommunitings]
      if (!!action.communityId) {
        const findIndexItem = cancelUserCommunitings.findIndex(
          itemCom => itemCom._id === action.communityId
        )

        if (findIndexItem >= 0) {
          cancelUserCommunitings[findIndexItem].statusValue = 4
        }
      }
      return {
        ...state,
        userHistoryCommunitings: cancelUserCommunitings,
        resetUserHistoryCommunitings: true,
      }
    }

    case ADD_USER_HISTORY_COMMUNITINGS: {
      return {
        ...state,
        userHistoryCommunitings: action.userCommunitings,
      }
    }

    case ADD_USER_HISTORY_SERVICES: {
      return {
        ...state,
        userHistoryServices: action.userServices,
      }
    }

    case CHANGE_SELECTED_USER_COMPANY: {
      const changedUserCompany = !!state.user ? state.user : null
      if (!!changedUserCompany) {
        const findIdCompany = changedUserCompany.allCompanys.find(
          itemCompany => itemCompany._id === action.companyId
        )
        if (!!findIdCompany) {
          changedUserCompany.company = findIdCompany
        }
      }

      return {
        ...state,
        user: changedUserCompany,
        userProfilReset: true,
        companyTransactionHistory: [],
        userCompanyAvailability: [],
        companyUsersInformations: [],
        avaibleHoursReserwation: [],
        workCompanyData: null,
        workerHistoryReserwations: null,
        workingHours: null,
        activeWorkerUserId: null,
        companyServices: {
          workers: null,
          services: [],
        },
      }
    }

    case CHANGE_SELECTED_NAME_MENU: {
      return {
        ...state,
        selectedNameMenu: action.value,
      }
    }

    case CHANGE_POPUP_TAKE_PLACE: {
      return {
        ...state,
        popupTakePlace: action.value,
      }
    }
    case ADD_COINS_OFFER: {
      return {
        ...state,
        coinsOffer: !!action.data ? action.data : null,
      }
    }
    case ADD_CHECKOUT_ID: {
      return {
        ...state,
        checkoutPaymentItem: !!action.paymentItem ? action.paymentItem : null,
      }
    }
    case VERIFIED_PHONE_COMPONENT: {
      return {
        ...state,
        verifiedPhoneComponentVisible: action.value,
      }
    }
    case ADD_TOKEN_AUTO_LOGIN_VISIBLE: {
      return {
        ...state,
        visibleTokenToAutoLogin: action.value,
      }
    }
    case VISIBLE_NAV_INDUSTRIES: {
      return {
        ...state,
        visibleMenuIndustries: action.value,
      }
    }
    case HEIGHT_NAV_INDUSTRIES: {
      return {
        ...state,
        heightMenuIndustries: action.value,
      }
    }
    case VERYFIED_USER_PHONE: {
      const newUserVerifiedPhone = !!state.user ? { ...state.user } : null
      if (!!newUserVerifiedPhone) {
        newUserVerifiedPhone.phoneVerified = true
      }
      return {
        ...state,
        user: newUserVerifiedPhone,
        userProfilReset: true,
        verifiedPhoneComponentVisible: false,
      }
    }

    case CHANGE_ACCTIVE_ACCOUNT: {
      return {
        ...state,
        activeAccountVisible: action.data,
      }
    }
    case CHANGE_ALERT_EXTRA: {
      return {
        ...state,
        alertExtra: {
          name: !!action.name ? action.name : state.alertExtra.name,
          active: action.value,
        },
      }
    }

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

    case CHANGE_USER_BLOCK_SMS_SEND: {
      const newUserEditedSms = !!state.user ? { ...state.user } : null
      if (newUserEditedSms) {
        newUserEditedSms.blockUserSendVerifiedPhoneSms = action.date
      }
      return {
        ...state,
        user: newUserEditedSms,
      }
    }

    case RESET_UPDATE_USER_PHONE: {
      return {
        ...state,
        resetUserPhone: false,
      }
    }

    case UPDATE_USER_PHONE: {
      return {
        ...state,
        userPhone: action.phone,
        resetUserPhone: true,
      }
    }

    case ADD_USER_PHONE: {
      const newUserEdited = !!state.user ? { ...state.user } : null
      if (!!newUserEdited) {
        if (!!action.email || action.token) {
          newUserEdited.token = action.token
          newUserEdited.email = action.email
          newUserEdited.phoneVerified = action.phoneVerified
          newUserEdited.hasPhone = action.hasPhone
          newUserEdited.blockUserChangePhoneNumber =
            action.blockUserChangePhoneNumber
          newUserEdited.blockUserSendVerifiedPhoneSms =
            action.blockUserSendVerifiedPhoneSms
        }
      }
      return {
        ...state,
        userPhone: action.phone,
        user: newUserEdited,
        userProfilReset: true,
      }
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

    case LOGIN: {
      const sitePropsLogin = { ...state.siteProps }
      if (!!sitePropsLogin && !!action.user) {
        if (!!action.user.language) {
          sitePropsLogin.language = action.user.language.toUpperCase()
          sitePropsLogin.dark = action.user.darkMode
          sitePropsLogin.blind = action.user.blindMode
        }
      }
      return {
        ...state,
        user: action.user,
        userId: action.user.userId,
        activeAccountVisible: !action.user.accountVerified,
        siteProps: sitePropsLogin,
      }
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

    case CHANGE_LOCALIZATION_VALUE: {
      return {
        ...state,
        localization: action.value,
        localizationVisible: false,
        district: action.district,
      }
    }
    case UPDATE_USER_IMAGE: {
      const userImage = !!state.user ? state.user : null
      if (userImage) {
        userImage.imageUrl = action.imageUrl
      }
      return {
        ...state,
        user: userImage,
        userProfilReset: true,
      }
    }

    case RESET_USER_PROFIL: {
      return {
        ...state,
        userProfilReset: false,
      }
    }

    case UPDATE_USER_RESERWATIONS_COUNT: {
      const userProfilToResetReserwationsCount = !!state.user
        ? state.user
        : null
      if (!!userProfilToResetReserwationsCount && action.isStampActive) {
        const findIndexCompany = userProfilToResetReserwationsCount.stamps.findIndex(
          item => item.companyId._id === action.companyId
        )
        if (findIndexCompany >= 0) {
          userProfilToResetReserwationsCount.stamps[
            findIndexCompany
          ].reserwations.sort((a, b) => {
            const firstItemToSort = new Date(a.fullDate)
            const secondItemToSort = new Date(b.fullDate)
            if (firstItemToSort < secondItemToSort) return -1
            if (firstItemToSort > secondItemToSort) return 1
            return 0
          })
          const badDateReserwations = []
          const goodDateReserwations = []

          userProfilToResetReserwationsCount.stamps[
            findIndexCompany
          ].reserwations.forEach(stampReserwation => {
            const splitDateEnd = stampReserwation.dateEnd.split("")
            const reserwationStampDateEnd = new Date(
              stampReserwation.dateYear,
              stampReserwation.dateMonth - 1,
              stampReserwation.dateDay,
              Number(splitDateEnd[0]),
              Number(splitDateEnd[1])
            )

            if (
              !!!stampReserwation.visitCanceled &&
              reserwationStampDateEnd < new Date()
            ) {
              goodDateReserwations.push(stampReserwation)
            } else {
              badDateReserwations.push(stampReserwation)
            }
          })
          const newGoodDateReserwation = goodDateReserwations.slice(
            action.countStampsToActive
          )

          const newUserReserwationsCount = [
            ...badDateReserwations,
            ...newGoodDateReserwation,
          ]

          userProfilToResetReserwationsCount.stamps[
            findIndexCompany
          ].reserwations = newUserReserwationsCount
        }
      }
      return {
        ...state,
        user: userProfilToResetReserwationsCount,
      }
    }

    case DELETE_FAVOURITES_COMPANY: {
      const userProfilFavouritesDelete = !!state.user ? state.user : null

      if (!!userProfilFavouritesDelete) {
        const filterUserFavourites = userProfilFavouritesDelete.favouritesCompanys.filter(
          item => {
            return item._id !== action.companyId
          }
        )
        userProfilFavouritesDelete.favouritesCompanys = filterUserFavourites
      }

      return {
        ...state,
        user: userProfilFavouritesDelete,
        userResetFavourites: true,
      }
    }

    case ADD_FAVOURITES_COMPANY: {
      const userProfilFavouritesAdd = !!state.user ? state.user : null

      if (!!userProfilFavouritesAdd) {
        const isInUserFavourites = userProfilFavouritesAdd.favouritesCompanys.some(
          item => item === action.favouriteAddData._id
        )
        if (!isInUserFavourites) {
          userProfilFavouritesAdd.favouritesCompanys.push(
            action.favouriteAddData
          )
        }
      }

      return {
        ...state,
        user: userProfilFavouritesAdd,
        userResetFavourites: true,
      }
    }

    case RESET_USER_FAVOURITES: {
      return {
        ...state,
        userResetFavourites: false,
      }
    }

    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY

    case RESET_COMPANY_EDIT_PROFIL: {
      return {
        ...state,
        resetCompanyEditProfil: action.value,
      }
    }

    case UPDATE_BLOCK_SEND_VERYFIED_PHONE_SMS: {
      const userCompanyToConfirm = !!state.user ? state.user : null
      if (!!userCompanyToConfirm) {
        if (!!userCompanyToConfirm.company) {
          if (userCompanyToConfirm.company._id === action.companyId) {
            userCompanyToConfirm.company.blockSendVerifiedPhoneSms =
              action.blockSendVerifiedPhoneSms
          }
        }
        if (!!userCompanyToConfirm.allCompanys) {
          const findIndexCompany = userCompanyToConfirm.allCompanys.findIndex(
            itemCompany => itemCompany._id === action.companyId
          )
          if (findIndexCompany >= 0) {
            userCompanyToConfirm.allCompanys[
              findIndexCompany
            ].blockSendVerifiedPhoneSms = action.blockSendVerifiedPhoneSms
          }
        }
      }
      return {
        ...state,
        user: userCompanyToConfirm,
        resetCompanyEditProfil: true,
      }
    }

    case UPDATE_STATUS_ACTIVE_COMPANY_EMAIL: {
      const userCompanyToConfirm = !!state.user ? state.user : null
      if (!!userCompanyToConfirm) {
        if (!!userCompanyToConfirm.company) {
          if (userCompanyToConfirm.company._id === action.companyId) {
            userCompanyToConfirm.company.accountEmailVerified =
              action.accountEmailVerified
            userCompanyToConfirm.company.codeToVerifiedPhone =
              action.codeToVerifiedPhone
          }
        }
        if (!!userCompanyToConfirm.allCompanys) {
          const findIndexCompany = userCompanyToConfirm.allCompanys.findIndex(
            itemCompany => itemCompany._id === action.companyId
          )
          if (findIndexCompany >= 0) {
            userCompanyToConfirm.allCompanys[
              findIndexCompany
            ].accountEmailVerified = action.accountEmailVerified
            userCompanyToConfirm.allCompanys[
              findIndexCompany
            ].codeToVerifiedPhone = action.codeToVerifiedPhone
          }
        }
      }
      return {
        ...state,
        user: userCompanyToConfirm,
        resetCompanyEditProfil: true,
      }
    }

    case ADD_COMPANY_COMMUNITINGS: {
      const allCompanyCommunitings = { ...state.companyCommunitings }
      if (!!action.workers) {
        allCompanyCommunitings.workers = action.workers
      }
      if (!!action.communitings) {
        allCompanyCommunitings.communitings = action.communitings
      }
      return {
        ...state,
        companyCommunitings: allCompanyCommunitings,
      }
    }

    case ADD_COMPANY_SERVICES: {
      const allCompanyServices = { ...state.companyServices }
      if (!!action.workers) {
        allCompanyServices.workers = action.workers
      }
      if (!!action.services) {
        allCompanyServices.services = action.services
      }
      return {
        ...state,
        companyServices: allCompanyServices,
      }
    }

    case DELETE_COMPANY_COMMUNITING: {
      let deleteCompanyCommuniting = { ...state.companyCommunitings }
      if (!!action.communitingId) {
        const filterCommunitings = deleteCompanyCommuniting.communitings.filter(
          item => item._id !== action.communitingId
        )
        deleteCompanyCommuniting.communitings = filterCommunitings
      }
      return {
        ...state,
        resetCompanyCommunitings: true,
        companyCommunitings: deleteCompanyCommuniting,
      }
    }

    case DELETE_COMPANY_SERVICE: {
      let deleteCompanyService = { ...state.companyServices }
      if (!!deleteCompanyService) {
        deleteCompanyService.services = deleteCompanyService.services.filter(
          item => item._id !== action.serviceId
        )
      }
      return {
        ...state,
        resetCompanyServices: true,
        companyServices: deleteCompanyService,
      }
    }

    case UPDATE_COMPANY_COMMUNITING_PHONE_USER: {
      let updatePhoneCompanyCommunitings = { ...state.companyCommunitings }
      if (!!action.communitingId && !!action.userPhone) {
        const findIndexService = updatePhoneCompanyCommunitings.communitings.findIndex(
          item => item._id === action.communitingId
        )
        if (findIndexService >= 0) {
          updatePhoneCompanyCommunitings.communitings[findIndexService].phone =
            action.userPhone
        }
      }
      return {
        ...state,
        companyCommunitings: updatePhoneCompanyCommunitings,
      }
    }

    case UPDATE_COMPANY_SERVICE_PHONE_USER: {
      let updatePhoneCompanyService = { ...state.companyServices }
      if (!!action.serviceId && !!action.userPhone) {
        const findIndexService = updatePhoneCompanyService.services.findIndex(
          item => item._id === action.serviceId
        )
        if (findIndexService >= 0) {
          updatePhoneCompanyService.services[findIndexService].phone =
            action.userPhone
        }
      }
      return {
        ...state,
        companyServices: updatePhoneCompanyService,
      }
    }

    case UPDATE_COMMUNITING_COMPANY_COMMUNITING: {
      let updateCompanyCommuniting = { ...state.companyCommunitings }
      if (!!action.updatedCommuniting) {
        const findIndexService = updateCompanyCommuniting.communitings.findIndex(
          item => item._id === action.updatedCommuniting.communitingId
        )
        if (findIndexService >= 0) {
          if (
            updateCompanyCommuniting.communitings[findIndexService].workerUserId
              ._id !== action.updatedCommuniting.selectedWorkerUserId
          ) {
            const filterService = updateCompanyCommuniting.communitings.filter(
              itemFilter =>
                itemFilter._id !== action.updatedCommuniting.communitingId
            )
            updateCompanyCommuniting.communitings = filterService
          } else {
            updateCompanyCommuniting.communitings[
              findIndexService
            ].description = action.updatedCommuniting.description
            updateCompanyCommuniting.communitings[findIndexService].cost =
              action.updatedCommuniting.cost
            updateCompanyCommuniting.communitings[
              findIndexService
            ].statusValue = action.updatedCommuniting.statusValue

            updateCompanyCommuniting.communitings[findIndexService].timeStart =
              action.updatedCommuniting.timeStart

            updateCompanyCommuniting.communitings[findIndexService].timeEnd =
              action.updatedCommuniting.timeEnd

            const splitFullDate = action.updatedCommuniting.fullDate.split("-")

            updateCompanyCommuniting.communitings[
              findIndexService
            ].day = Number(splitFullDate[0])

            updateCompanyCommuniting.communitings[
              findIndexService
            ].month = Number(splitFullDate[1])

            updateCompanyCommuniting.communitings[
              findIndexService
            ].year = Number(splitFullDate[2])
          }
        }
      }
      return {
        ...state,
        companyCommunitings: updateCompanyCommuniting,
        resetCompanyCommunitings: true,
      }
    }

    case UPDATE_SERVICE_COMPANY_SERVICES: {
      let updateCompanyService = { ...state.companyServices }
      if (!!action.updatedService) {
        const findIndexService = updateCompanyService.services.findIndex(
          item => item._id === action.updatedService.serviceId
        )
        if (findIndexService >= 0) {
          if (
            updateCompanyService.services[findIndexService].workerUserId._id !==
            action.updatedService.selectedWorkerUserId
          ) {
            const filterService = updateCompanyService.services.filter(
              itemFilter => itemFilter._id !== action.updatedService.serviceId
            )
            updateCompanyService.services = filterService
          } else {
            updateCompanyService.services[findIndexService].objectName =
              action.updatedService.objectName
            updateCompanyService.services[findIndexService].description =
              action.updatedService.description
            updateCompanyService.services[findIndexService].cost =
              action.updatedService.cost
            updateCompanyService.services[findIndexService].statusValue =
              action.updatedService.statusValue
          }
        }
      }
      return {
        ...state,
        companyServices: updateCompanyService,
        resetCompanyServices: true,
      }
    }

    case UPDATE_COMPANY_COMMUNITINGS: {
      let newCompanyCommuniting = { ...state.companyCommunitings }
      if (!!action.newCommunitings) {
        newCompanyCommuniting.communitings = [
          ...newCompanyCommuniting.communitings,
          action.newCommunitings,
        ]
      }
      return {
        ...state,
        companyCommunitings: newCompanyCommuniting,
        resetCompanyCommunitings: true,
      }
    }

    case UPDATE_COMPANY_SERVICES: {
      let newCompanyService = { ...state.companyServices }
      if (!!action.newService) {
        newCompanyService.services = [
          ...newCompanyService.services,
          action.newService,
        ]
      }
      return {
        ...state,
        companyServices: newCompanyService,
        resetCompanyServices: true,
      }
    }

    case UPDATE_DEFAULT_COMPANY: {
      const userDefaultCompany = !!state.user ? state.user : null
      if (!!userDefaultCompany) {
        userDefaultCompany.defaultCompany = action.companyId
      }
      return {
        ...state,
        user: userDefaultCompany,
        userProfilReset: true,
      }
    }

    case RESET_COMPANY_COMMUNITINGS: {
      return {
        ...state,
        resetCompanyCommunitings: false,
      }
    }

    case RESET_COMPANY_SERVICES: {
      return {
        ...state,
        resetCompanyServices: false,
      }
    }

    case CHANGE_RESTART_COMPANY_NIP: {
      return {
        ...state,
        restartCompanyNip: false,
      }
    }

    case UPDATE_COMPANY_NIP: {
      const newNipWorkCompanyData = !!state.workCompanyData
        ? state.workCompanyData
        : null
      if (!!newNipWorkCompanyData) {
        newNipWorkCompanyData.nip = action.nip
        newNipWorkCompanyData.dataToInvoice = action.dateInvoice
      }
      return {
        ...state,
        workCompanyData: newNipWorkCompanyData,
        restartCompanyNip: true,
      }
    }

    case CHANGE_RESTART_COMPANY_LINK: {
      return {
        ...state,
        restartCompanyLink: false,
      }
    }

    case UPDATE_COMPANY_LINK_PATH: {
      const newLinkWorkCompanyData = !!state.workCompanyData
        ? state.workCompanyData
        : null
      if (!!newLinkWorkCompanyData) {
        newLinkWorkCompanyData.linkPath = action.linkPath
      }
      return {
        ...state,
        workCompanyData: newLinkWorkCompanyData,
        restartCompanyLink: true,
      }
    }

    case CHANGE_LIST_MAP_OFFERS: {
      return {
        ...state,
        selectedListMapView: action.value,
      }
    }

    case CHANGE_RESERWATION_USER: {
      return {
        ...state,
        resetChangeReserwationUser: action.value,
      }
    }

    case CHANGE_MAP_ACTIVE: {
      return {
        ...state,
        mapActive: action.value,
      }
    }

    case UPDATE_COMPANY_MARKER: {
      return {
        ...state,
        companyMarker: action.data,
      }
    }

    case UPDATE_GEOLOCATION_MARKS: {
      return {
        ...state,
        mapMarks: action.marks,
        mapGeolocation: action.geolocation,
      }
    }

    case RESTART_COMPANY_SMS: {
      return {
        ...state,
        restartSMSCompany: false,
      }
    }

    case ACUTLIZATION_SMS_COMPANY_CLIENTS: {
      const incUserCompanySMS = !!state.user ? { ...state.user } : null
      if (!!incUserCompanySMS) {
        if (!!incUserCompanySMS.company) {
          incUserCompanySMS.company.sms =
            incUserCompanySMS.company.sms - Number(action.countMessages)
        }
      }
      return {
        ...state,
        user: incUserCompanySMS,
        restartSMSCompany: true,
      }
    }

    case UPDATE_COMPANY_SMS_SETTINGS: {
      const newWorkCompanyDataSMS = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!newWorkCompanyDataSMS) {
        newWorkCompanyDataSMS.smsReserwationAvaible =
          action.smsReserwationAvaible
        newWorkCompanyDataSMS.smsReserwationChangedUserAvaible =
          action.smsReserwationChangedUserAvaible
        newWorkCompanyDataSMS.smsNotifactionAvaible =
          action.smsNotifactionAvaible
        newWorkCompanyDataSMS.smsCanceledAvaible = action.smsCanceledAvaible
        newWorkCompanyDataSMS.smsChangedAvaible = action.smsChangedAvaible

        newWorkCompanyDataSMS.smsServiceCreatedAvaible =
          action.smsServiceCreatedAvaible
        newWorkCompanyDataSMS.smsServiceChangedAvaible =
          action.smsServiceChangedAvaible
        newWorkCompanyDataSMS.smsServiceFinishedAvaible =
          action.smsServiceFinishedAvaible
        newWorkCompanyDataSMS.smsServiceCanceledAvaible =
          action.smsServiceCanceledAvaible
        newWorkCompanyDataSMS.smsCommunitingNotificationAvaible =
          action.smsCommunitingNotificationAvaible
        newWorkCompanyDataSMS.smsCommunitingCreatedAvaible =
          action.smsCommunitingCreatedAvaible
        newWorkCompanyDataSMS.smsCommunitingChangedAvaible =
          action.smsCommunitingChangedAvaible
        newWorkCompanyDataSMS.smsCommunitingCanceledAvaible =
          action.smsCommunitingCanceledAvaible
      }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataSMS,
      }
    }

    case ADD_COMPANY_TRANSACTION_HISTORY: {
      return {
        ...state,
        companyTransactionHistory: !!action.data ? action.data : null,
      }
    }

    case ERROR_LOADING_PAGE: {
      return {
        ...state,
        errorLoadingPage: action.value,
      }
    }

    case DELETE_COMPANY_CONFIRM: {
      return {
        ...state,
        deleteCompanyConfirm: false,
      }
    }

    case DELETE_COMPANY_USER: {
      const editedUser = !!state.user ? { ...state.user } : null
      if (!!editedUser) {
        const filterAllCompanysUser = editedUser.allCompanys.filter(
          itemCompany => itemCompany._id !== action.companyId
        )
        editedUser.allCompanys = filterAllCompanysUser
        editedUser.company =
          filterAllCompanysUser.length > 0 ? filterAllCompanysUser[0] : null
      }
      return {
        ...state,
        user: editedUser,
        deleteCompanyConfirm: true,
      }
    }

    case CONFIRM_DELETE_COMPANY: {
      return {
        ...state,
        confirmDeleteCompanyVisible: action.value,
      }
    }

    case UPDATE_RESERWATION_WORKER_DATA: {
      const updateWorkerHistoryReserwations = !!state.workerHistoryReserwations
        ? { ...state.workerHistoryReserwations }
        : null
      if (!!updateWorkerHistoryReserwations) {
        const findIdItem = updateWorkerHistoryReserwations.reserwations.findIndex(
          item => item._id === action.reserwationId
        )
        if (findIdItem >= 0) {
          if (action.changed !== null) {
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].visitChanged = action.changed
          }
          if (action.noFinished !== null) {
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].visitNotFinished = action.noFinished
          }
          if (!!action.newTimeStart) {
            updateWorkerHistoryReserwations.reserwations[findIdItem].dateStart =
              action.newTimeStart
          }
          if (!!action.newTimeEnd) {
            updateWorkerHistoryReserwations.reserwations[findIdItem].dateEnd =
              action.newTimeEnd
          }
          if (!!action.workerSelectedUserId) {
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].toWorkerUserId = action.workerSelectedUserId
          }
          if (!!action.dateReserwation) {
            const validDateStartReserwation = !!action.newTimeStart
              ? action.newTimeStart
              : updateWorkerHistoryReserwations.reserwations[findIdItem]
                  .dateStart
            const splitDateStartReserwation = validDateStartReserwation.split(
              ":"
            )
            const splitNewDateReserwation = action.dateReserwation.split("-")
            const newDateReserwationToSave = new Date(
              Number(splitNewDateReserwation[2]),
              Number(splitNewDateReserwation[1]) - 1,
              Number(splitNewDateReserwation[0]),
              Number(splitDateStartReserwation[0]),
              Number(splitDateStartReserwation[1])
            )
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].fullDate = newDateReserwationToSave
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].dateYear = Number(splitNewDateReserwation[2])
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].dateMonth = Number(splitNewDateReserwation[1])
            updateWorkerHistoryReserwations.reserwations[
              findIdItem
            ].dateDay = Number(splitNewDateReserwation[0])
          }
        }
      }
      return {
        ...state,
        workerHistoryReserwations: updateWorkerHistoryReserwations,
      }
    }

    case DELETE_RESERWATION_WORKER_DATA: {
      const deleteWorkerHistoryReserwations = !!state.workerHistoryReserwations
        ? { ...state.workerHistoryReserwations }
        : null
      if (!!action.dataId && !!deleteWorkerHistoryReserwations) {
        const filteredReserwations = deleteWorkerHistoryReserwations.reserwations.filter(
          item => item._id !== action.dataId
        )
        deleteWorkerHistoryReserwations.reserwations = filteredReserwations
      }
      return {
        ...state,
        workerHistoryReserwations: deleteWorkerHistoryReserwations,
      }
    }

    case ADD_WORKER_CLIENT_RESERWATION_DATA: {
      const newWorkerHistoryReserwations = !!state.workerHistoryReserwations
        ? { ...state.workerHistoryReserwations }
        : null
      if (!!action.data && !!newWorkerHistoryReserwations) {
        newWorkerHistoryReserwations.reserwations.push(action.data)
      }
      return {
        ...state,
        workerHistoryReserwations: newWorkerHistoryReserwations,
        resetWorkerNewClientReserwation: true,
      }
    }

    case RESET_WORKER_NEW_CLIENT_RESERWATION: {
      return {
        ...state,
        resetWorkerNewClientReserwation: false,
      }
    }

    case ADD_RESERWATION_WORKER_DATA: {
      const newWorkerHistoryReserwations = !!state.workerHistoryReserwations
        ? { ...state.workerHistoryReserwations }
        : null
      if (!!action.data && !!newWorkerHistoryReserwations) {
        newWorkerHistoryReserwations.reserwations.push(action.data)
      }
      return {
        ...state,
        workerHistoryReserwations: newWorkerHistoryReserwations,
      }
    }

    case SAVE_COMPANY_STATS: {
      let dateCompanyStats = null
      if (!!action.services && !!action.stats) {
        dateCompanyStats = {
          services: action.services,
          stats: action.stats,
          raportSMS: action.raportSMS,
          raportServices: action.raportServices,
          raportCommunitings: action.raportCommunitings,
        }
      }
      return {
        ...state,
        companyStats: dateCompanyStats,
      }
    }

    case RESET_COMPANY_STATS: {
      return {
        ...state,
        companyStats: null,
      }
    }

    case SAVE_EDITED_COMPANY_SHOP_STORE: {
      const patchWorkCompanyShopStore = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyShopStore) {
        patchWorkCompanyShopStore.shopStore = action.shopStore
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyShopStore,
      }
    }

    case EDIT_USER_COMPANY_AVAILABILITY: {
      let editUserCompanyAvailability = [...state.userCompanyAvailability]
      if (editUserCompanyAvailability.length > 0 && action.itemId) {
        const findIndexItem = editUserCompanyAvailability.findIndex(
          item => item._id === action.itemId
        )
        if (findIndexItem >= 0) {
          editUserCompanyAvailability[findIndexItem].itemName = action.itemName
          editUserCompanyAvailability[findIndexItem].itemCount =
            action.itemCount
        }
      }
      return {
        ...state,
        userCompanyAvailability: editUserCompanyAvailability,
        resetUserCompanyAvailability: true,
      }
    }

    case DELETE_USER_COMPANY_AVAILABILITY: {
      let newUserCompanyAvailability = [...state.userCompanyAvailability]
      if (newUserCompanyAvailability.length > 0 && action.itemId) {
        const filterItemsAvailability = newUserCompanyAvailability.filter(
          item => item._id !== action.itemId
        )
        newUserCompanyAvailability = filterItemsAvailability
      }
      return {
        ...state,
        userCompanyAvailability: newUserCompanyAvailability,
        resetUserCompanyAvailability: true,
      }
    }

    case RESER_USER_COMPANY_AVAILABILITY: {
      return {
        ...state,
        resetUserCompanyAvailability: false,
      }
    }

    case ADD_USER_COMPANY_AVAILABILITY: {
      let newUserCompanyAvailability = [...state.userCompanyAvailability]
      if (action.data.length > 0) {
        newUserCompanyAvailability = [...action.data]
      }
      return {
        ...state,
        userCompanyAvailability: newUserCompanyAvailability,
        userCompanyAvailabilityPermission:
          action.hasPermission !== null
            ? action.hasPermission
            : state.userCompanyAvailabilityPermission,
        resetUserCompanyAvailability: true,
      }
    }

    case ADD_NEW_COMPANY_STAMPS: {
      const patchWorkCompanyNewStamp = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyNewStamp) {
        if (patchWorkCompanyNewStamp._id === action.companyId) {
          patchWorkCompanyNewStamp.companyStamps = action.newCompanyStamps
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyNewStamp,
      }
    }

    case RESET_UPDATE_STAMPS: {
      return {
        ...state,
        stampsUpdate: false,
      }
    }

    case UPDATE_COMPANY_STAMPS: {
      const patchWorkCompanyNewStamp = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyNewStamp) {
        if (patchWorkCompanyNewStamp._id === action.companyId) {
          const findIndexCompanyStamps = patchWorkCompanyNewStamp.companyStamps.findIndex(
            item => item._id === action.stampData.stampId
          )
          if (findIndexCompanyStamps >= 0) {
            patchWorkCompanyNewStamp.companyStamps[
              findIndexCompanyStamps
            ].disabled = action.stampData.disabledStamp

            patchWorkCompanyNewStamp.companyStamps[
              findIndexCompanyStamps
            ].promotionPercent = action.stampData.promotionPercent

            patchWorkCompanyNewStamp.companyStamps[
              findIndexCompanyStamps
            ].countStampsToActive = action.stampData.stampCount

            patchWorkCompanyNewStamp.companyStamps[
              findIndexCompanyStamps
            ].servicesId = action.stampData.selectedServicesIds
          }
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyNewStamp,
        stampsUpdate: true,
      }
    }

    case DELETE_COMPANY_STAMPS: {
      const patchWorkCompanyNewStamp = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyNewStamp) {
        if (patchWorkCompanyNewStamp._id === action.companyId) {
          const filteredCompanyStamps = patchWorkCompanyNewStamp.companyStamps.filter(
            item => item._id !== action.stampId
          )
          patchWorkCompanyNewStamp.companyStamps = filteredCompanyStamps
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyNewStamp,
      }
    }

    case CHANGE_ACTIVE_WORKER: {
      const valueToActiveWorker = !!state.activeWorkerUserId
        ? state.activeWorkerUserId.user === action.value.user
          ? null
          : action.value
        : action.value
      return {
        ...state,
        activeWorkerUserId: valueToActiveWorker,
      }
    }

    case CHANGE_WORKING_HOURS: {
      return {
        ...state,
        workingHours: action.dataWorkingHours,
      }
    }

    case CHANGE_COMPANY_MAIN_IMAGE: {
      const patchWorkCompanyUpdateMainImage = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyUpdateMainImage) {
        if (patchWorkCompanyUpdateMainImage._id === action.companyId) {
          if (!!action.imagePath) {
            patchWorkCompanyUpdateMainImage.mainImageUrl = action.imagePath
          }
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyUpdateMainImage,
        updatedImageIdCompany: true,
      }
    }

    case UPDATED_IMAGE_ID_COMPANY: {
      return {
        ...state,
        updatedImageIdCompany: false,
      }
    }

    case UPDATE_COMPANY_IMAGE: {
      const patchWorkCompanyUpdateImage = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyUpdateImage) {
        if (patchWorkCompanyUpdateImage._id === action.companyId) {
          if (!!action.pathImage) {
            if (!!patchWorkCompanyUpdateImage.imagesUrl) {
              if (patchWorkCompanyUpdateImage.imagesUrl.length === 0) {
                patchWorkCompanyUpdateImage.mainImageUrl = action.pathImage
              }
            }
            patchWorkCompanyUpdateImage.imagesUrl.push(action.pathImage)
          }
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyUpdateImage,
        updatedImageIdCompany: action.imageId,
      }
    }

    case DELETE_COMPANY_IMAGE: {
      const patchWorkCompanyDeleteImage = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!patchWorkCompanyDeleteImage) {
        if (patchWorkCompanyDeleteImage._id === action.companyId) {
          const filterImages = patchWorkCompanyDeleteImage.imagesUrl.filter(
            item => item !== action.pathImage
          )
          patchWorkCompanyDeleteImage.imagesUrl = filterImages

          const isMainImage =
            action.pathImage === patchWorkCompanyDeleteImage.mainImageUrl
          if (isMainImage) {
            patchWorkCompanyDeleteImage.mainImageUrl = ""
          }
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyDeleteImage,
      }
    }

    case ADD_EDITED_OPINION_TO_RESERWATION: {
      const userHistoryReserwationsNew = [...state.userHistoryReserwations]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchWorkCompanyDataNew.opinions.findIndex(
            item => {
              return item._id === action.opinionId._id
            }
          )
          if (findOpinionIndex >= 0) {
            patchWorkCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchCompanyDataNew.opinions.findIndex(
            item => item._id === action.opinionId._id
          )
          if (findOpinionIndex >= 0) {
            patchCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      const indexReserwationCompany = userHistoryReserwationsNew.findIndex(
        item => {
          return item.company === action.companyName
        }
      )
      if (indexReserwationCompany >= 0) {
        const findIndexReserwationCompanyItem = userHistoryReserwationsNew[
          indexReserwationCompany
        ].items.findIndex(item => item._id === action.reserwationId)
        if (findIndexReserwationCompanyItem >= 0) {
          userHistoryReserwationsNew[indexReserwationCompany].items[
            findIndexReserwationCompanyItem
          ].opinionId.editedOpinionMessage = action.opinionEdited
        }
      }
      return {
        ...state,
        userHistoryReserwations: userHistoryReserwationsNew,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_EDITED_OPINION_TO_COMMUNITING: {
      const userHistoryCommunitingNew = [...state.userHistoryCommunitings]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchWorkCompanyDataNew.opinions.findIndex(
            item => {
              return item._id === action.opinionId._id
            }
          )
          if (findOpinionIndex >= 0) {
            patchWorkCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchCompanyDataNew.opinions.findIndex(
            item => item._id === action.opinionId._id
          )
          if (findOpinionIndex >= 0) {
            patchCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      const indexCommunitingId = userHistoryCommunitingNew.findIndex(item => {
        return item._id === action.communitingId
      })

      if (indexCommunitingId >= 0) {
        userHistoryCommunitingNew[
          indexCommunitingId
        ].opinionId.editedOpinionMessage = action.opinionEdited
      }

      return {
        ...state,
        userHistoryCommunitings: userHistoryCommunitingNew,
        resetUserHistoryCommunitings: true,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_EDITED_OPINION_TO_SERVICE: {
      const userHistoryServicesNew = [...state.userHistoryServices]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchWorkCompanyDataNew.opinions.findIndex(
            item => {
              return item._id === action.opinionId._id
            }
          )
          if (findOpinionIndex >= 0) {
            patchWorkCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          const findOpinionIndex = patchCompanyDataNew.opinions.findIndex(
            item => item._id === action.opinionId._id
          )
          if (findOpinionIndex >= 0) {
            patchCompanyDataNew.opinions[
              findOpinionIndex
            ].editedOpinionMessage = action.opinionEdited
          }
        }
      }

      const indexServiceId = userHistoryServicesNew.findIndex(item => {
        return item._id === action.serviceId
      })

      if (indexServiceId >= 0) {
        userHistoryServicesNew[indexServiceId].opinionId.editedOpinionMessage =
          action.opinionEdited
      }

      return {
        ...state,
        userHistoryServices: userHistoryServicesNew,
        resetUserHistoryService: true,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_NEW_OPINION_TO_SERVICE: {
      const userHistoryServiceNew = [...state.userHistoryServices]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          patchWorkCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchWorkCompanyDataNew.opinionsValue
            ? patchWorkCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchWorkCompanyDataNew.opinionsCount
            ? patchWorkCompanyDataNew.opinionsCount
            : 0
          patchWorkCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchWorkCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          patchCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchCompanyDataNew.opinionsValue
            ? patchCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchCompanyDataNew.opinionsCount
            ? patchCompanyDataNew.opinionsCount
            : 0
          patchCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      const indexServiceId = userHistoryServiceNew.findIndex(item => {
        return item._id === action.serviceId
      })

      if (indexServiceId >= 0) {
        userHistoryServiceNew[indexServiceId].opinionId = action.opinion
      }

      return {
        ...state,
        userHistoryServices: userHistoryServiceNew,
        resetUserHistoryService: true,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_NEW_OPINION_TO_COMMUNITING: {
      const userHistoryCommunitingsNew = [...state.userHistoryCommunitings]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          patchWorkCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchWorkCompanyDataNew.opinionsValue
            ? patchWorkCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchWorkCompanyDataNew.opinionsCount
            ? patchWorkCompanyDataNew.opinionsCount
            : 0
          patchWorkCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchWorkCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          patchCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchCompanyDataNew.opinionsValue
            ? patchCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchCompanyDataNew.opinionsCount
            ? patchCompanyDataNew.opinionsCount
            : 0
          patchCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      const indexCommunitingId = userHistoryCommunitingsNew.findIndex(item => {
        return item._id === action.opinion.communitingId
      })

      if (indexCommunitingId >= 0) {
        userHistoryCommunitingsNew[indexCommunitingId].opinionId =
          action.opinion
      }

      return {
        ...state,
        userHistoryCommunitings: userHistoryCommunitingsNew,
        resetUserHistoryCommunitings: true,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_NEW_OPINION_TO_RESERWATION: {
      const userHistoryReserwationsNew = [...state.userHistoryReserwations]
      const patchWorkCompanyDataNew = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataNew = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchWorkCompanyDataNew) {
        if (patchWorkCompanyDataNew._id === action.companyId) {
          patchWorkCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchWorkCompanyDataNew.opinionsValue
            ? patchWorkCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchWorkCompanyDataNew.opinionsCount
            ? patchWorkCompanyDataNew.opinionsCount
            : 0
          patchWorkCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchWorkCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      if (!!patchCompanyDataNew) {
        if (patchCompanyDataNew._id === action.companyId) {
          patchCompanyDataNew.opinions.unshift(action.opinion)
          const validValue = !!patchCompanyDataNew.opinionsValue
            ? patchCompanyDataNew.opinionsValue
            : 0
          const validCount = !!patchCompanyDataNew.opinionsCount
            ? patchCompanyDataNew.opinionsCount
            : 0
          patchCompanyDataNew.opinionsValue =
            validValue + action.opinion.opinionStars
          patchCompanyDataNew.opinionsCount = validCount + 1
        }
      }

      const indexReserwationCompany = userHistoryReserwationsNew.findIndex(
        item => {
          return item.company === action.companyName
        }
      )
      if (indexReserwationCompany >= 0) {
        const findIndexReserwationCompanyItem = userHistoryReserwationsNew[
          indexReserwationCompany
        ].items.findIndex(item => item._id === action.reserwationId)
        if (findIndexReserwationCompanyItem >= 0) {
          userHistoryReserwationsNew[indexReserwationCompany].items[
            findIndexReserwationCompanyItem
          ].opinionId = action.opinion
        }
      }
      return {
        ...state,
        userHistoryReserwations: userHistoryReserwationsNew,
        workCompanyData: patchWorkCompanyDataNew,
        pathCompanyData: patchCompanyDataNew,
      }
    }

    case ADD_REPLAY_TO_OPINION: {
      const patchWorkCompanyDataReplay = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyDataReplay = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchCompanyDataReplay) {
        if (patchCompanyDataReplay._id === action.companyId) {
          const opinionIndex = patchCompanyDataReplay.opinions.findIndex(
            item => item._id === action.opinionId
          )
          if (opinionIndex >= 0) {
            patchCompanyDataReplay.opinions[opinionIndex].replayOpinionMessage =
              action.replay
          }
        }
      }

      if (!!patchWorkCompanyDataReplay) {
        if (patchWorkCompanyDataReplay._id === action.companyId) {
          const opinionIndex = patchWorkCompanyDataReplay.opinions.findIndex(
            item => item._id === action.opinionId
          )
          if (opinionIndex >= 0) {
            patchWorkCompanyDataReplay.opinions[
              opinionIndex
            ].replayOpinionMessage = action.replay
          }
        }
      }

      return {
        ...state,
        workCompanyData: patchWorkCompanyDataReplay,
        pathCompanyData: patchCompanyDataReplay,
        resetOpinion: true,
      }
    }

    case RESET_OPINION: {
      return {
        ...state,
        resetOpinion: false,
      }
    }

    case ADD_NEW_OPINIONS_COMPANY: {
      const patchWorkCompanyData = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      const patchCompanyData = !!state.pathCompanyData
        ? { ...state.pathCompanyData }
        : null

      if (!!patchCompanyData) {
        if (patchCompanyData._id === action.companyId) {
          patchCompanyData.opinions = [
            ...patchCompanyData.opinions,
            ...action.opinions,
          ]
        }
      }

      if (!!patchWorkCompanyData) {
        if (patchWorkCompanyData._id === action.companyId) {
          patchWorkCompanyData.opinions = [
            ...patchWorkCompanyData.opinions,
            ...action.opinions,
          ]
        }
      }

      return {
        ...state,
        workCompanyData: patchWorkCompanyData,
        pathCompanyData: patchCompanyData,
      }
    }

    case UPDATE_PROMOTIONS: {
      return {
        ...state,
        updatePromotions: false,
      }
    }

    case UPDATE_COMPANY_PATH_PROMOTION: {
      const patchWorkCompanyPromotion = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!patchWorkCompanyPromotion) {
        if (!!action.promotionDate) {
          const findIndexPromotion = patchWorkCompanyPromotion.promotions.findIndex(
            item => item._id === action.promotionDate._id
          )
          patchWorkCompanyPromotion.promotions[findIndexPromotion] =
            action.promotionDate
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyPromotion,
        updatePromotions: true,
      }
    }

    case DELETE_COMPANY_PROMOTION: {
      const deleteCompanyPromotion = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!deleteCompanyPromotion) {
        if (!!action.promotionId) {
          const filterHappyHoursConst = deleteCompanyPromotion.promotions.filter(
            item => item._id !== action.promotionId
          )
          deleteCompanyPromotion.promotions = filterHappyHoursConst
        }
      }
      return {
        ...state,
        workCompanyData: deleteCompanyPromotion,
      }
    }

    case UPDATE_CONST_HAPPY_HOURS: {
      return {
        ...state,
        updateConstHappyHours: false,
      }
    }

    case UPDATE_COMPANY_HAPPY_HOUR_CONST_PATCH: {
      const patchWorkCompanyDataHappyHoursConst = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!patchWorkCompanyDataHappyHoursConst) {
        if (!!action.dateConst) {
          const findIndexHappyHoursConst = patchWorkCompanyDataHappyHoursConst.happyHoursConst.findIndex(
            item => item._id === action.dateConst._id
          )
          patchWorkCompanyDataHappyHoursConst.happyHoursConst[
            findIndexHappyHoursConst
          ] = action.dateConst
        }
      }
      return {
        ...state,
        workCompanyData: patchWorkCompanyDataHappyHoursConst,
        updateConstHappyHours: true,
      }
    }

    case DELETE_COMPANY_HAPPY_HOUR_CONST: {
      const deleteWorkCompanyDataHappyHoursConst = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!deleteWorkCompanyDataHappyHoursConst) {
        if (!!action.happyHourId) {
          const filterHappyHoursConst = deleteWorkCompanyDataHappyHoursConst.happyHoursConst.filter(
            item => item._id !== action.happyHourId
          )
          deleteWorkCompanyDataHappyHoursConst.happyHoursConst = filterHappyHoursConst
        }
      }
      return {
        ...state,
        workCompanyData: deleteWorkCompanyDataHappyHoursConst,
      }
    }

    case UPDATE_COMPANY_HAPPY_HOURS_NO_CONST: {
      const newWorkCompanyDataPromotions = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!newWorkCompanyDataPromotions) {
        if (!!action.promotions) {
          newWorkCompanyDataPromotions.promotions = action.promotions
        }
      }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataPromotions,
      }
    }

    case UPDATE_COMPANY_HAPPY_HOURS_CONST: {
      const newWorkCompanyDataHappyHoursConst = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null

      if (!!newWorkCompanyDataHappyHoursConst) {
        if (!!action.constHappyHours) {
          newWorkCompanyDataHappyHoursConst.happyHoursConst =
            action.constHappyHours
        }
      }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataHappyHoursConst,
      }
    }

    case UPDATE_COMPANY_MAPS: {
      const newWorkCompanyDataMaps = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!newWorkCompanyDataMaps) {
        if (!!action.maps) {
          newWorkCompanyDataMaps.maps.lat = action.maps.lat
          newWorkCompanyDataMaps.maps.long = action.maps.long
        }
      }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataMaps,
      }
    }

    case UPDATE_COMPANY_OPENING_HOURS: {
      const newWorkCompanyDataOpeningHours = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!newWorkCompanyDataOpeningHours) {
        if (!!action.openingHours) {
          action.openingHours.forEach(item => {
            newWorkCompanyDataOpeningHours.openingDays[item.dayMonth].disabled =
              item.disabled
            newWorkCompanyDataOpeningHours.openingDays[item.dayMonth].start =
              item.start
            newWorkCompanyDataOpeningHours.openingDays[item.dayMonth].end =
              item.end
          })
        }
        if (!!action.daysOff) {
          if (!!action.daysOff.deletedDayOff) {
            const filterDAysOff = newWorkCompanyDataOpeningHours.daysOff.filter(
              item => {
                const isInDeleted = action.daysOff.deletedDayOff.some(
                  itemDayOff => {
                    return itemDayOff === item._id
                  }
                )
                return !isInDeleted
              }
            )
            newWorkCompanyDataOpeningHours.daysOff = filterDAysOff
          }

          if (!!action.daysOff.createdDayOff) {
            action.daysOff.createdDayOff.forEach(itemCreated => {
              const newDayOff = {
                day: itemCreated.day,
                month: itemCreated.month,
                year: itemCreated.year,
              }
              newWorkCompanyDataOpeningHours.daysOff.push(newDayOff)
            })
          }
        }
      }
      return {
        ...state,
        workCompanyData: newWorkCompanyDataOpeningHours,
      }
    }

    case UPDATE_COMPANY_TEKSTS: {
      const newWorkCompanyData = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!newWorkCompanyData) {
        if (!!action.texts.textAboutUs) {
          newWorkCompanyData.title = action.texts.textAboutUs
        }
        if (!!action.texts.textReserwation) {
          newWorkCompanyData.reserationText = action.texts.textReserwation
        }

        if (!!action.texts.links) {
          if (!!action.texts.links.facebook) {
            newWorkCompanyData.linkFacebook = action.texts.links.facebook
          }

          if (!!action.texts.links.instagram) {
            newWorkCompanyData.linkInstagram = action.texts.links.instagram
          }

          if (!!action.texts.links.website) {
            newWorkCompanyData.linkiWebsite = action.texts.links.website
          }
        }
      }

      return {
        ...state,
        workCompanyData: newWorkCompanyData,
      }
    }

    case RESET_WORKER_PROPS_VISIBLE: {
      return {
        ...state,
        resetWorkerProps: false,
      }
    }

    case COMPANY_PATCH_WORKER_CONST_TIME: {
      if (!!state.workCompanyData) {
        const newWorkCompanyDataWorkersTime = !!state.workCompanyData
          ? { ...state.workCompanyData }
          : null
        if (!!newWorkCompanyDataWorkersTime) {
          if (action.dataTime.indexWorker === "owner") {
            if (action.dataTime.constantWorkingHours.length > 0) {
              action.dataTime.constantWorkingHours.forEach(constDate => {
                const dateIsInBackend = newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours.findIndex(
                  item => item.dayOfTheWeek === constDate.dayOfTheWeek
                )
                if (dateIsInBackend >= 0) {
                  newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[
                    dateIsInBackend
                  ].dayOfTheWeek = constDate.dayOfTheWeek
                  newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[
                    dateIsInBackend
                  ].startWorking = constDate.startWorking
                  newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[
                    dateIsInBackend
                  ].endWorking = constDate.endWorking
                  newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours[
                    dateIsInBackend
                  ].disabled = constDate.disabled
                } else {
                  newWorkCompanyDataWorkersTime.ownerData.constantWorkingHours.push(
                    constDate
                  )
                }
              })
            }
          } else {
            const selectedWorkerIndex = newWorkCompanyDataWorkersTime.workers.findIndex(
              item => item._id === action.dataTime.indexWorker
            )
            if (selectedWorkerIndex >= 0) {
              if (action.dataTime.constantWorkingHours.length > 0) {
                action.dataTime.constantWorkingHours.forEach(constDate => {
                  const dateIsInBackend = newWorkCompanyDataWorkersTime.workers[
                    selectedWorkerIndex
                  ].constantWorkingHours.findIndex(
                    item => item.dayOfTheWeek === constDate.dayOfTheWeek
                  )
                  if (dateIsInBackend >= 0) {
                    newWorkCompanyDataWorkersTime.workers[
                      selectedWorkerIndex
                    ].constantWorkingHours[dateIsInBackend].dayOfTheWeek =
                      constDate.dayOfTheWeek
                    newWorkCompanyDataWorkersTime.workers[
                      selectedWorkerIndex
                    ].constantWorkingHours[dateIsInBackend].startWorking =
                      constDate.startWorking
                    newWorkCompanyDataWorkersTime.workers[
                      selectedWorkerIndex
                    ].constantWorkingHours[dateIsInBackend].endWorking =
                      constDate.endWorking
                    newWorkCompanyDataWorkersTime.workers[
                      selectedWorkerIndex
                    ].constantWorkingHours[dateIsInBackend].disabled =
                      constDate.disabled
                  } else {
                    newWorkCompanyDataWorkersTime.workers[
                      selectedWorkerIndex
                    ].constantWorkingHours.push(constDate)
                  }
                })
              }
            }
          }
        }
        return {
          ...state,
          workCompanyData: newWorkCompanyDataWorkersTime,
          resetWorkerProps: true,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case COMPANY_PATCH_WORKER_SETTINGS: {
      if (!!state.workCompanyData) {
        const newWorkCompanyDataWorkersProps = !!state.workCompanyData
          ? { ...state.workCompanyData }
          : null
        if (!!newWorkCompanyDataWorkersProps) {
          if (action.dataWorker.workerId === "owner") {
            newWorkCompanyDataWorkersProps.ownerData.specialization =
              action.dataWorker.inputSpecializationValue
            newWorkCompanyDataWorkersProps.ownerData.permissions =
              action.dataWorker.mapWorkerPermissionsIds
            newWorkCompanyDataWorkersProps.ownerData.servicesCategory =
              action.dataWorker.workerServicesCategoryValue
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
        }
        return {
          ...state,
          workCompanyData: newWorkCompanyDataWorkersProps,
          resetWorkerProps: true,
        }
      } else {
        return {
          ...state,
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
      if (!!state.editWorkerHoursData) {
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
      } else {
        return {
          ...state,
        }
      }
    }

    case COMPANY_PATCH_SETTINGS: {
      if (!!state.workCompanyData) {
        const newWorkCompanyDataSettings = { ...state.workCompanyData }
        if (!!action.data.industriesComponent) {
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
        if (action.data.updatedLandlinePhone !== null) {
          newWorkCompanyDataSettings.landlinePhone =
            action.data.updatedLandlinePhone
        }
        if (!!action.data.updateCityInput) {
          newWorkCompanyDataSettings.city = action.data.updateCityInput
        }
        if (!!action.data.updateCodeInput) {
          newWorkCompanyDataSettings.code = action.data.updateCodeInput
        }
        return {
          ...state,
          workCompanyData: newWorkCompanyDataSettings,
        }
      } else {
        return {
          ...state,
        }
      }
    }

    case COMPANY_PATCH_NEW_SERVICES: {
      if (!!state.workCompanyData) {
        const newWorkCompanyDataServices = { ...state.workCompanyData }
        newWorkCompanyDataServices.happyHoursConst = action.happyHoursConst
        newWorkCompanyDataServices.promotions = action.promotions
        newWorkCompanyDataServices.services = action.data
        newWorkCompanyDataServices.companyStamps = action.companyStamps
        newWorkCompanyDataServices.ownerData.servicesCategory =
          action.ownerDataServices
        newWorkCompanyDataServices.workers.forEach((worker, index) => {
          const findSentWorker = action.workers.find(
            sentWorker => sentWorker.user === worker.user._id
          )
          if (!!findSentWorker) {
            newWorkCompanyDataServices.workers[index].servicesCategory =
              findSentWorker.servicesCategory
          }
        })
        return {
          ...state,
          workCompanyData: newWorkCompanyDataServices,
          resetWorkerProps: true,
        }
      } else {
        return {
          ...state,
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
        const validUserInformations = newCompanyUsersInformationsInformations[
          userSelectedIndex
        ].informations
          ? newCompanyUsersInformationsInformations[userSelectedIndex]
              .informations
          : []

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
      if (userSelectedIndex >= 0) {
        newCompanyUsersInformationsInformations[
          userSelectedIndex
        ].informations = action.messages
        newCompanyUsersInformationsInformations[
          userSelectedIndex
        ].firstUserInformationsFetch = true
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
        newCompanyUsersInformations[findIndexUserHistory].reserwations.push(
          ...action.data
        )
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
        newCompanyUsersInformations[findIndexUserHistory].informations.push(
          ...action.data
        )
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
      const newUserWithAlerts = !!state.user ? { ...state.user } : null
      if (!!newUserWithAlerts) {
        const alertsUserValid = !!state.user.alerts ? state.user.alerts : []
        if (!!newUserWithAlerts) {
          newUserWithAlerts.alerts = [action.data, ...alertsUserValid]
          newUserWithAlerts.alertActiveCount = state.user.alertActiveCount + 1
        }
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
      const indexCompany = newUserHistoryReserwations.findIndex(
        item => item.category === action.companyName
      )
      if (indexCompany >= 0) {
        const indexReserwation = newUserHistoryReserwations[
          indexCompany
        ].items.findIndex(item => item._id === action.reserwationId)
        if (indexReserwation >= 0) {
          newUserHistoryReserwations[indexCompany].items[
            indexReserwation
          ].visitCanceled = true
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
    case AVAIBLE_DATE_TO_RESERWATION_UPDATE: {
      return {
        ...state,
        avaibleHoursReserwationUpdate: action.value,
      }
    }
    case AVAIBLE_DATE_TO_RESERWATION: {
      return {
        ...state,
        avaibleHoursReserwation: action.date,
      }
    }
    // case CHANGE_EDITED_WORKER_HOURS:
    //   return {
    //     ...state,
    //     editedWorkersHours: action.item,
    //   }
    case CHANGE_EDIT_WORKER_HOURS: {
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
      const itemReserwation = !!action.value
        ? action.value
        : state.reserwationData

      let userHasPhone = state.user
      if (!!!action.value) {
        userHasPhone.hasPhone = true
      }
      return {
        ...state,
        reserwationData: itemReserwation,
        reserwationEnable: reserwationEnable,
        user: userHasPhone,
      }

    case RESET_WORKER_DELETE: {
      return {
        ...state,
        resetWorkerDelete: false,
      }
    }

    case DELETE_WORKER_FROM_COMPANY: {
      const userDeleteWorker = !!state.user ? { ...state.user } : null
      const allCompanyServices = { ...state.companyServices }
      const allCompanyCommuniting = { ...state.companyCommunitings }

      if (!!allCompanyServices.workers) {
        const filterWorkers = allCompanyServices.workers.filter(
          itemWorker => itemWorker.user._id !== action.workerUserId
        )
        allCompanyServices.workers = filterWorkers
      }

      if (!!allCompanyCommuniting.workers) {
        const filterWorkers = allCompanyCommuniting.workers.filter(
          itemWorker => itemWorker.user._id !== action.workerUserId
        )
        allCompanyCommuniting.workers = filterWorkers
      }

      const dateToDeleteWorker = !!state.workCompanyData
        ? { ...state.workCompanyData }
        : null
      if (!!dateToDeleteWorker) {
        const filterWorkers = dateToDeleteWorker.workers.filter(
          item => item.user._id !== action.workerUserId
        )
        dateToDeleteWorker.workers = filterWorkers
      }
      if (!!userDeleteWorker) {
        if (!!userDeleteWorker.company) {
          const filterUserCompany = userDeleteWorker.company.workers.filter(
            itemWorker => itemWorker.user !== action.workerUserId
          )

          userDeleteWorker.company.workers = filterUserCompany
        }
        if (!!userDeleteWorker.allCompanys) {
          userDeleteWorker.allCompanys.forEach((companyValue, companyIndex) => {
            const filterUserCompanyWorkers = companyValue.workers.filter(
              itemWorker => itemWorker.user !== action.workerUserId
            )

            userDeleteWorker.allCompanys[
              companyIndex
            ].workers = filterUserCompanyWorkers
          })
        }
      }
      return {
        ...state,
        workCompanyData: dateToDeleteWorker,
        resetWorkerDelete: true,
        user: userDeleteWorker,
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
