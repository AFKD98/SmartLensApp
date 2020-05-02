import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
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
      name: "",
      email: "",
      password: "",
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
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

    const { name, email, password } = this.state;

    // create user obj
    const newUser = {
      name,
      email,
      password,
    };

    //attempt to register
    this.props.register(newUser);

    // // close modal
    // this.toggle();
  };

  render() {
    const { classes } = this.props;
    // const { errors, username, password, isLoading } = this.state;
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        {this.props.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          console.log("not resgistered")
        )}
        <Typography component="h1" variant="h4">
          Create an account
        </Typography>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  isAuthenticated: state.auth.isAuthenticated, // auth is coming from root reducer at /reducers/index.js
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  withStyles(useStyles)(SignUp)
);
