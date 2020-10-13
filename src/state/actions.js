import axios from "axios"
import {Site} from "../common/Site"

export const CHANGE_SORT_VISIBLE = "CHANGE_SORT_VISIBLE"
export const CHANGE_FILTER_VISIBLE = "CHANGE_FILTER_VISIBLE"
export const CHANGE_LOCALIZATION_VISIBLE = "CHANGE_LOCALIZATION_VISIBLE"
export const CHANGE_SORT_VALUE = "CHANGE_SORT_VALUE"
export const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE"
export const CHANGE_LOCALIZATION_VALUE = "CHANGE_LOCALIZATION_VALUE"
export const CHANGE_INDUSTRIES = "CHANGE_INDUSTRIES"
export const LOADING_PLACES = "LOADING_PLACES"
export const CHANGE_SPINNER = "CHANGE_SPINNER"
export const LOGOUT = "LOGOUT"
export const LOGIN = "LOGIN"
export const CHANGE_LOGIN_VISIBLE = "CHANGE_LOGIN_VISIBLE"
export const REMOVE_ALERT_ITEM = "REMOVE_ALERT_ITEM"
export const ADD_ALERT_ITEM = "ADD_ALERT_ITEM"

export const addAlertItem = (text, color) => {
  return {
    type: ADD_ALERT_ITEM,
    text: text,
    color: color,
  }
}

export const removeAlertItem = (id) => {
  return {
    type: REMOVE_ALERT_ITEM,
    id: id,
  }
}

export const changeLoginVisible = (value) => {
  return {
    type: CHANGE_LOGIN_VISIBLE,
    value: value
  }
}

export const changeLoadingPlaces = (value) => {
  return {
    type: LOADING_PLACES,
    value: value
  }
}

export const changeSpinner = (value) => {
  return{
    type: CHANGE_SPINNER,
    value: value
  }
} 

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

export const changeLogout = () => {
  return {
    type: LOGOUT,
  }
}

export const loginUser = (user) => {
  return {
    type: LOGIN,
    user: user
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(changeSpinner(true));
    localStorage.removeItem("USERID");
    localStorage.removeItem("TOKEN");
    setTimeout(() => {
      dispatch(changeSpinner(false));
    }, 1000);
    dispatch(changeLogout());
  };
};


export const fetchLoginUser = (email, password) => {
  return (dispatch) => {
    dispatch(changeSpinner(true));
    return axios
      .post(`${Site.serverUrl}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("USERID", response.data.userId);
        localStorage.setItem("TOKEN", response.data.token);
        dispatch(loginUser(response.data));
        dispatch(changeLoginVisible(false))
        dispatch(addAlertItem("Pomyślnie zalogowano się na konto", "green"))
        dispatch(changeSpinner(false));
      })
      .catch((error) => {
        dispatch(addAlertItem("Błąd podczas logowania się", "red"))
        dispatch(changeSpinner(false));
        // if (error.response) {
        //   const errorMessage = error.response.data.message;
        //   if (error.response.status === 403) {
        //     dispatch(failMessagesChange("", errorMessage));
        //   } else if (error.response.status === 422) {
        //     dispatch(failMessagesChange(errorMessage));
        //   } else if (error.response.status === 401) {
        //     dispatch(logout());
        //   } else {
        //     dispatch(failMessagesChange("", "", "", errorMessage));
        //   }
        // }
        // dispatch(loginAttemptsTask("plus"));
      });
  };
};

export const fetchAutoLogin = () => {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      localStorage.getItem("USERID")
        .then((userId) => {
          if (userId !== null) {
            new Promise((resolve, reject) => {
              localStorage.getItem("TOKEN")
                .then((token) => {
                  if (token !== null) {
                    dispatch(changeSpinner(true));
                    axios
                      .post(`${Site.serverUrl}/auto-login`, {
                        userId: userId,
                        token: token,
                      })
                      .then((response) => {
                        dispatch(loginUser(response.data));
                        setTimeout(() => {
                          dispatch(changeSpinner(false));
                        }, 1000);
                      })
                      .catch((error) => {
                        if (error.response.status === 401) {
                          dispatch(logout());
                        }
                        setTimeout(() => {
                          dispatch(changeSpinner(false));
                        }, 1000);
                      });

                    resolve(token);
                  } else {
                    resolve(false);
                  }
                })
                .catch((err) => reject(err));
            });
            resolve(userId);
          } else {
            resolve(false);
          }
        })
        .catch((err) => reject(err));
    });
  };
};

