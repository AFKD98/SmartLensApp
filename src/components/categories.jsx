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
    this.getCategories = this.getCategories.bind(this); // function to get categories from DB
  }

  getCategories() {
    axios
      .get("http://localhost:5000/categories/")
      .then((res) => {
        console.log(res.categoryname);
        this.setState({ categories: res.categoryname });
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
        className="jumbotron jumbotron-fluid"
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
            getCategories()
            {this.state.categories.map((Category) => (
              <CategoryButton className="fixed-center" value={Category} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Categories;
