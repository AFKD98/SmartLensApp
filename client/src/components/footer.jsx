import React, { Component } from "react";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="jumbotron jumbotron-fluid bg-dark foot">
        <div className="container ">
          <h3 className="display-4" className="text-left text-light ml-4 ">
            Contact Us
          </h3>
          <p className="lead medium" className="text-left text-light ml-4 ">
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
