import React, { Component } from "react";
//single button component for categories
class CategoryButton extends Component {
  state = {
    Key: this.props.Key,
    value: this.props.value,
  };

  styles = {
    fontSize: 50,
    fontWeight: 10,
  };

  render() {
    return (
      <a
        className="btn btn-outline-light text-center mr-2 mt-5 fixed=-center"
        href={"/photographersSelection/" + this.state.Key} //passing the value of category to the link
      >
        {this.getValue()}
      </a>
    );
  }

  getValue() {
    return this.props.value; //returns the value "name" of the category
  }
}

export default CategoryButton;
