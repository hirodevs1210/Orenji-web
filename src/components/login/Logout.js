import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useDispatch } from "react-redux";
import { BiHomeAlt, BiLogOut } from "react-icons/bi";

import * as profileActions from "../../store/actions/profile";

const clientId =
"790442269652-94836qi3ae7f19vfusd6u6iv0qjaj7so.apps.googleusercontent.com";

const LogoutHooks = () => {
  const style = { color: "1FA0FB", fontSize: "2.5em" };

  const dispatch = useDispatch();
  const onLogoutSuccess = async (res) => {
    await dispatch(profileActions.logout());

    // console.log('Logged out Success');
    // window.location.reload();
    
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    // <button onClick={signOut}>
    <BiLogOut style={style} onClick={signOut} />
    // </button>
  );
}

export default LogoutHooks;