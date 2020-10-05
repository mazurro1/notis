import { createStore as reduxCreateStore } from "redux"

const initialState = {
  user: {
    userName: "Hubert",
    userId: 1,
  },
  spinnerEnable: false,
  filters: "oczyszczanie twarzy",
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
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case "CHANGE_LANGUAGE":
    //   return {
    //     ...state,
    //     language: action.language,
    //     indexLanguage: action.indexLanguage,
    //   }
    default:
      return state
  }
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
