import React from "react";
// import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import HomeView from "./homeView";
import Recommendation from "./Recommendation";
import Categories from "./categories";
// import Registration from "./registration";
import Profile from "./photographerProfile";
import PhotoReg from "./photographerRegisteration";
import PhotographerSelection from "./photographersSelection";
import EditProfile from "./EditphotographerProfile";
import Vision from "./vision";
import About from "./about";
import Table from "./adminPortal";
import Error from "./Error";

function Container() {
  return (
    // <Wrapper>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/recommendation/:type" component={Recommendation} />
      <Route path="/CategoriesPage" component={Categories} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/photoreg" component={PhotoReg} />
      <Route path="/editprofile" component={EditProfile} />
      <Route path="/vision" component={Vision} />
      <Route path="/about" component={About} />
      <Route
        path="/photographersSelection/:id"
        component={PhotographerSelection}
      />
      <Route path="/adminPortal" component={Table} />
      <Route component={Error} />
    </Switch>
    // </Wrapper>
  );
}

// const Wrapper = styled.div``;

export default Container;
