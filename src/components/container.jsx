import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
// import HomeView from "./homeView";
import HomeView from "./homeView";
import Recommendation from "./Recommendation";
import Second from "./Second";
import Third from "./Third";
import Error from "./Error";
// import Footer from "./footer";

// import { TransitionGroup, CSSTransition } from "react-transition-group";

function Container() {
  return (
    <Wrapper>
      {/* <TransitionGroup>
        <CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }}> */}
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/first" component={Recommendation} />
        <Route path="/second" component={Second} />
        <Route path="/third" component={Third} />
        {/* <Route path="/contact" component={Footer} /> */}
        <Route component={Error} />
      </Switch>
      {/* </CSSTransition> */}
      {/* </TransitionGroup> */}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Container;
