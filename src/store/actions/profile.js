import { SUCCESS_LOGIN, FAILED_LOGIN, LOGOUT } from "./types";

const url = "http://localhost:8000";

// Get Login to Google

export const getProfile = (emailId) => {
  return async (dispatch, getState) => {
    let token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${url}/profile/get-profile/${emailId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        // body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Cannot Log in...");
      }

      const resData = await response.json();
      // console.log(resData);
      if (resData.foundProfile.length > 0) {
        dispatch({
          type: SUCCESS_LOGIN,
          userProfile: resData.foundProfile,
          token: resData.token,
        });
      } else {
        dispatch({
          type: FAILED_LOGIN,
        });
      }
      
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

//LOGOUT

export const logout = () => {
  return async (dispatch, getState) => {
  try {

    dispatch({
      type: LOGOUT,
    })

  } catch (err) {
    throw err;
  }
}
}