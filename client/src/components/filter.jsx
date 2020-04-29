import React, { Component } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "rc-slider/assets/index.css";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/photographersSelection.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

        {/* Range filter */}
        <div className="container">
          <div className="rangetext pb-3">
            Choose the price range using the drag buttons <br />
          </div>
          <Range
            min={1000}
            max={300000}
            defaultValue={[100000, 250000]}
            step={1000}
            railStyle={"red"}
            allowCross={false}
            pushable={100}
            handleStyle={[
              {
                backgroundColor: "white",
                width: "24px",
                height: "24px",
              },
            ]}
            railStyle={{ backgroundColor: "#72D0ED", height: "10px" }}
            trackStyle={[
              {
                backgroundColor: "gray",
                height: "10px",
              },
            ]}
            onAfterChange={this.props.handleRangeChange}
          >
            <br />
          </Range>
          <Row className="pt-4">
            {/* <Col>
              <Dropdown className="pb-3">
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
            </Col> */}
            {/* Level filter */}
            <Col className="expertise">
              <ToggleButtonGroup
                className="pb-5 expertise"
                type="radio"
                name="options"
                defaultValue={1}
                onClick={this.props.handleClick}
              >
                <ToggleButton className="btn btn-dark" value={"All"}>
                  All
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Silver"}>
                  Silver
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Gold"}>
                  Gold
                </ToggleButton>
                <ToggleButton className="btn btn-dark" value={"Platinum"}>
                  Platinum
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
