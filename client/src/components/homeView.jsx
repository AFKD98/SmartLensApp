import React, { Component } from "react";
import HomePhoto from "../assets/homephoto2.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/homeView.css";

class HomeView extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: "url(" + HomePhoto + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginBottom: "0px",
          }}
          className="jumbotron jumbotron-fluid"
        >
          <div className="container">
            <h2 className="display-4 text-right pr-5 pt-5 mt-5">
              Photography made simple
            </h2>
            <p className="lead medium text-right pr-5 mt-1">
              Need a talented individual to cover an <br />
              occasion? Browse through our list of curated <br />
              photographers or let us find one for you
            </p>
            <a
              className="btn btn-outline-light text-center mr-2 mt-2"
              href="/CategoriesPage"
            >
              Book Now
            </a>
            <a
              className=" btn btn-outline-light mr-5 mt-2"
              href="/recommendation/none"
            >
              Recommendation
            </a>
          </div>

          {/*<Row className="justify-content-right">
            <Col className="col-lg-6 col-sm-0"></Col>

            <Col className="col-lg-6 col-sm-12">
              <div className="container-lg homePageText">
                <h1 className="display-4">Photography made simple</h1>
                <Row className="row-lg-6">
                  <Col className="col-lg-7">
                    <p className="lead">
                      Need a talented individual to cover an
                      occasion? Browse through our list of curated
                      photographers or let us find one for you
                    </p>
                    <a className="btn btn-outline-light buts mr-3 d-lg-inline" href="/categories">
                      Book Now
                    </a>
                    <a className=" btn btn-outline-light buts d-lg-inline" href="/recommendation/none">
                      Recommendation
                    </a>
                  </Col>

                  <Col className="col-lg-5"></Col>
                </Row>
              </div>
            </Col>
        </Row>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default HomeView;
