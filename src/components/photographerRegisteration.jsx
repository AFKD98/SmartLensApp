import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import {Row, Col, Grid} from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import FormFile from 'react-bootstrap/FormFile';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';
import "../styles/photographerRegisteration.css";


class photographerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
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
                                <Form.Group controlId="username" className="pl-2">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter address" />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col>
                                <Form.Group controlId="contact" className="pr-2">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter contact number" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="occupation" className="pl-2">
                                    <Form.Label>Occupation</Form.Label>
                                    <Form.Control type="text" placeholder="Enter occupation"/>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label className="pb-2">Categories (tick all that apply) </Form.Label>
                        </Form.Row>
                        <Form.Row>
                            <Form.Check className="ml-2" label="Wedding" type="checkbox" id="wedding" />
                            <Form.Check className="ml-4" label="Product" type="checkbox" id="product" />
                            <Form.Check className="ml-4" label="Event" type="checkbox" id="event" />
                            <Form.Check className="ml-4" label="Portrait" type="checkbox" id="portrait" />
                            <Form.Check className="ml-4" label="Ranaography" type="checkbox" id="ranaography" />
                        </Form.Row>        

                        <Form.Row className="pt-3">
                            <Col>
                                <Form.Group controlId="equipment">
                                    <Form.Label>Equipment</Form.Label>
                                    <Form.Control type="text" placeholder="Enter equipment"/>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Col className="col-8">
                                <Form.Group controlId="samplework">
                                    <Form.Label>Sample Work (insert link to portfolio)</Form.Label>
                                    <Form.Control type="text" placeholder="Enter link"/>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="rating">
                                    <Form.Label>Rate yourself out of 10</Form.Label>
                                    <Form.Control as="select" value="Rating...">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Form.Control>
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


export default photographerRegistration;