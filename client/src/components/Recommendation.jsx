import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/photographerRegisteration.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "090078601",
      email: "af79614@gmail.com",
      location: "Model Town",
      category: ["Wedding", "Food", "Party"],
      photographer: this.props.match.params.type,
      budget: 100000,
      expertise: "Gold",
      description: "Give me a photographer",
      categories: [],
      date: new Date(),
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onExpertiseChange = this.onExpertiseChange.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.getExpertise = this.getExpertise.bind(this);
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    let budget = this.state.budget;
    if (!Number(budget)) {
      alert("Your budget must be a number");
    }

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
  };
  onChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  onExpertiseChange(event) {
    this.setState({ expertise: parseInt(event.target.value, 10) });
  }
  getExpertise() {
    if (this.props.match.params.type === "none") {
      return (
        <Form.Group controlId="expertise">
          <Form.Label className="expert">Expertise</Form.Label>
          <Form.Row>
            <Col className="expertise">
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

  componentWillMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the categories from Mongo
      .get("http://localhost:5000/categories/")
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
          <div className="container"></div>
        </div>
        {/* END JUMBOTRON */}

        <div className="container farm">
          <Form onSubmit={this.onSubmitHandler}>
            <Form.Row>
              <Col>
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
              <Col>
                <Form.Group
                  controlId="email"
                  className="pr-2"
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
                  className="pl-2"
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
              <Col>
                <Form.Group
                  controlId="location"
                  className="pr-2"
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
                  className="pl-2"
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
                  className="ml-2"
                  value={Category.categoryName}
                  label={Category.categoryName}
                  type="checkbox"
                  id={Category.key}
                  key={Category.key}
                />
              ))}
            </Form.Row>

            <Form.Row>
              <Col className="col-6">
                <Form.Group controlId="date" onChange={this.onChangeHandler}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    name="date"
                    type="date"
                    placeholder="mm/dd/yyyy"
                  />
                </Form.Group>
              </Col>

              <Col>{this.getExpertise()}</Col>
            </Form.Row>

            <Form.Row>
              <Col>
                <Form.Group onChange={this.onChangeHandler}>
                  <Form.Label>Comments</Form.Label>
                  <Form.Control name="description" as="textarea" rows="3" />
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

export default MyForm;
