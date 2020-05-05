import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getSingleOrder,
  deleteOrder,
  updateOrder,
  getOrders,
} from "../actions/orderActions"; //stored as a prop
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
});

class orderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClientName: "def",
      msg: null,
      refresh: false,
      data: [],
    };
  }

  async componentDidMount() {
    await this.props.getOrders();
    this.setState({
      data: this.props.orders.ordersList,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.orders.loading !== prevProps.orders.loading) {
      console.log("updated");
      this.setState({
        data: this.props.orders.ordersList,
      });
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    console.log(1);
    // this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const updateOrder = {
      ClientName: this.state.ClientName, //it is getting the ClientName from the post request
      ContactNumber: this.state.ContactNumber,
      Email: this.state.Email,
      Location: this.state.Location,
      Category: this.state.Category,
      Photographer: this.state.Photographer, //photographer id?
      Budget: this.state.Budget,
      Expertise: this.state.Expertise,
      Event_Description: this.state.Event_Description,
      Approved: this.state.Approved,
      date: this.state.date,
    };

    let contact = this.state.contact;
    if (!Number(contact)) {
      alert("The contact must be a number");
    }
    this.props.updateOrder(updateOrder);
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.props.orders;
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        {/* {this.props.isAuthenticated ? <Redirect to="/adminPortal" /> : null} */}
        {!loading ? (
          <div>
            {this.state.data.map((stuff) => (
              <div>
                <React.Fragment>
                  <Typography component="h1" variant="h4">
                    Details
                  </Typography>
                  <form onSubmit={this.onSubmit} className={classes.form}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="ClientName"
                      label="Client Name"
                      name="ClientName"
                      autoFocus
                      defaultValue={stuff.ClientName}
                      onChange={this.onChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="ContactNumber"
                      label="Contact Number"
                      id="ContactNumber"
                      onChange={this.onChange}
                      defaultValue={stuff.ContactNumber}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Email"
                      label="Email"
                      id="Email"
                      type="email"
                      onChange={this.onChange}
                      defaultValue={stuff.Email}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Location"
                      label="Location"
                      id="Location"
                      onChange={this.onChange}
                      defaultValue={stuff.Location}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Category"
                      label="Category"
                      id="Category"
                      onChange={this.onChange}
                      defaultValue={stuff.Category}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Photographer"
                      label="Photographer"
                      id="Photographer"
                      onChange={this.onChange}
                      defaultValue={stuff.Photographer}
                    />

                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Budget"
                      label="Budget"
                      id="Budget"
                      type="number"
                      onChange={this.onChange}
                      defaultValue={stuff.Budget}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Expertise"
                      label="Expertise"
                      id="Expertise"
                      onChange={this.onChange}
                      defaultValue={stuff.Expertise}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Event_Description"
                      label="Event Description"
                      id="Event_Description"
                      onChange={this.onChange}
                      defaultValue={stuff.Event_Description}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="Approved"
                      label="Approved"
                      id="Approved"
                      defaultValue={stuff.Approved}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="date"
                      label="Date"
                      id="date"
                      onChange={this.onChange}
                      defaultValue={stuff.date}
                    />
                    {this.state.msg ? (
                      <Alert severity="error">{this.state.msg}</Alert>
                    ) : null}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Update
                    </Button>
                  </form>
                </React.Fragment>
              </div>
            ))}
          </div>
        ) : null}
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  orders: state.orders, // orders is coming from root reducer at /reducers/index.js
  isAuthenticated: state.auth.isAuthenticated, // auth is coming from root reducer at /reducers/index.js
  error: state.error,
});

export default connect(mapStateToProps, {
  getSingleOrder,
  deleteOrder,
  updateOrder,
  clearErrors,
  getOrders,
})(withStyles(useStyles)(orderDetails));
