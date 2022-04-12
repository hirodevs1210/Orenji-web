import React, { Fragment } from "react";

import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import classes from './ErrorModal.module.css';

const currentDate = new Date();
const date = `${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
// ${currentDate.getFullYear()}

const Dashboard = () => {
  const style = { color: "1FA0FB", fontSize: "3.5em" };
  const style2 = { color: "1FA0FB", fontSize: "1.5em" };

  // window.location.reload();

  return (
    <Fragment>
      <Container className="container-center" border-radius="5px">
        <div className="card">
          <div className="card-header m-1">
            <p style={style2}>今日は {date}</p>
          </div>
          <div className="card-body m-1">
            <Row md={3}>
              <Col>
                <nav>
                  <Link to="/company" state={{ mode: "add" }}>
                  <FaBuilding style={style} />
                    Add Company
              
                  </Link>
                </nav>
              </Col>

              <Col>
                <nav>
                  <Link to="/searchcompany">
                    <BiSearchAlt style={style} />
                    
                    Search
                  </Link>{" "}
                </nav>
              </Col>
            </Row>
            <p style={style}></p>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
