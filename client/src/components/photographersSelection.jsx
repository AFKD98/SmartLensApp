//Comments by Faraz, please contact him in case of queries...marzi hai faraz sb

import React, { Component } from "react";
import Recphoto from "../assets/Recommend.jpg";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import axios from "axios";
import PhotographersCard from "./photographersCard";
import Filter from "./filter";
import "../styles/photographersSelection.css";

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
      categoryName: "",
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
          height: "70vh",
        }}
        className="jumbotron jumbotron-fluid pb-5"
      >
        <div className="container">
          <h1 className="display-4 text-center text-white pr-auto pt-auto pb-auto mt-auto">
            {this.state.categoryName}
          </h1>
        </div>
      </div>
    );
  }

  getPhotographers(photographerKeys) {
    photographerKeys.map((photographerKey) => {
      axios //sending a get request to get all the photographers of the category from Mongo
        .get("http://localhost:5000/photographers/" + photographerKey.id)
        .then((res) => {
          this.setState({
            photographers: this.state.photographers.concat([
              //storing all the photographer ids and their name values in my local state array
              {
                key: res.data._id,
                id: res.data._id,
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
    // this.setState({
    //   min: Math.min(...this.state.photographers.map((item) => item.range)),
    //   max: Math.max(...this.state.photographers.map((item) => item.range)),
    // });
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
    if (event.target.id === 0) {
      this.setState({
        photographers: this.state.photographers.sort((a, b) =>
          a.range > b.range ? 1 : -1
        ),
      });
    }
  }
  componentDidUpdate() {
    // console.log(this.state.photographers);
    // console.log(this.state.min, this.state.max);
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
                key: entree,
                id: entree,
              },
            ]),
            categoryName: res.data.categoryname,
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
        <PhotographersCard
          key={Photographer.id}
          id={Photographer.id}
          Photographer={Photographer}
          levelOfPhotographer={this.state.levelOfPhotographer}
          lowerRange={this.state.lowerRange}
          upperRange={this.state.upperRange}
        />
      );
    });
    return (
      <React.Fragment>
        {this.jumbotronCode()}
        <div className="container rangetext">
          <Filter //contains the level and range filter
            handleClick={this.handleClick}
            handleRangeChange={this.handleRangeChange}
            handleSortby={this.handleSortby}
          />
          {/* For a responsive grid all things set to auto */}
          <Row className="pb-5">
            {/* loading the card component in the grid from PhotographersCard */}
            {cards}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default PhotographerSelection;
