import axios from "axios"

export const CHANGE_SORT_VISIBLE = "CHANGE_SORT_VISIBLE"
export const CHANGE_FILTER_VISIBLE = "CHANGE_FILTER_VISIBLE"
export const CHANGE_LOCALIZATION_VISIBLE = "CHANGE_LOCALIZATION_VISIBLE"
export const CHANGE_SORT_VALUE = "CHANGE_SORT_VALUE"
export const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE"
export const CHANGE_LOCALIZATION_VALUE = "CHANGE_LOCALIZATION_VALUE"
export const CHANGE_INDUSTRIES = "CHANGE_INDUSTRIES"

export const changeIndustries = (value) => {
  return {
    type: CHANGE_INDUSTRIES,
    value: value
  }
}

export const changeLocalizationValue = (value) => {
  return {
    type: CHANGE_LOCALIZATION_VALUE,
    value: value
  }
}

export const changeSortValue = (value) => {
  return {
    type: CHANGE_SORT_VALUE,
    value: value
  }
}

export const changeFilterValue = (value) => {
  return {
    type: CHANGE_FILTER_VALUE,
    value: value
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

// export const fetchLoginUser = (email, password) => {
//   return dispatch => {
//     dispatch(loading(true))
//     axios
//       .post(`${Site.serverUrl}/login`, {
//         email: email,
//         password: password,
//       })
//       .then(response => {
//         AsyncStorage.setItem("USERID", response.data.userId)
//         AsyncStorage.setItem("TOKEN", response.data.token)
//         dispatch(loginUser(response.data))
//         dispatch(failMessagesChange())
//         setTimeout(() => {
//           dispatch(loading(false))
//         }, 1000)
//       })
//       .catch(error => {
//         if (error.response) {
//           const errorMessage = error.response.data.message
//           if (error.response.status === 403) {
//             dispatch(failMessagesChange("", errorMessage))
//           } else if (error.response.status === 422) {
//             dispatch(failMessagesChange(errorMessage))
//           } else if (error.response.status === 401) {
//             dispatch(logout())
//           } else {
//             dispatch(failMessagesChange("", "", "", errorMessage))
//           }
//         }
//         dispatch(loginAttemptsTask("plus"))
//         setTimeout(() => {
//           dispatch(loading(false))
//         }, 1000)
//       })
//   }
// }
