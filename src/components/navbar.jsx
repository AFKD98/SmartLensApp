import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        {/* Links for navigation */}
        <Link to="/" />
        <Link to="/recommendation" />
        <Link to="/categories" />
        <Link to="/photoreg" />
        {/* <Link to="/contact" /> */}

        <nav className="navbar navbar-expand-lg navbar-light bg-trans fixed-top mx-auto my-auto">
          <a className="navbar-brand text-white" href="/">
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

          <div
            className="collapse navbar-collapse pull-xs-right justify-content-end"
            id="navbarsExampleDefault"
          >
            <ul className="navbar-nav mt-2 mt-md-0">
              <li className="nav-item active">
                <a className="nav-link text-white" href="/">
                  Vision <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link text-white" href="/photoreg">
                  Register
                </a>
              </li>
              <li className="nav-item  active">
                <a
                  className="nav-link text-white"
                  href="#"
                  // tabindex="-1"
                  // aria-disabled="true"
                >
                  Contact
                </a>
              </li>
              <li className="nav-item  active">
                <a className="nav-link text-white" href="#">
                  Sign in
                </a>
              </li>
              {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sign in
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
