import React, { Component } from "react";

class CategoryButton extends Component {
  state = {
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
        href="#"
      >
        {this.getValue()}
      </a>
    );
  }

  getValue() {
    return this.props.value;
  }
}

export default CategoryButton;
