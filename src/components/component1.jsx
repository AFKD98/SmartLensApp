import React, { Component } from "react";

class Component1 extends Component {
  state = {
    value: this.props.counter.value,
    tags: ["tag1", "tag2", "tag3", "tag4"],
  };

  styles = {
    fontSize: 50,
    fontWeight: 10,
  };

  render() {
    return (
      <React.Fragment>
        <span className={this.getClass()}>{this.func()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          {" "}
          increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }
  getClass() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.counter.value === 0 ? "primary" : "warning");
  }

  func() {
    return this.props.counter.value;
  }
}

export default Component1;
