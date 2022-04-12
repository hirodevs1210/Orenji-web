import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import PopupAlert from "../layout/PopupAlert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [showAlert, setShowAlert] = useState(false);
  

  let navigate = useNavigate();
  
  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validateRequired = (value) => {
    let error;
    if (value === "") {
      error = "Field is Required!";
    }

    return error;
  };

  const handleSubmit = async (values) => {
    setError(null);
    setIsRefreshing(true);

    // console.log(values);
    const formData = {
      ...values,
      //authId: "61fb93432244a97da86ba854",
    };
   

    try {
      setIsLoading(true);
      // await dispatch(authActions.addAuth(formData));
      setIsLoading(false);

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("../", { replace: true });
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  return (
    <Fragment className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3>Register</h3>

          {/* {error && (
            <PopupAlert text="Email Id already in use" variant="danger" />
          )}
          {showAlert && (
            <PopupAlert text="Registration Complete..." variant="primary" />
          )} */}

          <Formik
            initialValues={{
              profileId: "",
              companyId: "",
              clientId: "",
              emailId: "",
              fullName: "",
              contactNum: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              
              // same shape as initial values
              handleSubmit(values);
            }}
          >
            {({ errors, touched, isValidating }) => (
              <Form className="row g-3 m-1 form-group">
                {/* Start of ProfileId */}
                <div className="col-md-4">
                  <label for="profileId" className="cols-sm-2 control-label">
                    Profile Id
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="profileId"
                        validate={validateRequired}
                      />
                      {errors.profileId && touched.profileId && (
                        <div className="input-group sm-1">
                          {errors.profileId}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End-ProfileId  */}

                {/* Start-CompanyId  */}
                <div className="col-md-4">
                  <label for="companyId" className="cols-sm-2 control-label">
                    Company Id
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="companyId"
                        validate={validateRequired}
                      />
                      {errors.companyId && touched.companyId && (
                        <div className="input-group sm-1">{errors.companyId}</div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End--CompanyId  */}

                {/* Start-Client Id  */}
                <div className="col-md-4">
                  <label for="clientId" className="cols-sm-2 control-label">
                   Client Id
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="clientId"
                        validate={validateRequired}
                      />
                      {errors.clientId && touched.clientId && (
                        <div className="input-group sm-1">{errors.clientId}</div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End-Client Id  */}

                {/* Start-Email  */}
                <div className="col-md-4">
                  <label for="emailId" className="cols-sm-2 control-label">
                    Email Address
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="emailId"
                        validate={validateEmail}
                      />
                      {errors.emailId && touched.emailId && (
                        <div className="input-group sm-1">
                          {errors.emailId}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End-emailAdd  */}

                {/* Start-FullName  */}
                <div className="col-md-4">
                  <label for="fullName" className="cols-sm-2 control-label">
                    Fullname
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="fullName"
                        rows="3"
                        validate={validateRequired}
                      />
                      {errors.fullName && touched.fullName && (
                        <div className="input-group sm-1">
                          {errors.fullName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End-FullName  */}

              {/* Start-Contact Num  */}
                <div className="col-md-4">
                  <label for="contactNum" className="cols-sm-2 control-label">
                    Contact Number
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field
                        className="form-control"
                        name="contactNum"
                        validate={validateRequired}
                      />
                      {errors.contactNum && touched.contactNum && (
                        <div className="input-group sm-1">
                          {errors.contactNum}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End-Contact Num  */}

                 <div className="col-md-6">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <div className="col-md-6">
                  <nav>
                    <Link to="/">
                      <button type="submit" className="btn btn-light">
                        Back
                      </button>
                    </Link>
                  </nav>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
