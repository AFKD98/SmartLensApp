import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Scroll from "react-scroll";
const ScrollLink = Scroll.ScrollLink;

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
          <Navbar.Brand href="/">SmartLens</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/photoreg">Register</Nav.Link>
              <Nav.Link href="/adminportal">Sign In</Nav.Link>
              <Nav.Link href="/vision">Vision</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* <Link to="/contact" /> */}

        {/*<nav className="navbar navbar-expand-lg navbar-light bg-light px-auto py-auto mx-auto my-auto">
          <a className="navbar-brand text-dark" href="/">
            SmartLens
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto my-auto">
              <li className="nav-item active">
                <a className="nav-link text-dark" href="/">
                  Vision <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link text-dark" href="/photoreg">
                  Register
                </a>
              </li>
              <li className="nav-item  active">
                <a
                  className="nav-link text-dark"
                  href="#"
                  // tabindex="-1"
                  // aria-disabled="true"
                >
                  Contact
                </a>
              </li>
              <li className="nav-item  active">
                <a className="nav-link text-dark" href="/adminPortal">
                  Sign in
                </a>
              </li>
            </ul>
          </div>
        </nav>*/}
      </React.Fragment>
    );
  }
}

export default NavBar;
