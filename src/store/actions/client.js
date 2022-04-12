import { ADD_CLIENT, GET_CLIENT, UPDATE_CLIENT } from "./types";

const url = "http://localhost:8000";
// server domain DEV https://orenji-app-dev.herokuapp.com/

// Add Client
export const addClient = (formData) => {
    // console.log("action hiro file");
    console.log(formData);
    return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
            `${url}/client/add-client`,
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
          throw new Error("Cannot add Client...");
        }
  
        const resData = await response.json();
  
        dispatch({
          type: ADD_CLIENT,
          newClientData: resData,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };


   // Update Client
 export const updateClient = (formData) => {
  // console.log("action hiro file");
  const {clientId} = formData;
  console.log(clientId);
    return async (dispatch, getState) => {
      let token = localStorage.getItem("authToken");

     try {
       const response = await fetch(
           `${url}/client/update-client/${clientId}`,
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
         throw new Error("Cannot Update Client...");
       }
 
       const resData = await response.json();
     //  console.log(resData);


     //  console.log(resData);
     
     } catch (err) {
       // send to custom analytics server
       throw err;
     }
   };
 };

  // GET ALl Client Company
  export const getClientCompany = (companyId) => {
  // const {companyId} = formData;
  console.log("action client.js file");

    return async (dispatch, getState) => {
      let token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
            `${url}/client/get-clientpercomp/${companyId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
              // body: JSON.stringify(formData),
            }
          );
  
        if (!response.ok) {
          throw new Error("Cannot search student...");
        }
      const resData = await response.json();
       console.log("client", resData);
       console.log("client");

        dispatch({
          type: GET_CLIENT,
          searchClientData: resData,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };


  // DEL Client

  export const deleteClient = (clientId, companyId) => {

     return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");
       try {
         const response = await fetch(
          `${url}/client/del-client/${clientId}`,
             {
               method: "DELETE",
               headers: {
                 "Content-Type": "application/json",
                 "x-auth-token": token,
               },
              //  body: JSON.stringify(formData),
             }
           );
   
         if (!response.ok) {
           throw new Error("Cannot delete Client...");
         }
   
         const resData = await response.json();
         
         dispatch(getClientCompany(companyId));
  
       //  console.log(resData);
        //  dispatch({
        //    type: DEL_CLIENT,
        //    delData: resData,
        //  });
  
       } catch (err) {
         // send to custom analytics server
         throw err;
       }
     };
   };




//   // Search Student 
//   export const searchStudent = (formData) => {
//   // console.log("action hiro file");
//   console.log(formData);
//   return async (dispatch, getState) => {
//   //   let token = await SecureStore.getItemAsync("token");
//     try {
//       const response = await fetch(
//           `${url}/student/search-student`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               // "x-auth-token": token,
//             },
//             body: JSON.stringify(formData),
//           }
//         );

//       if (!response.ok) {
//         throw new Error("Cannot search profile...");
//       }

//       const resData = await response.json();
//     //  console.log(resData);
//       dispatch({
//         type: SEARCH_STUDENT,
//         searchData: resData,
//       });
//     } catch (err) {
//       // send to custom analytics server
//       throw err;
//     }
//   };
// };





