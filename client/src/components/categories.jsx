//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import CategoryButton from "./categoryButton";
// import bg from "../assets/sideview.jpg";
import axios from "axios";
import "../styles/categories.css";

class Categories extends Component {
  constructor(props) {
    // constructor
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    //function runs at the start of component loading
    axios //sending a get request to get all the categories from Mongo
      .get("https://smartlensapplication.herokuapp.com/categories/")
      .then((res) => {
        res.data.map((entree) =>
          this.setState({
            categories: this.state.categories.concat([
              //storing all the category ids and their name values in my local state array
              {
                key: entree._id,
                id: entree._id,
                categoryName: entree.categoryname,
              },
            ]),
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // let styles = {
    //   display: "inline-block",
    //   backgroundPosition: "center",
    // };
    return (
      <div className="jumbotron jumbotron-fluid text-center cats">
        <div className="container cont">
          <h2 className="conte">Lets find you a photographer</h2>
          <p className="conte">
            Choose the category you wish to browse <br />
          </p>
          <ul className="catlist">
            {/* displays the buttons, by passing key and value parameters to categoryButton component which then stores it in its state */}
            {this.state.categories.map((Category) => (
              <CategoryButton
                className="fixed-center"
                value={Category.categoryName}
                key={Category.id}
                id={Category.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;
