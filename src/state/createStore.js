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
} from "./actions"

const initialState = {
  user: null,
  userPhone: null,
  page: 1,
  spinnerEnable: false,
  industries: null,
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
    { value: "oczyszczanie twarzy", label: "oczyszczanie twarzy" },
    { value: "strawberry1", label: "Strawberry1" },
    { value: "vanilla1", label: "Vanilla1" },
  ],
  filterDataLoading: false,
  sortVisible: false,
  sorts: null,
  sortDataLoading: false,
  placesData: [
    {
      id: 1,
      image:
        "https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg",
      name: "Salon Kosmetyczny Słowianka",
      adress: "Warszawa, Wola, Mickiewicza 17",
      title:
        "Healthy Beauty to wyjątkowy salon kosmetyczny na mapie Warszawy. To tu wydobywamy zdrowe piękno i dbamy.",
      countOpinions: 84,
      avarageOpinions: "5,0",
      services: [
        "Strzyżenie dziecięce",
        "Strzyżenie męskie",
        "Strzyżenie damskie",
        "Konsultacja fryzjerska",
        "Oczyszczanie twarzy",
      ],
    },
    {
      id: 2,
      image:
        "https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg",
      name: "Salon Kosmetyczny Słowianka",
      adress: "Warszawa, Wola, Mickiewicza 17",
      title:
        "Healthy Beauty to wyjątkowy salon kosmetyczny na mapie Warszawy. To tu wydobywamy zdrowe piękno i dbamy.",
      countOpinions: 84,
      avarageOpinions: "5,0",
      services: [
        "Strzyżenie dziecięce",
        "Strzyżenie męskie",
        "Strzyżenie damskie",
        "Konsultacja fryzjerska",
        "Oczyszczanie twarzy",
      ],
    },
    {
      id: 3,
      image:
        "https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg",
      name: "Salon Kosmetyczny Słowianka",
      adress: "Warszawa, Wola, Mickiewicza 17",
      title:
        "Healthy Beauty to wyjątkowy salon kosmetyczny na mapie Warszawy. To tu wydobywamy zdrowe piękno i dbamy.",
      countOpinions: 84,
      avarageOpinions: "5,0",
      services: [
        "Strzyżenie dziecięce",
        "Strzyżenie męskie",
        "Strzyżenie damskie",
        "Konsultacja fryzjerska",
        "Oczyszczanie twarzy",
      ],
    },
    {
      id: 4,
      image:
        "https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg",
      name: "Salon Kosmetyczny Słowianka",
      adress: "Warszawa, Wola, Mickiewicza 17",
      title:
        "Healthy Beauty to wyjątkowy salon kosmetyczny na mapie Warszawy. To tu wydobywamy zdrowe piękno i dbamy.",
      countOpinions: 84,
      avarageOpinions: "5,0",
      services: [
        "Strzyżenie dziecięce",
        "Strzyżenie męskie",
        "Strzyżenie damskie",
        "Konsultacja fryzjerska",
        "Oczyszczanie twarzy",
      ],
    },
    {
      id: 5,
      image:
        "https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg",
      name: "Salon Kosmetyczny Słowianka",
      adress: "Warszawa, Wola, Mickiewicza 17",
      title:
        "Healthy Beauty to wyjątkowy salon kosmetyczny na mapie Warszawy. To tu wydobywamy zdrowe piękno i dbamy.",
      countOpinions: 84,
      avarageOpinions: "5,0",
      services: [
        "Strzyżenie dziecięce",
        "Strzyżenie męskie",
        "Strzyżenie damskie",
        "Konsultacja fryzjerska",
        "Oczyszczanie twarzy",
      ],
    },
  ],
  loadingPlaces: false,
  alerts: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state
  }
}

const createStore = () =>
  reduxCreateStore(reducer, initialState, applyMiddleware(thunk))

export default createStore
