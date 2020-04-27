import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
// import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer";
import Container from "./components/container";

class App extends Component {
  state = {};

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters: counters });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <NavBar />
            <Container />
            <Footer />
          </div>
        </Router>

        {/* <Counters /> */}
        {/* <main className="container mt-5 ">
          <Counters
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            counters={this.state.counters}
          />
        </main> */}
      </React.Fragment>
    );
  }
}

export default App;
