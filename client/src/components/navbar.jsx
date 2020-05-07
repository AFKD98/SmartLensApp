import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types"; // validation
import { logout } from "../actions/authActions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const guestLinks = (
      <React.Fragment>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
          <Navbar.Brand href="/">SmartLens</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/photoreg">Register</Nav.Link>
              <Nav.Link href="/login">Sign In</Nav.Link>
              <Nav.Link href="/vision">Vision</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );

    const authLinks = (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/">SmartLens</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/detail">Order details</Nav.Link>
              <Nav.Link onClick={this.props.logout}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {isAuthenticated ? authLinks : guestLinks}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  auth: state.auth, // auth is coming from root reducer at /reducers/index.js
});

export default connect(mapStateToProps, { logout })(NavBar);
