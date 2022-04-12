import {
  ADD_CLIENT,
  GET_CLIENT,
  DEL_CLIENT,

  // SEARCH_CLIENT
} from "../actions/types";

const initialState = {
  newClient: "",
  clientList: "",
  // searchResult: "",
};
const client = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_CLIENT:
      return {
        ...state,
        newClient: action.newClientData,
      };
    case GET_CLIENT:
      return {
        ...state,
        clientList: action.searchClientData,
      };

    case DEL_CLIENT:
      return {
        ...state,
        clientList: action.delData,
      };

    // case SEARCH_STUDENT:
    //   return {
    //     ...state,
    //     searchResult: action.searchData,
    //   };

    default:
      return state;
  }
};

export default client;
