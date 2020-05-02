import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getOrders } from "../actions/orderActions"; //stored as a prop
import PropTypes from "prop-types"; // validation

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

class OrdersList extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  static propTypes = {
    getOrders: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  render() {
    const { ordersList } = this.props.orders;
    const { classes } = this.props;
    return (
      <Container maxWidth="lg">
        {this.props.isAuthenticated ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Contact</StyledTableCell>
                  <StyledTableCell align="right">Location</StyledTableCell>
                  <StyledTableCell align="right">Budget</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList.map((order) => (
                  <StyledTableRow key={order.ClientName}>
                    <StyledTableCell component="th" scope="row">
                      {order.ClientName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.ContactNumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.Location}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.Budget}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {order.date}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default connect(mapStateToProps, { getOrders })(
  withStyles(useStyles)(OrdersList)
); //exporting a component make it reusable and this is the beauty of react
