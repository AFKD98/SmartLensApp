import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-dark">
        <div className="container ">
          <h5 className="display-4" className="text-left text-light  ">
            Contact Us
          </h5>
          <p className="lead medium" className="text-left text-light ">
            Address: street DHA, Lahore <br />
            Phone: 0900 78601 <br />
            Email: abcd@yahoo.com
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
