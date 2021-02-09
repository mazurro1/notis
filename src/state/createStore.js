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
  CHANGE_ALERT_EXTRA,
  RESET_USER_PROFIL,
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  UPDATE_USER_RESERWATIONS_COUNT,
  ADD_NEW_COMPANY_STAMPS,
  UPDATE_USER_IMAGE,
  CHANGE_ACTIVE_WORKER,
  CHANGE_WORKING_HOURS,
  RESET_OPINION,
  CHANGE_COMPANY_MAIN_IMAGE,
  UPDATED_IMAGE_ID_COMPANY,
  UPDATE_COMPANY_IMAGE,
  DELETE_COMPANY_IMAGE,
  ADD_NEW_OPINION_TO_RESERWATION,
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
  userProfilReset: false,
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
  alertExtra: {
    name: null,
    active: false,
  },
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
  //COMPANY
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
  updateConstHappyHours: false,
  updatePromotions: false,
  userHistoryReserwations: [],
  workerHistoryReserwations: null,
  resetWorkerProps: false,
  resetOpinion: false,
  workingHours: null,
  activeWorkerUserId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY
    //COMPANY

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
          console.log(patchWorkCompanyDataNew._id, action.companyId)
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
                    return itemDayOff == item._id
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
        if (!!action.data.updateCityInput) {
          newWorkCompanyDataSettings.city = action.data.updateCityInput
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
