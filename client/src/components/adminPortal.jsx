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
import Paper from "@material-ui/core/Paper";
import { getOrders, deleteOrder, updateOrder } from "../actions/orderActions"; //stored as a prop
import { loadUser } from "../actions/authActions";
import PropTypes from "prop-types"; // validation
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paperBig: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "lightgrey",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  heading: {
    padding: theme.spacing(2),
  },
});

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "ClientName" },
        { title: "Budget", field: "Budget", type: "numeric" },
        { title: "Date", field: "date", type: "date" },
        { title: "Category", field: "Category" },
        { title: "Photographer", field: "Photographer" },
        {
          title: "Approved",
          field: "Approved",
          lookup: { true: "Yes", false: "No" },
        },
      ],
      data: [],
    };
  }

  componentDidMount() {
    this.props.getOrders();
    this.setState({
      data: this.props.orders.ordersList,
    });
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
    return (
      <Container maxWidth="xl">
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <React.Fragment>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={4}>
                  <Typography
                    component="h1"
                    variant="h4"
                    className={classes.heading}
                  >
                    Welcome!
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
            <MaterialTable
              title="Booking requests"
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
                        this.props.updateOrder(newData);
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
                        this.props.deleteOrder(del_id);
                        this.setState({
                          data: data.filter((order) => order._id !== del_id),
                        });
                      }
                      resolve();
                    }, 1000);
                  }),
              }}
              icons={tableIcons}
              detailPanel={(rowData) => {
                return (
                  console.log(rowData),
                  (
                    <div className={classes.root}>
                      <Grid container item xs={12} spacing={3}>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Paper className={classes.paperBig}>
                              <Typography variant="subtitle2">
                                ContactNumber
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={8}>
                            <Paper className={classes.paper}>
                              {rowData.ContactNumber}
                            </Paper>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Paper className={classes.paperBig}>
                              <Typography variant="subtitle2">Email</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={8}>
                            <Paper className={classes.paper}>
                              {rowData.Email}
                            </Paper>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Paper className={classes.paperBig}>
                              <Typography variant="subtitle2">
                                Location
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={8}>
                            <Paper className={classes.paper}>
                              {rowData.Location}
                            </Paper>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Paper className={classes.paperBig}>
                              <Typography variant="subtitle2">
                                Expertise
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={8}>
                            <Paper className={classes.paper}>
                              {rowData.Expertise}
                            </Paper>
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          <Grid item xs={4}>
                            <Paper className={classes.paperBig}>
                              <Typography variant="subtitle2">
                                Event Description
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={8}>
                            <Paper className={classes.paper}>
                              {rowData.Event_Description}
                            </Paper>
                          </Grid>
                        </React.Fragment>
                      </Grid>

                      {/* <MaterialTable
                      title="Details"
                      columns={[
                        { title: "ContactNumber", field: "ContactNumber" },
                        { title: "Email", field: "Email" },
                        { title: "Location", field: "Location" },
                        { title: "Budget", field: "Budget", type: "numeric" },
                        {
                          title: "Expertise",
                          field: "Expertise",
                          type: "date",
                        },
                      ]}
                      data={rowData}
                      icons={tableIcons}
                      ></MaterialTable> */}
                    </div>
                  )
                );
              }}
              onRowClick={(event, rowData, togglePanel) => togglePanel()}
              // return (
              //   <div>
              //     <Typography component="h4" variant="h4">
              //       rowData.ClientName
              //       {/* rowData.ClientName,{rowData.ContactNumber},{rowData.Email},
              //   {rowData.Location},{rowData.Category},{rowData.Photographer},
              //   {rowData.Budget},{rowData.Expertise},
              //   {rowData.Event_Description},{rowData.Approved},{rowData.date} */}
              //     </Typography>
              //   </div>
              // );
            />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Container>
    );
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
})(withStyles(useStyles)(OrdersList)); //exporting a component make it reusable and this is the beauty of react
