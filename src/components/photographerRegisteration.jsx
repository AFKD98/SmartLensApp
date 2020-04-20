import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
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

                <Form className="farm ml-5">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}


export default photographerRegistration;