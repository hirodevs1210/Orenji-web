import { ADD_COMPANY, SEARCH_COMPANY, DEACTIVATE_COMPANY } from "./types";

const url = "http://localhost:8000";

// Add Company 
export const addCompany = (formData) => {
  // console.log("action hiro file");
  console.log(formData);
  return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
          `${url}/company/add-company`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            body: JSON.stringify(formData),
          }
        );

      if (!response.ok) {
        console.log(response);
        throw new Error("Cannot add profile...");
      }

      const resData = await response.json();

      dispatch({
        type: ADD_COMPANY,
        newCompanyData: resData,
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

// Update Company
export const updateCompany = (formData) => {
   const {companyId} = formData;
   console.log(companyId);
   return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");

     try {
       const response = await fetch(
           `${url}/company/update-company/${companyId}`,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
               "x-auth-token": token,
             },
             body: JSON.stringify(formData),
           }
         );
 
       if (!response.ok) {
         throw new Error("Cannot Update Company...");
       }
 
       const resData = await response.json();
     //  console.log(resData);
     
     } catch (err) {
       // send to custom analytics server
       throw err;
     }
   };
 };


 // Search Company
export const searchCompany = (formData) => {
  // console.log("action hiro file");
   console.log(formData);
   return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");

     try {
       const response = await fetch(
           `${url}/company/search-company`,
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               "x-auth-token": token,
             },
             body: JSON.stringify(formData),
           }
         );
 
       if (!response.ok) {
         throw new Error("Cannot Get Company...");
       }
 
       const resData = await response.json();
     //  console.log(resData);
       dispatch({
         type: SEARCH_COMPANY,
         searchCompanyData: resData,
       });
     } catch (err) {
       // send to custom analytics server
       throw err;
     }
   };
 };

 // Deactivate
export const deActivateCompany = (companyId) => {
  // console.log("action hiro file");
  //const {authId} = formData;
  // console.log(name);
  // console.log(authId);

  return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
          `${url}/company/search-company/${companyId}`,
          
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
            //req.body postman
            // body: JSON.stringify(formData),
          }
        );

      if (!response.ok) {
        throw new Error("Cannot Inactivate Use...");
      }

      const resData = await response.json();
      
      const currentSearchResult = getState().company.searchResult;
      console.log(currentSearchResult);

      dispatch({
        type: DEACTIVATE_COMPANY,
        companyStatus: resData,
        newResult: currentSearchResult,
      });
      
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};