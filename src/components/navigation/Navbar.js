import React, { Fragment } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { BiHomeAlt} from "react-icons/bi";

import Logout from "../login/Logout";
// import LogoutHooks from "../login/Logout";

const NavBar = (props) => {
  const style = { color: "1FA0FB", fontSize: "3.5em" };

  // const userProfile = useSelector(
  //   (state) => state.profile.currentUser.companyInfo
  // );

  
  return (
    <Fragment>
      <Navbar bg="light" variant="light">
        <Container>
          <Fragment>
            <Navbar.Brand className="me-auto">
              <Link to="/">
                <BiHomeAlt style={style} />
              </Link>
            </Navbar.Brand>

            <Navbar.Brand>
              <Logout style={style} />
              {/* <BiLogOut style={style} onClick={Logout}/> */}

            </Navbar.Brand>
          </Fragment>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
