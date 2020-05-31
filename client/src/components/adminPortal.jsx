import React, { Component } from "react";
import { getOrders, deleteOrder, updateOrder } from "../actions/orderActions"; //stored as a prop
import { loadUser, logout } from "../actions/authActions";
import PropTypes from "prop-types"; // validation
import { withStyles } from "@material-ui/core/styles";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import LoginPage from "./login";
import OrdersList from "./orderList";
import PhotographerRegistrationDetails from "./photographerRegistrationDetails";
import PhotographersList from "./myphotographers";
import SignUp from "./signup";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paperBig: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "#E8E8E8",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  heading: {
    padding: theme.spacing(2),
  },
  subtitle1: {
    fontSize: "1rem",
  },
  subtitle2: {
    fontSize: "1rem",
  },
});

class AdminPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabNumber: 0,
    };
  }

  async componentDidMount() {
    await this.props.loadUser();
  }

  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  render() {
    const authLinks = (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="/">SmartLens</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                onClick={() =>
                  this.setState({
                    tabNumber: 1,
                  })
                }
              >
                Bookings
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  this.setState({
                    tabNumber: 2,
                  })
                }
              >
                Registrations
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  this.setState({
                    tabNumber: 3,
                  })
                }
              >
                Photographers
              </Nav.Link>
              <Nav.Link
                onClick={() =>
                  this.setState({
                    tabNumber: 4,
                  })
                }
              >
                Create Account
              </Nav.Link>
              <Nav.Link href="/adminPortal" onClick={this.props.logout}>
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );

    const bookingsPage = (
      <React.Fragment>
        {authLinks},
        <OrdersList />
      </React.Fragment>
    );

    const regiPage = (
      <React.Fragment>
        {authLinks},
        <PhotographerRegistrationDetails />
      </React.Fragment>
    );

    const photographersPage = (
      <React.Fragment>
        {authLinks},
        <PhotographersList />
      </React.Fragment>
    );

    const createAccountPage = (
      <React.Fragment>
        {authLinks},
        <SignUp />
      </React.Fragment>
    );

    switch (this.state.tabNumber) {
      case 0:
        return (
          <React.Fragment>
            {this.props.isAuthenticated ? authLinks : <LoginPage />}
          </React.Fragment>
        );
      case 1:
        return bookingsPage;
      case 2:
        return regiPage;
      case 3:
        return photographersPage;
      case 4:
        return createAccountPage;
    }
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  orders: state.orders, // orders is coming from root reducer at /reducers/index.js
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  getOrders,
  deleteOrder,
  updateOrder,
  loadUser,
  logout,
})(withStyles(useStyles)(AdminPortal)); //exporting a component make it reusable and this is the beauty of react
