import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer";
import Container from "./components/container";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Router>
            <div>
              <NavBar />
              <Container />
              <Footer />
            </div>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
