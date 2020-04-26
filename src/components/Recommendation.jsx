import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import {Row, Col, Grid} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import "../styles/photographerRegisteration.css";
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
    return(
        <div>
            {/* START JUMBOTRON */}
            <div className = "jumbotron jumbotron-fluid one">
                <div className = "container">
                    
                </div>
            </div>
            {/* END JUMBOTRON */}

            <div className="container farm">
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="fullname">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name"/>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="email" className="pr-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="contact" className="pl-2">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter contact number" />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="location" className="pr-2">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter location" />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="budget" className="pl-2">
                                <Form.Label>Budget</Form.Label>
                                <Form.Control type="text" placeholder="Enter budget"/>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Form.Label className="pb-2">Categories (tick all that apply) </Form.Label>
                    </Form.Row>
                    <Form.Row className="pb-3">
                        <Form.Check className="ml-2" label="Wedding" type="checkbox" id="wedding" />
                        <Form.Check className="ml-4" label="Product" type="checkbox" id="product" />
                        <Form.Check className="ml-4" label="Event" type="checkbox" id="event" />
                        <Form.Check className="ml-4" label="Portrait" type="checkbox" id="portrait" />
                        <Form.Check className="ml-4" label="Ranaography" type="checkbox" id="ranaography" />
                    </Form.Row>  

                    <Form.Row>
                        <Col className="col-6">
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" placeholder="mm/dd/yyyy"/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="expertise">
                                <Form.Label>Expertise</Form.Label>
                                <Form.Control as="select" value="Expertise...">
                                    <option>1 (beginner)</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10 (expert)</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                            
                        
                    </Form.Row>
                    
                    <Form.Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Comments</Form.Label>
                          <Form.Control as="textarea" rows="3"/>
                        </Form.Group>
                      </Col>
                    </Form.Row>
                    
                    <Form.Row>
                        <Button className="mt-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Row>
                </Form>
            </div>

            
            <br/>
        </div>
    )
  }
}

export default MyForm;
