import { createStore as reduxCreateStore } from "redux"
import {
  CHANGE_SORT_VISIBLE,
  CHANGE_FILTER_VISIBLE,
  CHANGE_SORT_VALUE,
  CHANGE_LOCALIZATION_VISIBLE,
  CHANGE_FILTER_VALUE,
  CHANGE_LOCALIZATION_VALUE,
  CHANGE_INDUSTRIES
} from "./actions"

const initialState = {
  user: {
    userName: "Hubert",
    userId: 1,
  },
  page: 1,
  spinnerEnable: false,
  industries: null,
  localizationVisible: false,
  localization: false,
  localizationData: [
    {value: 'warszawa', label: 'Warszawa'},
    {value: 'krakow', label: 'Kraków'}
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
  sortData: [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ],
  sortDataLoading: false,
  localization: "",
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
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INDUSTRIES:
      return{
        ...state,
        industries: action.value
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
        return{
          ...state,
          sorts: action.value,
          sortVisible: false,
        }

    case CHANGE_FILTER_VALUE:
        return{
          ...state,
          filters: action.value,
          filterVisible: false,
        }    

  case CHANGE_LOCALIZATION_VALUE:
        return{
          ...state,
          localization: action.value,
          localizationVisible: false,
        }    

    default:
      return state
  }
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
