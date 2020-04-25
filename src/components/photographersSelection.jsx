//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import Recphoto from "../assets/Recommend.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import PhotographersCard from "./photographersCard";
import Filter from "./filter";

class PhotographerSelection extends Component {
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      photographers: [],
      categoryKey: this.props.match.params.id, //to catch the Category ID recieved from previous page use console.log(this.props) to see props coming from previous pages
      photographerKeys: [],
      levelOfPhotographer: "All",
      cards: [],
      lowerRange: 0,
      upperRange: 300000,
      min: 0,
      max: 10000000,
    };

    this.jumbotronCode = this.jumbotronCode.bind(this); //renders the jumbotron
    this.getPhotographers = this.getPhotographers.bind(this); //gets the photographer profiles of that particular category clicked
    // this.getCards = this.getCards.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleSortby = this.handleSortby.bind(this);
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
                rangeNumber:
                  res.data.Range === "Silver"
                    ? 0
                    : "Gold"
                    ? 1
                    : "Platinum"
                    ? 2
                    : -1,
              },
            ]),
          });
          // console.log(this.state.photographers);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    this.setState({
      min: Math.min(...this.state.photographers.map((item) => item.range)),
      max: Math.max(...this.state.photographers.map((item) => item.range)),
    });
  }
  handleClick(event) {
    //for setting level filter
    this.setState({ levelOfPhotographer: event.target.value });
  }

  handleRangeChange(event) {
    //for setting range filter
    this.setState({ lowerRange: event[0], upperRange: event[1] });
  }

  handleSortby(event) {
    //sort by function is sorting properly but something wrong when rendering probably cause setstate is async
    if (event.target.id == 0) {
      this.setState({
        photographers: this.state.photographers.sort((a, b) =>
          a.range > b.range ? 1 : -1
        ),
      });
    }
  }
  componentDidUpdate() {
    // console.log(this.state.photographers);
    console.log(this.state.min, this.state.max);
  }
  componentWillMount() {
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
    // console.log(this.state.photographers);
    let cards = this.state.photographers.map((Photographer) => {
      //cards that we render from the cards component
      return (
        <Col lg="auto" sm="auto" md="auto">
          <PhotographersCard
            Photographer={Photographer}
            levelOfPhotographer={this.state.levelOfPhotographer}
            lowerRange={this.state.lowerRange}
            upperRange={this.state.upperRange}
          />
        </Col>
      );
    });
    console.log("b");
    return (
      <React.Fragment>
        {this.jumbotronCode()}
        <Container fluid>
          <Filter //contains the level and range filter
            handleClick={this.handleClick}
            handleRangeChange={this.handleRangeChange}
            handleSortby={this.handleSortby}
          />
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
