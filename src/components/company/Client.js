import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PopupAlert from "../layout/PopupAlert";

import { Link } from "react-router-dom";

import * as clientActions from "../../store/actions/client";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
import { useNavigate } from "react-router-dom";

const Client = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [showAlertClient, setShowAlertClient] = useState(false);
  const { selectedItem, mode } = location.state;
  const [saveComplete, setSaveComplete] = useState(false);
  const [clientIsLoading, setClientIsLoading] = useState(false);
  const searchResult = useSelector((state) => state.client.clientList);

  const style = { color: "black", fontSize: "13px", margin: "1" };
  const style1 = { color: "red", fontSize: "15px", margin: "1" };

  let navigate = useNavigate();

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = <p style={style1}>Field is Required! </p>;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = <p style={style1}>Invalid email address!</p>;
    }
    return error;
  };

  const validReq = (value) => {
    let error;
    if (value === "") {
      error = <p style={style1}>Field is Required!</p>;
    }
    return error;
  };
  
  const handleClientSubmit = async (values) => {
    setError(null);
    setIsRefreshing(true);

    // console.log(values);
    const formData = {
      ...values,
      companyId: props.companyId,
      // clientId: props.clientId
      // companyId: props.companyId ? props._id : "",
    };
    console.log(formData);

    try {
      setClientIsLoading(true);
      console.log("props client",props.mode);
      if (props.mode === "add") {
        await dispatch(clientActions.addClient(formData));
        window.alert("The New Client is now Added");

      } else {
        await dispatch(clientActions.updateClient(formData));
      }
      setClientIsLoading(false);
      setSaveComplete(true);

      setShowAlertClient(true);
      setTimeout(() => {
        setShowAlertClient(false);
        props.setShow(false);
        window.location.reload();

        // navigate("../company", { replace: true });
      }, 1000);

      setClientIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  return (
    <Fragment className="container">
     {/* {(mode === "add" || (mode === "edit" && !!selectedItem)) && ( */}
      <div className="row justify-content-center" style={style}>
        <div className="col-md-8">
          <h3>{props.mode === "add" ? "Add Client" : "Edit Client"}</h3>
          {showAlertClient && <PopupAlert text="Saved..." variant="primary" />}
          <Formik
            initialValues={{
              companyId: !!props.companyId ? props.companyId.companyId : "",
              clientId: !!props.companyId ? props.companyId.clientId : "",
              clientDescr: !!props.companyId ? props.companyId.clientDescr : "",
              clientPhone: !!props.companyId ? props.companyId.clientPhone : "",
              clientEmail: !!props.companyId ? props.companyId.clientEmail : "",
              clientContact: !!props.companyId
                ? props.companyId.clientContact
                : "",
            }}
            onSubmit={(values) => {
              // same shape as initial values
              // console.log(clientData);
              handleClientSubmit(values);
            }}
          >
             {({ errors, touched, isValidating }) => (
              <Form className="row g-3 m-1 form-group">
              <div className="col-md-6">
                  <button type="submit" className="btn btn-primary">
                    {(props.mode === "add" ? "Add" : "Update")}
                    {/* Add */}
                  </button>
                </div>
                  <div className="col-md-6" >
                    <nav>
                      <Link to="/searchcompany">
                        <button type="submit" className="btn btn-light">
                          Back
                        </button>
                      </Link>
                    </nav>
                  </div>
            
              {/* Start-CLient Descr  */}
                <div className="col-md-7">
                  <label for="clientDescr" className="cols-sm-2 control-label">
                    Client Description
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="clientDescr"
                        validate={validReq}
                      />
                      {errors.clientDescr && touched.clientDescr && (
                          <div className="input-group sm-1">
                            {errors.clientDescr}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* End-CLient Descr  */}

                {/* Start-CLient Phone  */}
                <div className="col-md-7">
                  <label for="clientPhone" className="cols-sm-2 control-label">
                    Client Phone
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="clientPhone"
                        validate={validReq}
                      /> 
                      {errors.clientPhone && touched.clientPhone && (
                          <div className="input-group sm-1">
                            {errors.clientPhone}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* End-CLient Phone  */}

                {/* Start-CLient Email  */}
                <div className="col-md-7">
                  <label for="clientEmail" className="cols-sm-2 control-label">
                    Client Email
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="clientEmail"
                        validate={validateEmail}
                      />
                      {errors.clientEmail && touched.clientEmail && (
                          <div className="input-group sm-1">
                            {errors.clientEmail}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* End-CLient Email  */}

                {/* Start-CLient Contact  */}
                <div className="col-md-7">
                  <label
                    for="clientContact"
                    className="cols-sm-2 control-label"
                  >
                    Client Contact Person
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="clientContact"
                        validate={validReq}
                      />
                       {errors.clientContact && touched.clientContact && (
                          <div className="input-group sm-1">
                            {errors.clientContact}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* End-CLient Contact  */}

                
              </Form>
            )}
          </Formik>
        </div>
      </div>
     {/* )} */}
    </Fragment>
  );
};
export default Client;
