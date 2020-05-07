//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../styles/photographersSelection.css";
import p2 from "../assets/p2.jpg";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class PhotographersCard extends Component {
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      key: this.props.id,
      PhotographersID: this.props.id,
      name: this.props.Photographer.name,
      level: this.props.Photographer.level,
      range: this.props.Photographer.range,
      profilePic: this.props.Photographer.profilePic,
      coverPic: this.props.Photographer.coverPic,
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
        <Col className="col-12 col-md-4">
          <Card>
            {/* card image will come from the DB once the images storage is enabled */}
            <Card.Img
              width="100%"
              src={
                "https://smartlensapplication.herokuapp.com/" +
                this.state.profilePic
              }
              onerror="this.style.display='none';"
            />
            <Card.Body className="py-auto px-auto mx-auto my-auto">
              <Card.Title className="py-auto px-auto mx-auto my-auto">
                {this.state.name}
              </Card.Title>
              <Card.Text className="py-auto px-auto mx-auto my-auto">
                Level: {this.state.level}
                <br />
                Price: {this.state.range}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <a
                  key={3}
                  className=" btn btn-dark my-3"
                  href={"/profile/" + this.state.PhotographersID} //passing the value of category to the link
                >
                  <div className="cardpara">View</div>
                </a>
              </div>
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
