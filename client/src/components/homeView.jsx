import React, { Component } from "react";
import HomePhoto from "../assets/homephoto2.png";
import HomePhoto2 from "../assets/home2.jpg";
import HomePhoto3 from "../assets/homephoto3.jpg";

class HomeView extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundImage: "url(" + HomePhoto + ")",
            paddingTop: 50,
            padding: 50,
            paddingBottom: 50,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
          className="jumbotron jumbotron-fluid text-right p-5"
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
              href="/categories"
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
        </div>

        <div
          style={{
            backgroundImage: "url(" + HomePhoto2 + ")",
            paddingTop: 50,
            padding: 50,
            paddingBottom: 50,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
          className="jumbotron jumbotron-fluid text-right p-5"
        >
          <div className="container">
            <h2 className="display-4 text-left text-white pr-5 pt-5 mt-5">
              Our Vision
            </h2>
            <p className="lead medium text-left text-white pr-5 mt-1">
              Need a talented individual to cover an <br />
              occasion? Browse through our list of curated <br />
              photographers or let us find one for you
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundImage: "url(" + HomePhoto3 + ")",
            paddingTop: 50,
            padding: 50,
            paddingBottom: 50,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
          className="jumbotron jumbotron-fluid text-right p-5"
        >
          <div className="container">
            <h2 className="display-4 text-right text-white pr-5 pt-5 mt-5">
              Owner's message
            </h2>
            <p className="lead medium text-right text-white pr-5 mt-1">
              Need a talented individual to cover an <br />
              occasion? Browse through our list of curated <br />
              photographers or let us find one for you
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HomeView;
