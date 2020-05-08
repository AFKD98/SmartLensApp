import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPhotographer } from "../actions/photographerActions";
import { loadUser } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";

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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Username: "",
      Password: "",
      ContactNumber: "",
      Email: "",
      Calendar: "", //calendar link
      Level: "",
      Range: "",
      Address: "",
      Equipment: "",
      Bio: "",
      Category: "", //check number of categories
      photos: "",
      videos: "",
      date: new Date(),
      ProfilePic: "",
      CoverPic: "",
      msg: null,
    };
  }
  async componentDidMount() {
    await this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    addPhotographer: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for reg error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // create user obj
    const newLad = {
      //  this.state.photographer
      Name: this.state.Name,
      Username: this.state.Username,
      Password: this.state.Password,
      ContactNumber: this.state.ContactNumber,
      Email: this.state.Email,
      Calendar: this.state.Calendar, //calendar link
      Level: this.state.Level,
      Range: this.state.Range,
      Address: this.state.Address,
      Equipment: this.state.Equipment,
      Bio: this.state.Bio,
      Category: this.state.Category, //check number of categories
      photos: this.state.photos,
      videos: this.state.videos,
      date: this.state.date,
      ProfilePic: "",
      CoverPic: "",
    };

    //attempt to register
    this.props.addPhotographer(newLad);

    // // close modal
    // this.toggle();
  };

  render() {
    const { classes } = this.props;
    // const { errors, username, password, isLoading } = this.state;
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Typography component="h1" variant="h4">
              Create a Photographer account
            </Typography>
            <form onSubmit={this.onSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Name"
                name="Name"
                autoComplete="name"
                autoFocus
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="name"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                type="email"
                autoComplete="email"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ContactNumber"
                label="Contact Number"
                name="ContactNumber"
                type="number"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Calendar"
                label="Calendar Link"
                name="Calendar"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Level"
                label="Level"
                name="Level"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Range"
                label="Range"
                name="Range"
                type="number"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Address"
                label="Address"
                name="Address"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Equipment"
                label="Equipment"
                name="Equipment"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Bio"
                label="Bio"
                name="Bio"
                onChange={this.onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Category"
                label="Category"
                name="Category"
                onChange={this.onChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create account
              </Button>
            </form>
          </React.Fragment>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  isAuthenticated: state.auth.isAuthenticated, // auth is coming from root reducer at /reducers/index.js
  error: state.error,
});

export default connect(mapStateToProps, {
  addPhotographer,
  clearErrors,
  loadUser,
})(withStyles(useStyles)(SignUp));
