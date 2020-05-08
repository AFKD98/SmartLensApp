import React, { Component, forwardRef } from "react";
import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Print from "@material-ui/icons/Print";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  getPhotographers,
  deletePhotographer,
  updatePhotographerText,
} from "../actions/photographerActions"; //stored as a prop
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types"; // validation
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

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

class PhotographersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "Name" },
        { title: "Username", field: "Username" },
        { title: "ContactNumber", field: "ContactNumber", type: "numeric" },
        { title: "Email", field: "Email" },
        { title: "Level", field: "Level", type: "numeric" },
        { title: "Range", field: "Range" },
        { title: "Address", field: "Address" },
        { title: "Equipment", field: "Equipment" },
        { title: "Category", field: "Category" },
      ],
      data: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    await this.props.loadUser();
    await this.props.getPhotographers();
    this.setState({
      data: [...this.props.photographers.photographersList],
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.photographers.loading !== prevProps.photographers.loading) {
      console.log("updated");
      this.setState({
        data: [...this.props.photographers.photographersList],
      });
    }
  }
  static propTypes = {
    getPhotographers: PropTypes.func.isRequired,
    deletePhotographer: PropTypes.func.isRequired,
    updatePhotographerText: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    photographers: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  render() {
    const tableIcons = {
      // Add: forwardRef((props, ref) => <Add {...props} ref={ref} color='action' />),
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => (
        <DeleteOutline {...props} ref={ref} />
      )),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      Print: forwardRef((props, ref) => <Print {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowUpward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => (
        <ViewColumn {...props} ref={ref} />
      )),
    };
    const { classes } = this.props;
    const { loading } = this.props.photographers;
    return (
      <Container maxWidth="xl">
        {this.props.isAuthenticated ? (
          <React.Fragment>
            {!loading ? (
              <React.Fragment>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <Typography
                      component="h1"
                      variant="h4"
                      className={classes.heading}
                    >
                      Photographers
                    </Typography>
                  </Grid>
                </Grid>
                <MaterialTable
                  title="Current Photographers"
                  columns={this.state.columns}
                  data={this.state.data}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          {
                            let data = this.state.data;
                            const index = data.indexOf(oldData);
                            const temp_old = data.filter(
                              (order) => order._id !== data[index]._id
                            );
                            this.props.updatePhotographerText(newData);
                            this.setState((prevState) => ({
                              data: [...temp_old, newData],
                            }));
                          }
                          resolve();
                        }, 1000);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          {
                            let data = this.state.data;
                            const index = data.indexOf(oldData);
                            const del_id = data[index]._id;
                            this.props.deletePhotographer(del_id);
                            this.setState({
                              data: data.filter(
                                (order) => order._id !== del_id
                              ),
                            });
                          }
                          resolve();
                        }, 1000);
                      }),
                  }}
                  icons={tableIcons}
                  detailPanel={(rowData) => {
                    return (
                      <div className={classes.root}>
                        <Grid container spacing={2} justify="center">
                          <Grid item xs={2}>
                            <Typography className={classes.subtitle2}>
                              Photographer Bio
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography className={classes.subtitle1}>
                              {rowData.Bio}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    );
                  }}
                  onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <Typography
                      component="h1"
                      variant="h4"
                      className={classes.heading}
                    >
                      Loading
                    </Typography>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  orders: state.orders, // orders is coming from root reducer at /reducers/index.js
  photographers: state.photographers,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, {
  getPhotographers,
  deletePhotographer,
  updatePhotographerText,
  loadUser,
})(withStyles(useStyles)(PhotographersList)); //exporting a component make it reusable and this is the beauty of react
