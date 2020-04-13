import React from "react";
import styled from "styled-components";
import Categories from "../assets/categories.jpg";

function Second() {
  return (
    // <Wrapper>
    <div
      style={{
        backgroundImage: "url(" + Categories + ")",
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
        <p className="lead medium" className="text-center text-white pr-5 mt-1">
          Choose the categories you wish to browse <br />
        </p>
        <div className="list-group">
          <a className="list-group-item list-group-item-action" href="#">
            Category
          </a>
        </div>
      </div>
    </div>
    // </Wrapper>
  );
}

export default Second;
