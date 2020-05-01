import React, { Component } from "react";
import HomePhoto2 from "../assets/home2.jpg";

class Vision extends Component {
  state = {};
  render() {
    return (
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
          marginBottom: "0px",
        }}
        className="jumbotron jumbotron-fluid text-right p-5"
      >
        <div className="container">
          <h2 className="display-4 text-left text-white pt-5 mt-5">
            Our Vision
          </h2>
          <p className="lead medium text-left text-white mt-1">
            Need a talented individual to cover an 
            occasion? Browse through our list of curated 
            photographers or let us find one for you
          </p>
        </div>
      </div>
    );
  }
}

export default Vision;
