import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, useFormikContext, useField } from "formik";
import * as companyActions from "../../store/actions/company";
import CustomSelect from "../layout/CustomSelect";
import { AiOutlineStop, AiOutlineCheck } from "react-icons/ai";
import PopupAlert from "../layout/PopupAlert";

const SearchCompany = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [status, setStatus] = useState(false);
  const [inactive, setInactive] = useState(false);

  const style = { color: "black", fontSize: "13px", margin: "1" };
  const style1 = { color: "white", fontSize: "12px", margin: "1" };
  const style2 = { color: "blue", fontSize: "20px", margin: "3" };
  const style3 = { color: "red", fontSize: "20px", margin: "3" };

  const companyList = useSelector((state) => state.company.searchResult);

  const Loading = () => {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  const displayCompany =
    companyList &&
    companyList.map((item, index) => (
      // console.log("Result",item.fname),

      <tr key={index} style={style}>
        <th scope="row">{index + 1}</th>
        <td style={style}>
          <nav>
            <Link to="/company" state={{ selectedItem: item, mode: "edit" }}>
              {item.companyId}
            </Link>
          </nav>
        </td>
        <td>
          <nav>
            <Link to="/company" state={{ selectedItem: item, mode: "edit" }}>
              {item.companyDescr}
            </Link>
          </nav>
        </td>
        <td>{item.companyEmail}</td>
        <td>{item.companyContact}</td>
        <td>{item.companyPhone}</td>
        <td>{item.companyNotes}</td>
        <td>
          <td>
            {item.active ? (
              <AiOutlineStop
                style={style3}
                onClick={() => {
                  if (window.confirm("Do you want to Inactive the Company?")) {
                    handleUserStatus(item._id);
                    window.alert("Company is now Inactive!");
                  }
                }}
              />
            ) : (
              <AiOutlineCheck
                style={style2}
                onClick={() => {
                  if (window.confirm("Do you want to Active the Company?")) {
                    handleUserStatus(item._id);
                    window.alert("Company is now Active!");
                  }
                }}
              />
            )}
          </td>
        </td>
      </tr>
    ));

  const handleUserStatus = async (companyId) => {
    setError(null);
    setIsRefreshing(true);
    setInactive(true);
    setTimeout(() => {
      setInactive(false);
    }, 1000);
    // console.log(_id);

    try {
      setStatus(true);
      await dispatch(companyActions.deActivateCompany(companyId));
      setStatus(false);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  const handleSubmit = async (values) => {
    setError(null);
    setIsRefreshing(true);

    console.log(values);

    try {
      setIsLoading(true);
      await dispatch(companyActions.searchCompany(values));
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  return (
    <Fragment className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 m-4">
          <h5>Search Company</h5>
          <Formik
            initialValues={{
              companyId: "",
              companyDescr: "",
              companyEmail: "",
              companyContact: "",
              companyPhone: "",
              companyNotes: "",
              active: true,
              // lastUpdatedOn: Date.now(),
            }}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="row g-3 m-1 form-group" style={style}>
                <div className="col-md-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={style1}
                  >
                    Search
                  </button>
                </div>
                <div className="col-md-6">
                  <nav>
                    <Link to="/">
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

                {/* Start-Company Id  */}
                <div className="col-md-4">
                  <label for="companyId" className="cols-sm-2 control-label">
                    Company Id
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field className="form-control" name="companyId" />
                    </div>
                  </div>
                </div>
                {/* End-Company Id  */}

                {/* Start-Company Description  */}
                <div className="col-md-6">
                  <label for="companyDescr" className="cols-sm-2 control-label">
                    Company Description
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field className="form-control" name="companyDescr" />
                    </div>
                  </div>
                </div>
                {/* End-Company Description  */}

                {/* Start-Company Email  */}
                <div className="col-md-4">
                  <label for="companyEmail" className="cols-sm-2 control-label">
                    Company Email Address
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field className="form-control" name="companyEmail" />
                    </div>
                  </div>
                </div>
                {/* End-Company Email  */}

                {/* Start-Company Contact Person  */}
                <div className="col-md-4">
                  <label
                    for="companyContact"
                    className="cols-sm-2 control-label"
                  >
                    Company Contact
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field className="form-control" name="companyContact" />
                    </div>
                  </div>
                </div>
                {/* End-Company Contact Person  */}

                {/* Start-Company Contact Num  */}
                <div className="col-md-4">
                  <label for="companyPhone" className="cols-sm-2 control-label">
                    Contact Number
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"></span>
                      <Field className="form-control" name="companyPhone" />
                    </div>
                  </div>
                </div>
                {/* End-Company Contact Num  */}

                {/* Start-Status   */}
                <div className="col-md-4">
                  <label for="active" className="cols-sm-2 control-label">
                    Status
                  </label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <Field
                        className="custom-select"
                        name="active"
                        options={[
                          {
                            label: "Active",
                            value: true,
                          },
                          {
                            label: "Inactive",
                            value: false,
                          },
                        ]}
                        component={CustomSelect}
                        placeholder="True"
                        isMulti={false}
                      />
                    </div>
                  </div>
                </div>
                {/* End-Status  */}

                {/* Start-Company Notes  */}
                {/* <div className="col-md-4">
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
                        />
                      
                        
                      </div>
                    </div>
                  </div> */}
                {/* End-Company Notes  */}
              </Form>
            )}
          </Formik>

          <div className="pt-4">
            {/* {inactive
                  ? (
                  <PopupAlert text="Company Inactive!" variant="danger"/> 
                  ):(
                   <PopupAlert text="Company Active!" variant="light"/> )} */}

            <p style={style2}>Search Result</p>
            {!!companyList && (
              <div>
                {isLoading ? (
                  <Loading />
                ) : (
                  <table class="table">
                    <thead>
                      <tr style={style}>
                        <th scope="col">#</th>
                        <th scope="col"> Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Person</th>
                        <th scope="col">Tel no.</th>
                        <th scope="col">Notes</th>
                        <th></th>
                        {/* <th scope="col">Status</th> */}
                      </tr>
                    </thead>
                    <tbody>{displayCompany}</tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchCompany;
