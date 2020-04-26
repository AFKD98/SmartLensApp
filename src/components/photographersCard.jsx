//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/photographersSelection.css";
import p2 from "../assets/p2.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PhotographersCard extends Component {
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      Key: this.props.Photographer.Key,
      PhotographersID: this.props.Photographer.Key,
      name: this.props.Photographer.name,
      level: this.props.Photographer.level,
      range: this.props.Photographer.range,
    };
    this.confirmLevel = this.confirmLevel.bind(this);
  }

  confirmLevel() {
    if (
      (this.state.level === this.props.levelOfPhotographer ||
        this.props.levelOfPhotographer === "All") &&
      this.props.upperRange >= this.state.range &&
      this.state.range >= this.props.lowerRange
    ) {
      return (
        <Col className="col-4">
        <Card className="cardStyle py-auto px-auto mx-auto my-auto">
          {/* card image will come from the DB once the images storage is enabled */}
          <Card.Img top width="100%" src={p2} />
          <Card.Body className="py-auto px-auto mx-auto my-auto">
            <Card.Title className="py-auto px-auto mx-auto my-auto">
              {this.state.name}
            </Card.Title>
            <Card.Text className="py-auto px-auto mx-auto my-auto">
              <ul>
                <li>Level {this.state.level}</li>{" "}
                <li>Price {this.state.range}</li>
              </ul>
              {}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="text-center"><a
              className="btn btn-primary my-3"
              href={"/profile/" + this.state.PhotographersID} //passing the value of category to the link
            >
              <div className="cardpara">View</div>
            </a></div>

          </Card.Footer>
        </Card>
        </Col>
      );
    } else {
      return null;
    }
  }
  render() {
    {
      return <React.Fragment>{this.confirmLevel()}</React.Fragment>;
    }
  }
}

export default PhotographersCard;
