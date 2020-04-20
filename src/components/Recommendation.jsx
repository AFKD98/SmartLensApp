import React from "react";
// import styled from "styled-components";
import Recphoto from "../assets/Recommend.jpg";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      contact: null,
      email: "",
      location: "",
      date: "",
      description: "",
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
          className="jumbotron jumbotron-fluid"
          className="text-right p-5"
        >
          <div className="container">
            <h1
              className="display-4"
              className="text-center text-white pr-5 pt-5 pb-4 mt-5"
            >
              Recommendation
            </h1>
            <p
              className="lead medium"
              className="text-center text-white pr-5 mt-1"
            >
              Fill the form below and we will get back to you with a<br />
              photographer that best suits your needs. You'll have a<br />
              photographer in less than 24 hours!
              <br />
            </p>
          </div>
        </div>
        {/* //Form for getting info starts here */}
        <form onSubmit={this.mySubmitHandler}>
          <h3>
            Hello {this.state.username} <br /> please enter your info below
          </h3>
          <p>Full Name</p>
          <input type="text" name="username" onChange={this.myChangeHandler} />
          <p>Contact Number</p>
          <input type="text" name="contact" onChange={this.myChangeHandler} />
          <p>Email</p>
          <input type="text" name="email" onChange={this.myChangeHandler} />
          <p>Location</p>
          <input type="text" name="location" onChange={this.myChangeHandler} />
          <p>Date</p>
          <input type="text" name="date" onChange={this.myChangeHandler} />
          <p>Event description</p>
          <input
            type="text"
            name="description"
            onChange={this.myChangeHandler}
          />
          <br />
          <br />
          {/* <input type="submit" /> */}
          <button type="submit" className="btn btn-outline-primary pd-4 md-4">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default MyForm;
