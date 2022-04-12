import React, { Fragment, Profiler } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import Register from "../login/Register";
import Navigation from "../navigation/Navbar";
import Company from "../company/Company";
import SearchCompany from "../company/SearchCompany";
import Client from "../company/Client";
import PrivacyandTerms from "../login/Privacy";

const Routing = () => {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  // const userProfile = useSelector(
  //   (state) => state.auth.currentUser.payload.profileData
  // );

  return (
    <Fragment>
      <BrowserRouter>
        {isAuthenticated && <Navigation />}
        {!isAuthenticated && <Login />}
        {/* {!isAuthenticated && <PrivacyandTerms />} */}
        {/* {!isAuthenticated && ( */}
        {/* <Route path="policy" element={<PrivacyandTerms />} /> */}
        {/* )} */}
        {/* {!isAuthenticated && <Registration /> } */}

        <Routes>
          {/* {isAuthenticated && <Route path="/" element={<Dashboard  />} />} */}
          {/* {!isAuthenticated && <Route path="/" element={<Login />} />} */}
          {/* {!isAuthenticated && <Route path="/register" element={<Registration />} />} */}
          {/* {!isAuthenticated && (
           
          )} */}
          <Route path="policy" element={<PrivacyandTerms />} />{" "}
          {/* <Route path="navbar" element={<NavBar />} /> */}
          {isAuthenticated && (
            <Fragment>
              <Route path="/" element={<Dashboard />} />
              <Route path="registration" element={<Register />} />
              <Route path="company" element={<Company />} />
              <Route path="searchcompany" element={<SearchCompany />} />
              <Route path="client" element={<Client />} />
            </Fragment>
          )}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default Routing;
