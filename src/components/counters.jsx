import React, { Component } from "react";
import Component1 from "./component1";

class Counters extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset
        </button>
        <ul>
          {this.props.counters.map((Counter) => (
            <li>
              <Component1
                key={Counter.id}
                onDelete={this.props.onDelete}
                onIncrement={this.props.onIncrement}
                counter={Counter}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Counters;
