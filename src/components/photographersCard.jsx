import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/photographersSelection.css";
import p2 from "../assets/p2.jpg";
import CardGroup from "react-bootstrap/CardGroup";
import CardDeck from "react-bootstrap/CardDeck";

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
  }
  render() {
    return (
      <Card className="cardStyle py-auto px-auto mx-auto my-auto">
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
          <a
            className="btn btn-primary text-center mr-2 mt-5 "
            href={"/profile/" + this.state.PhotographersID} //passing the value of category to the link
          >
            View
          </a>
        </Card.Footer>
      </Card>
    );
  }
}

export default PhotographersCard;
