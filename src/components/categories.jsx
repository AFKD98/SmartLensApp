import React, { Component } from "react";
import CategoryButton from "./categoryButton";
import bg from "../assets/categories.jpg";

class Categories extends Component {
  state = {
    categories: [
      "category1",
      "category2",
      "category3",
      "category4",
      "category5",
      "category6",
      "category7",
    ],
  };

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
