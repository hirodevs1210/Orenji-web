import {
  SUCCESS_LOGIN,FAILED_LOGIN, LOGOUT
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  currentUser: "",
};

const profile = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SUCCESS_LOGIN:
      console.log(action.token);
      localStorage.setItem("token", action.token);
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.userProfile,
      };     
      case FAILED_LOGIN:
      case LOGOUT:
        localStorage.removeItem("authToken");
        return {
          ...state,
          isAuthenticated: false,
          currentUser: "",
        };  
     

    default:
      return state;
  }
};

export default profile;
