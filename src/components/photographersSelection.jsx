//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import Recphoto from "../assets/Recommend.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import PhotographersCard from "./photographersCard";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

class PhotographerSelection extends Component {
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      photographers: [],
      categoryKey: this.props.match.params.id, //to catch the Category ID recieved from previous page use console.log(this.props) to see props coming from previous pages
      photographerKeys: [],
      levelOfPhotographer: "All",
    };

    this.jumbotronCode = this.jumbotronCode.bind(this); //renders the jumbotron
    this.getPhotographers = this.getPhotographers.bind(this); //gets the photographer profiles of that particular category clicked
    this.handleClick = this.handleClick.bind(this);
  }

  jumbotronCode() {
    return (
      <div
        style={{
          backgroundImage: "url(" + Recphoto + ")",
          paddingTop: 50,
          padding: 50,
          paddingBottom: 50,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "70vh",
        }}
        className="jumbotron jumbotron-fluid"
        className="text-right p-5"
      >
        <div className="container">
          <h1
            className="display-4"
            className="text-center text-white pr-auto pt-auto pb-auto mt-auto"
          >
            Wedding
          </h1>
          <p
            className="lead medium"
            className="text-center text-white pr-auto mt-auto"
          >
            Fill the form below and we will get back to you with a<br />
            photographer that best suits your needs. You'll have a<br />
            photographer in less than 24 hours!
            <br />
          </p>
        </div>
      </div>
    );
  }

  getPhotographers(photographerKeys) {
    photographerKeys.map((photographerKey) => {
      axios //sending a get request to get all the photographers of the category from Mongo
        .get("http://localhost:5000/photographers/" + photographerKey.Key)
        .then((res) => {
          this.setState({
            photographers: this.state.photographers.concat([
              //storing all the photographer ids and their name values in my local state array
              {
                Key: res.data._id,
                name: res.data.Name,
                level: res.data.Level,
                range: res.data.Range,
              },
            ]),
          });
          // console.log(this.state.photographers);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  handleClick(event) {
    this.setState({ levelOfPhotographer: event.target.value });
  }
  componentDidUpdate() {
    // console.log(this.state.levelOfPhotographer);
  }
  componentDidMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the photographers of the category from Mongo
      .get("http://localhost:5000/categories/" + this.state.categoryKey)
      .then((res) => {
        res.data.photographers.map((entree) =>
          this.setState({
            photographerKeys: this.state.photographerKeys.concat([
              //storing all the photographer ids of a particular category in my local state array
              {
                Key: entree,
              },
            ]),
          })
        );
        this.getPhotographers(this.state.photographerKeys);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let cards = this.state.photographers.map((Photographer) => {
      return (
        <Col lg="auto" sm="auto" md="auto">
          <PhotographersCard
            Photographer={Photographer}
            levelOfPhotographer={this.state.levelOfPhotographer}
          />
        </Col>
      );
    });
    return (
      <React.Fragment>
        {this.jumbotronCode()}
        <Container fluid>
          <ToggleButtonGroup
            type="radio"
            name="options"
            defaultValue={1}
            onClick={this.handleClick}
          >
            <ToggleButton value={"All"}>All</ToggleButton>
            <ToggleButton value={"Silver"}>Silver</ToggleButton>
            <ToggleButton value={"Gold"}>Gold</ToggleButton>
            <ToggleButton value={"Platinum"}>Platinum</ToggleButton>
          </ToggleButtonGroup>
        </Container>
        <Container fluid>
          {/* For a responsive grid all things set to auto */}
          <Row lg="auto" sm="auto" md="auto">
            {/* loading the card component in the grid from PhotographersCard */}
            {cards}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default PhotographerSelection;
