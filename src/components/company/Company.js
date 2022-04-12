import React, { Fragment, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as companyActions from "../../store/actions/company";
import * as clientActions from "../../store/actions/client";
import { BiEdit, BiTrash } from "react-icons/bi";

import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
import PopupAlert from "../layout/PopupAlert";
import { Link } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Client from "./Client";

const Company = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { selectedItem, selectedItemClient, mode } = location.state;
  const [showAlert, setShowAlert] = useState(false);
  const [saveComplete, setSaveComplete] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);

  // const clientList = useSelector((state) => state.company.searchResult[0].clientInfo);
  // const clientList = useSelector((state) => state.company.searchResult[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [clientMode, setClientMode] = useState("add");

  // const searchResult = useSelector((state) => state.company.searchResult);

  // const studentList = useSelector((state) => state.student.studentList);
  const userData = useSelector((state) => state.company.searchResult);
  const clientData = useSelector((state) => state.client.clientList);
  console.log("Result", clientData);

  console.log(userData);
  const style = { color: "black", fontSize: "13px", margin: "1" };
  const style1 = { color: "white", fontSize: "12px", margin: "1" };
  const style2 = { color: "blue", fontSize: "20px", margin: "3" };
  const style3 = { color: "red", fontSize: "25px", margin: "1" };
  const style4 = { color: "red", fontSize: "15px", margin: "1" };

  const Loading = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = <p style={style4}>Field is Required! </p>;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = <p style={style4}>Invalid email address!</p>;
    }
    return error;
  };

  const validateRequired = (value) => {
    let error;
    if (value === "") {
      error = <p style={style4}>Field is Required!</p>;
    }
    return error;
  };

  const handleDelClient = async (clientId, companyId) => {
    setError(null);
    setIsRefreshing(true);
    setDeleteClient(true);
    setTimeout(() => {
      setDeleteClient(false);
    }, 1000);
    console.log(clientId);

    try {
      setStatus(true);
      await dispatch(clientActions.deleteClient(clientId, companyId));
      setStatus(false);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  const handleSubmit = async (values) => {
    setError(null);
    setIsRefreshing(true);

    // console.log(values);
    const formData = {
      ...values,
      companyId: values.companyId,
    };
    console.log(formData);
    try {
      setIsLoading(true);
      if (mode === "edit") {
        await dispatch(companyActions.updateCompany(formData));
          // window.alert("Save!")
      } else {
        await dispatch(companyActions.addCompany(formData));
        window.alert("New Company Added!");
      }
      setIsLoading(false);
      setSaveComplete(true);

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };
  
  
  const displayClient =
    clientData &&
    clientData.map((item, index) => (
      // console.log("Result",item.fname),

      <tr key={index} style={style}>
        <th scope="row">{index + 1}</th>
        <td style={style}>{item.companyId}</td>
        <td>{item.clientDescr}</td>
        <td>{item.clientPhone}</td>
        <td>{item.clientEmail}</td>
        <td>{item.clientContact}</td>
        <td>
          <BiEdit
            style={style2}
            onClick={() => {
              // setSelectedClient(item);
              setSelectedCompany(item);
              setShow(true);
              setClientMode("edit");
            }}
          />
        </td>
        <td>
          <BiTrash
            style={style3}
            onClick={() => {
              if (window.confirm("Do you want to delete?")) {
                handleDelClient(item.clientId, item.companyId);
                window.alert("The Client is now deleted!");
              }
              // handleDelClient(item.clientId, item.companyId);
              // window.alert("The Client is now deleted!");
            }}
          />
        </td>
      </tr>
    ));

  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">
            Yes
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            No
          </button>
        </div>
      </div>
    </div>
  </div>;

  useEffect(() => {
    const getClient = async () => {
      await dispatch(clientActions.getClientCompany(selectedItem.companyId));
      // await dispatch(clientActions.updateClient(selectedItemClient.clientId)); //eto kaya
    };
    getClient();
  }, []);

  return (
    <Fragment className="container">
      {(mode === "add" || (mode === "edit" && !!selectedItem)) && (
        <div className="row justify-content-center" style={style}>
          <div className="col-md-8 m-4">
            <h3>{mode === "add" ? "Add Company" : "Edit Company"}</h3>
            {/* {showAlert && <PopupAlert text="Saved..." variant="primary" />} */}

            <Formik
              initialValues={{
                companyId: mode === "edit" ? selectedItem.companyId : "",
                companyDescr: mode === "edit" ? selectedItem.companyDescr : "",
                companyEmail: mode === "edit" ? selectedItem.companyEmail : "",
                companyContact:
                  mode === "edit" ? selectedItem.companyContact : "",
                companyPhone: mode === "edit" ? selectedItem.companyPhone : "",
                companyNotes: mode === "edit" ? selectedItem.companyNotes : "",
              }}
              onSubmit={(values) => {
                // same shape as initial values
                console.log(values);
                handleSubmit(values);
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form className="row g-3 m-1 form-group">
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={style1}
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-md-6">
                      <nav>
                        <Link to="/searchcompany">
                          <button
                            type="submit"
                            className="btn btn-light"
                            style={style}
                          >
                            Back
                          </button>
                        </Link>
                      </nav>
                    </div>
                    <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      dialogClassName="modal-90w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton>
                        {/* <Modal.Title id="example-custom-modal-styling-title">
                          Add Client
                        </Modal.Title> */}
                      </Modal.Header>
                      <Modal.Body>
                        <Client
                          // companyId={companyId.}
                          setShow={setShow}
                          mode={clientMode}
                          companyId={selectedCompany}
                          // clientId={selectedClient}
                        />
                      </Modal.Body>
                    </Modal>
                 
                  {/* Start-Company Id  */}
                  <div className="col-md-7">
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
                          disabled={
                            mode === "edit" || !!saveComplete ? true : false
                          }
                        />
                        {errors.companyId && touched.companyId && (
                          <div className="input-group sm-1">
                            {errors.companyId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Id  */}

                  {/* Start-Company Description  */}
                  <div className="col-md-7">
                    <label
                      for="companyDescr"
                      className="cols-sm-2 control-label"
                    >
                      Company Description
                    </label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <Field
                          className="form-control"
                          name="companyDescr"
                          validate={validateRequired}
                        />
                        {errors.companyDescr && touched.companyDescr && (
                          <div className="input-group sm-1">
                            {errors.companyDescr}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Description  */}

                  {/* Start-Company Email  */}
                  <div className="col-md-7">
                    <label
                      for="companyEmail"
                      className="cols-sm-2 control-label"
                    >
                      Company Email Address
                    </label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <Field
                          className="form-control"
                          name="companyEmail"
                          validate={validateEmail}
                        />
                        {errors.companyEmail && touched.companyEmail && (
                          <div className="input-group sm-1">
                            {errors.companyEmail}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Email  */}

                  {/* Start-Company Contact  */}
                  <div className="col-md-7">
                    <label
                      for="companyContact"
                      className="cols-sm-2 control-label"
                    >
                      Company Contact
                    </label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <Field
                          className="form-control"
                          name="companyContact"
                          validate={validateRequired}
                        />
                        {errors.companyContact && touched.companyContact && (
                          <div className="input-group sm-1">
                            {errors.companyContact}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Contact  */}

                  {/* Start-Company Contact Num  */}
                  <div className="col-md-7">
                    <label
                      for="companyPhone"
                      className="cols-sm-2 control-label"
                    >
                      Contact Number
                    </label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <Field
                          className="form-control"
                          name="companyPhone"
                          validate={validateRequired}
                        />
                        {errors.companyPhone && touched.companyPhone && (
                          <div className="input-group sm-1">
                            {errors.companyPhone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Contact Num  */}

                  {/* Start-Company Notes  */}
                  <div className="col-md-10">
                    <label
                      for="companyNotes"
                      className="cols-sm-2 control-label"
                    >
                      Company Notes
                    </label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <Field
                          className="form-control"
                          name="companyNotes"
                          rows="3"
                          component="textarea"
                          validate={validateRequired}
                        />
                        {errors.companyNotes && touched.companyNotes && (
                          <div className="input-group sm-1">
                            {errors.companyNotes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* End-Company Notes  */}

                  <div className="col-md-6">
                    {mode === "edit" && (
                      <button
                        // disabled={mode === "add" ?  true :  false}
                        onClick={() => {
                          // selectedItem.companyId
                          setSelectedCompany(selectedItem.companyId);
                          // setSelectedClient(selectedItem.clientId)
                          setShow(true);
                          setClientMode("add");
                        }}
                        className="btn btn-primary float-right"
                        style={style1}
                      >
                        Add Client
                      </button>
                    )}
                  </div>

                  {/* {deleteClient && (
                    <PopupAlert text="Client Deleted..." variant="danger" />
                  )} */}
                </Form>
              )}
            </Formik>

            {mode === "edit" && (
              <div className="pt-4">
                <p style={style2}>Client Lists</p>
                {!!clientData && (
                  <div>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <table class="table">
                        <thead>
                          <tr style={style}>
                            <th scope="col">#</th>
                            <th scope="col">Code</th>
                            <th scope="col">Description</th>
                            <th scope="col">Tel No.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact Person</th>
                          </tr>
                        </thead>
                        <tbody>{displayClient}</tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Company;
