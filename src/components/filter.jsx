import React, { Component } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "rc-slider/assets/index.css";
import Dropdown from "react-bootstrap/Dropdown";

const Slider = require("rc-slider");
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Filter extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {/* This is the dropdown menu for sort by, please do not delete */}
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu flip={true} onClick={this.props.handleSortby}>
            <Dropdown.Item
              id={0}
              value="Price"
              // onSelect={this.props.handleSortby}
            >
              Price
            </Dropdown.Item>
            <Dropdown.Item id={1} value="Level">
              Expertise Level
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* Range filter */}
        <Range
          min={1000}
          max={300000}
          defaultValue={[100000, 250000]}
          step={1000}
          railStyle={"red"}
          allowCross={false}
          pushable={100}
          handleStyle={[
            { backgroundColor: "white" },
            { backgroundColor: "black" },
          ]}
          railStyle={{ backgroundColor: "#72D0ED" }}
          trackStyle={[
            { backgroundColor: "gray" },
            { backgroundColor: "gray" },
          ]}
          onAfterChange={this.props.handleRangeChange}
          className="width: 200px"
        >
          Choose the price range
        </Range>

        {/* Level filter */}
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={1}
          onClick={this.props.handleClick}
        >
          <br />
          Choose the level of Expertise
          <br />
          <ToggleButton value={"All"}>All</ToggleButton>
          <ToggleButton value={"Silver"}>Silver</ToggleButton>
          <ToggleButton value={"Gold"}>Gold</ToggleButton>
          <ToggleButton value={"Platinum"}>Platinum</ToggleButton>
        </ToggleButtonGroup>
      </React.Fragment>
    );
  }
}

export default Filter;
