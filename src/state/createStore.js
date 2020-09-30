import { createStore as reduxCreateStore } from "redux"

const initialState = {
  user: {
    userName: "Hubert",
    userId: 1,
  },
  spinnerEnable: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.language,
        indexLanguage: action.indexLanguage,
      }
    default:
      return state
  }
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
