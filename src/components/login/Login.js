import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { useGoogleLogin } from "react-google-login";
import PrivacyandTerms from "../login/Privacy";

// refresh token
import { refreshTokenSetup } from "../../utils/refreshToken";
import { useDispatch, useSelector } from "react-redux";

import * as profileActions from "../../store/actions/profile";

const clientId =
  "790442269652-iscbn7m9dfhr2mfoe5b0c1d4ig1v7lm3.apps.googleusercontent.com";

const LoginHooks = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const style = { color: "blue", fontSize: "20px", margin: "2.0em" };

  const onSuccess = async (res) => {
    await dispatch(profileActions.getProfile(res.profileObj.email));
    // console.log("Login Success: currentUser:", res.profileObj.email);
    // alert(
    //   `Succesfully Loggedin \n Welcome! ${res.profileObj.name}.`
    // );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div className="row justify-content-center">
      <div className="col-md-7" align="center">
        <img style={style} src="icons/orenji.png" className="icon"></img>
      </div>
      <div className="col-md-6" align="center">
        <button onClick={signIn} className="button">
          <span style={style} className="buttonText" align="center">
            {" "}
            Sign in with Google
          </span>
        </button>
        <div className="col-md-7">
          <Button variant="light" onClick={handleShow}>
            <h5>
              <br />
              Privacy Policy and Term of Use
            </h5>
          </Button>
          <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Privacy Policy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PrivacyandTerms />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default LoginHooks;
