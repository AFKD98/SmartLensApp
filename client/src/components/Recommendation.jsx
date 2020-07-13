import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/photographerRegisteration.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { connect } from "react-redux";
import { addOrder } from "../actions/orderActions";
import PropTypes from "prop-types"; // validation

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      email: "",
      location: "",
      category: [],
      photographer: this.props.match.params.type,
      budget: 0,
      expertise: "",
      description: "",
      categories: [],
      date: new Date(),
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onExpertiseChange = this.onExpertiseChange.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.getExpertise = this.getExpertise.bind(this);
  }

  static propTypes = {
    addOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    const newOrder = {
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
    };
    this.props.addOrder(newOrder);
  };

  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  onExpertiseChange(event) {
    this.setState({ expertise: event.target.value });
  }

  getExpertise() {
    if (this.props.match.params.type === "none") {
      return (
        <Form.Group controlId="expertise">
          <Form.Label className="ml-md-5">Expertise</Form.Label>
          <Form.Row>
            <Col className="col-6 col-md-12 ml-md-5">
              <ToggleButtonGroup
                className="pb-2"
                type="radio"
                name="options"
                defaultValue={1}
                onClick={this.onExpertiseChange}
              >
                <ToggleButton className="btn btn-dark" value={"All"}>
                  All
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Silver"}>
                  Silver
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Gold"}>
                  Gold
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Platinum"}>
                  Platinum
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Form.Row>
        </Form.Group>
      );
    }
  }

  categoryHandler(event) {
    this.setState({
      category: this.state.category.concat([event.target.value]),
    });
  }

  componentDidMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the categories from Mongo
      .get("https://smartlensapplication.herokuapp.com/categories/")
      .then((res) => {
        res.data.map((entree) =>
          this.setState({
            expertise: this.props.match.params.type,
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
            <h2 className="display-4 text-center mt-1">
              Hello {this.state.name}
            </h2>
            <h1 className="display-4 text-center mt-1">
              Please fill form for booking
            </h1>
          </div>
        </div>
        {/* END JUMBOTRON */}

        <div className="container-md farm">
          <Form onSubmit={this.onSubmitHandler}>
            <Form.Row>
              <Col className="col-12">
                <Form.Group
                  controlId="fullname"
                  onChange={this.onChangeHandler}
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Enter name"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-6">
                <Form.Group
                  controlId="email"
                  className="pr-md-2"
                  onChange={this.onChangeHandler}
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="text"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  controlId="contact"
                  className="pl-md-2"
                  onChange={this.onChangeHandler}
                >
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    name="contact"
                    type="text"
                    placeholder="Enter contact number"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-6">
                <Form.Group
                  controlId="location"
                  className="pr-md-2"
                  onChange={this.onChangeHandler}
                >
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="location"
                    type="text"
                    placeholder="Enter location"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  controlId="budget"
                  className="pl-md-2"
                  onChange={this.onChangeHandler}
                >
                  <Form.Label>Budget</Form.Label>
                  <Form.Control
                    name="budget"
                    type="Number"
                    placeholder="Enter budget"
                  />
                </Form.Group>
              </Col>
            </Form.Row>

            <Form.Row>
              <Form.Label className="pb-2">
                Categories (tick all that apply)
              </Form.Label>
            </Form.Row>
            <Form.Row className="pb-3" onChange={this.categoryHandler}>
              {this.state.categories.map((Category) => (
                <Form.Check
                  name="category"
                  className="mr-2"
                  value={Category.categoryName}
                  label={Category.categoryName}
                  type="checkbox"
                  id={Category.key}
                  key={Category.key}
                />
              ))}
            </Form.Row>

            <Form.Row>
              <Col className="col-12 col-md-6">
                <Form.Group controlId="date" onChange={this.onChangeHandler}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    name="date"
                    type="date"
                    placeholder="mm/dd/yyyy"
                  />
                </Form.Group>
              </Col>

              <Col className="col-12 col-md-6">{this.getExpertise()}</Col>
            </Form.Row>

            <Form.Row>
              <Col className="col-12">
                <Form.Group onChange={this.onChangeHandler}>
                  <Form.Label>Comments</Form.Label>
                  <Form.Control name="description" as="textarea" rows="4" />
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

const mapStateToProps = (state) => ({
  // to use the state as props
  orders: state.orders, // orders is coming from root reducer at /reducers/index.js
});

export default connect(mapStateToProps, { addOrder })(MyForm); //exporting a component make it reusable and this is the beauty of react
