//Comments by Faraz, please contact him in case of queries

import React, { Component } from "react";
import CategoryButton from "./categoryButton";
import bg from "../assets/categories.jpg";
import axios from "axios";

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
      .get("http://localhost:5000/categories/")
      .then((res) => {
        res.data.map((entree) =>
          this.setState({
            categories: this.state.categories.concat([
              //storing all the category ids and their name values in my local state array
              { Key: entree._id, categoryName: entree.categoryname },
            ]),
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let styles = {
      display: "inline-block",
      backgroundPosition: "center",
    };
    return (
      <div
        style={{
          //jumbotron styles
          backgroundImage: "url(" + bg + ")",
          paddingTop: 50,
          padding: 50,
          paddingBottom: 50,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
        className="jumbotron jumbotron-fluid" //jumbotron
        className="text-right p-5"
      >
        <div className="container">
          <h2
            className="display-4"
            className="text-center text-white pr-5 pt-5 mt-5"
          >
            Lets find you a photographer
          </h2>
          <p
            className="lead medium"
            className="text-center text-white pr-5 mt-1"
          >
            Choose the categories you wish to browse <br />
          </p>
          <ul style={styles}>
            {/* displays the buttons, by passing key and value parameters to categoryButton component which then stores it in its state */}
            {this.state.categories.map((Category) => (
              <CategoryButton
                className="fixed-center"
                value={Category.categoryName}
                Key={Category.Key}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;
