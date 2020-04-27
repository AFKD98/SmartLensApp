import React from "react";
// import styled from "styled-components";
import Recphoto from "../assets/Recommend.jpg";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      contact: null,
      email: "",
      location: "",
      equipment: "",
      description: "",
      link: "",
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    let contact = this.state.contact;
    if (!Number(contact)) {
      alert("Your contact must be a number");
    }
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    return (
      <React.Fragment>
        {/* //jumborton board and image */}
        <div
          style={{
            backgroundImage: "url(" + Recphoto + ")",
            paddingTop: 50,
            padding: 50,
            paddingBottom: 50,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "70vh",
          }}
          className="jumbotron jumbotron-fluid text-right p-5"
        >
          <div className="container">
            <h3 className="text-center text-white pr-5 pt-5 pb-2 mt-5">
              Hello {this.state.username} <br /> please enter your info below
            </h3>
            <h1 className="display-4 text-center text-white pr-1 pt-5 pb-4 mt-1">
              Work with us
            </h1>
            <p className="lead medium text-center text-white pr-5 mt-1">
              For photographers who want to join SmartLens
              <br />
            </p>
          </div>
        </div>
        {/* //Form for getting info starts here */}
        <form onSubmit={this.mySubmitHandler}>
          <p>Full Name</p>
          <input type="text" name="username" onChange={this.myChangeHandler} />
          <p>Contact Number</p>
          <input type="text" name="contact" onChange={this.myChangeHandler} />
          <p>Email</p>
          <input type="text" name="email" onChange={this.myChangeHandler} />
          <p>Location</p>
          <input type="text" name="location" onChange={this.myChangeHandler} />
          <p>Equipment</p>
          <input type="text" name="equipment" onChange={this.myChangeHandler} />
          <p>Event description</p>
          <input
            type="text"
            name="description"
            onChange={this.myChangeHandler}
          />
          <p>Link to your portfolio</p>
          <input type="text" name="link" onChange={this.myChangeHandler} />
          <br />
          <br />
          {/* <input type="submit" /> */}
          <button
            type="submit"
            className="btn btn-outline-primary pd-4 md-4 relative-center"
          >
            Continue
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Registration;
