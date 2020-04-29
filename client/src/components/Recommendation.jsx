import React from "react";
// import styled from "styled-components";
import Recphoto from "../assets/Recommend.jpg";
import axios from "axios";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      email: "",
      location: "",
      category: "",
      photographer: "",
      budget: 0,
      expertise: "",
      description: "",
      date: new Date(),
    };
  }
  onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/clients/add", {
        ClientName: this.state.name, //it is getting the ClientName from the post request
        ContactNumber: this.state.contact,
        Email: this.state.email,
        Location: this.state.location,
        Category: this.state.category,
        Photographer: this.state.photographer, //photographer id?
        Budget: this.state.budget,
        Expertise: this.state.expertise,
        Event_Description: this.state.description,
        Approved: false,
        date: this.state.date,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    let contact = this.state.contact;
    if (!Number(contact)) {
      alert("Your contact must be a number");
    }
  };
  onChangeHandler = (event) => {
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
            <h3 className="text-center text-white pr-auto pt-auto pb-auto mt-auto">
              Hello {this.state.username} <br /> please enter your info below
            </h3>
            <h1
              className="display-4"
              className="text-center text-white pr-auto pt-auto pb-auto mt-auto"
            >
              Recommendation
            </h1>
            <p
              className="lead medium"
              className="text-center text-white pr-auto mt-auto"
            >
              Fill the form below and we will get back to you with a<br />
              photographer that best suits your needs. You'll have a<br />
              photographer in less than 24 hours!
              <br />
            </p>
          </div>
        </div>
        {/* //Form for getting info starts here */}
        <form onSubmit={this.onSubmitHandler}>
          <p>Full Name</p>
          <input type="text" name="name" onChange={this.onChangeHandler} />
          <p>Contact Number</p>
          <input type="text" name="contact" onChange={this.onChangeHandler} />
          <p>Email</p>
          <input type="text" name="email" onChange={this.onChangeHandler} />
          <p>Category</p>
          <input type="text" name="category" onChange={this.onChangeHandler} />
          <p>Location</p>
          <input type="text" name="location" onChange={this.onChangeHandler} />
          <p>Budget</p>
          <input type="number" name="budget" onChange={this.onChangeHandler} />
          <p>Expertise</p>
          <input type="text" name="expertise" onChange={this.onChangeHandler} />
          <p>Description</p>
          <input
            type="text"
            name="description"
            onChange={this.onChangeHandler}
          />

          <p>Date of event</p>
          <input
            type="date"
            data-date=""
            data-date-format="DD MMMM YYYY"
            name="date"
            onChange={this.onChangeHandler}
          />

          <button type="submit" className="btn btn-outline-primary pd-4 md-4">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default MyForm;
