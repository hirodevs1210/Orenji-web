import { ADD_COMPANY, SEARCH_COMPANY, DEACTIVATE_COMPANY } from "../actions/types";

const initialState = {
  newCompany: "",
  searchResult: "",
};

const company = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ADD_COMPANY:
      // localStorage.setItem("token", action.userLogin.token);
      return {
        ...state,
        newCompany: action.newCompanyData,
      };   

      case SEARCH_COMPANY:
        return {
          ...state,
          searchResult: action.searchCompanyData,
        };

        case DEACTIVATE_COMPANY:
      //  console.log(action.companyStatus);
        const indexNum =  action.newResult.findIndex(item => item.companyId === action.companyStatus.companyId);
        
       if (indexNum > -1) {
        action.newResult.splice(indexNum, 1); // 2nd parameter means remove one item only
        action.newResult.splice(indexNum, 0, action.companyStatus);
        }

    default:
      return state;
  }
};

export default company;
