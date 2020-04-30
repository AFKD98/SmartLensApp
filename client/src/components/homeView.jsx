import React, { Component } from "react";
import HomePhoto from "../assets/homephoto2.png";

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
              href="/Categories"
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
