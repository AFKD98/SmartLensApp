import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginPhotographer } from "../actions/authActions";
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

class PhotoLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    loginPhotographer: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
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

    const { Email, Password } = this.state;
    const user = {
      Email,
      Password,
    };
    this.props.loginPhotographer(user);
  };

  render() {
    const { classes } = this.props;
    // const { errors, username, password, isLoading } = this.state;
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        {this.props.isAuthenticated ? (
          <Redirect to={"/editprofile/" + this.props.bigAuth.user.id} />
        ) : null}

        <Typography component="h1" variant="h4">
          Photographer Sign in
        </Typography>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email"
            name="Email"
            autoComplete="Email"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="Password"
            id="Password"
            autoComplete="off"
            onChange={this.onChange}
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
            Sign In
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  bigAuth: state.auth,
  isAuthenticated: state.auth.isAuthenticated, // auth is coming from root reducer at /reducers/index.js
  error: state.error,
});

export default connect(mapStateToProps, { loginPhotographer, clearErrors })(
  withStyles(useStyles)(PhotoLoginPage)
);
