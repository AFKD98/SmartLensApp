import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
// import FormControl from "react-bootstrap/FormControl";
// import FormFile from "react-bootstrap/FormFile";
import axios from "axios";
// import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import "../styles/photographerRegisteration.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

class photographerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      address: "",
      contact: "",
      email: "",
      occupation: "",
      equipment: "",
      rating: 5,
      category: [],
      description: "",
      sampleWork: "",
      categories: [],
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.ratingHandler = this.ratingHandler.bind(this);
  }
  onChangeHandler(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  ratingHandler(event) {
    this.setState({ rating: parseInt(event.target.value, 10) });
  }
  onCategoryChange(event) {
    this.setState({
      category: this.state.category.concat([event.target.value]),
    });
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://smartlensapplication.herokuapp.com/registration_photographer/add",
        {
          Name: this.state.name,
          Username: this.state.username, //unique
          ContactNumber: this.state.contact,
          Email: this.state.email,
          Occupation: this.state.occupation,
          Equipment: this.state.equipment, //list
          Category: this.state.category, //list
          Self_rating: this.state.rating,
          Description: this.state.description,
          Sample_work: this.state.sampleWork, //Link
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // componentDidMount() {
  // }
  componentWillMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the categories from Mongo
      .get("https://smartlensapplication.herokuapp.com/categories/")
      .then((res) => {
        res.data.map((entree) =>
          this.setState({
            categories: this.state.categories.concat([
              //storing all the category ids and their name values in my local state array
              { key: entree._id, categoryName: entree.categoryname },
            ]),
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {/* START JUMBOTRON */}
        <div className="jumbotron jumbotron-fluid one">
          <div className="container">
            <h1 className="display-4 text-center mt-5">
              Hello {this.state.name}
            </h1>
            <p className="text-center lead">
              Register with us and become a part of SmartLens!
            </p>
          </div>
        </div>
        {/* END JUMBOTRON */}

        <div className="container-md farm">
          <Form onSubmit={this.onSubmitHandler}>
            <Form.Row>
              <Col>
                <Form.Group controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="email" className="pr-md-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="username" className="pl-md-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="contact" className="pr-md-2">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="contact"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="occupation" className="pl-md-2">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter occupation"
                    name="occupation"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Label className="pb-2">
                Categories (tick all that apply){" "}
              </Form.Label>
            </Form.Row>
            <Form.Row onChange={this.onCategoryChange}>
              {this.state.categories.map((Category, index) => (
                <Form.Check
                  className="ml-2"
                  value={Category.categoryName}
                  label={Category.categoryName}
                  type="checkbox"
                  id={Category.key}
                  key={index}
                />
              ))}
            </Form.Row>

            <Form.Row className="pt-3">
              <Col>
                <Form.Group controlId="equipment">
                  <Form.Label>Equipment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter equipment"
                    name="equipment"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className="pt-6">
              <Col>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Describe yourself in a few words"
                    name="description"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-8">
                <Form.Group controlId="samplework">
                  <Form.Label>
                    Sample Work (insert link to portfolio)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter link"
                    name="sampleWork"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="rating">
                  <Form.Label>Rate yourself out of 10</Form.Label>

                  <RangeSlider
                    value={this.state.rating}
                    onChange={this.ratingHandler}
                    min={0}
                    max={10}
                    step={1}
                    tooltip="auto"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Button className="mt-3" className="btn btn-dark" type="submit">
                Submit
              </Button>
            </Form.Row>
          </Form>
        </div>

        <br />
      </div>
    );
  }
}

export default photographerRegistration;
