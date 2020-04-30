import React, { Component } from "react";
import HomePhoto from "../assets/homephoto2.png";

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
          className="jumbotron jumbotron-fluid text-right"
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
              className="btn btn-outline-light text-center mr-4 mt-2"
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
      </React.Fragment>
    );
  }
}

export default HomeView;
