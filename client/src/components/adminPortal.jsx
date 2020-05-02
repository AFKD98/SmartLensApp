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
import { getOrders } from "../actions/orderActions"; //stored as a prop
import PropTypes from "prop-types"; // validation

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "ClientName" },
        { title: "Contact", field: "ContactNumber" },
        { title: "Budget", field: "Budget", type: "numeric" },
        { title: "Date", field: "date", type: "date" },
        {
          title: "Approved",
          field: "Approved",
          lookup: { 1: "Yes", 2: "No" },
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
    return (
      <Container maxWidth="xl">
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <Typography component="h1" variant="h4" gutterBottom="true">
              Welcome!
            </Typography>
            <MaterialTable
              title="Booking requests"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ data }, () => resolve());
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
                        data.splice(index, 1);
                        this.setState({ data }, () => resolve());
                      }
                      resolve();
                    }, 1000);
                  }),
              }}
              icons={tableIcons}
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

export default connect(mapStateToProps, { getOrders })(OrdersList); //exporting a component make it reusable and this is the beauty of react
