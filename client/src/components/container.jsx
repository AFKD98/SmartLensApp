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
import Table from "./orderList";
import Error from "./Error";
import login from "./login";
import signup from "./signup";
import registrations from "./photographerRegistrationDetails";
import myphotographers from "./myphotographers";
import photographerlogin from "./login_photo";
import admin from "./adminPortal";

function Container() {
  return (
    // <Wrapper>
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/recommendation/:type/:level" component={Recommendation} />
      <Route path="/CategoryPage" component={Categories} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/photoreg" component={PhotoReg} />
      <Route path="/editprofile/:id" component={EditProfile} />
      <Route path="/vision" component={Vision} />
      <Route path="/about" component={About} />
      <Route
        path="/photographersSelection/:id"
        component={PhotographerSelection}
      />
      {/* <Route path="/adminPortal" component={admin} /> */}
      <Route path="/bookings" component={Table} />
      <Route path="/login" component={login} />
      <Route path="/signup" component={signup} />
      <Route path="/registrations" component={registrations} />
      <Route path="/myphotographers" component={myphotographers} />
      <Route path="/photographerLogin" component={photographerlogin} />
      <Route component={Error} />
    </Switch>
    // </Wrapper>
  );
}

// const Wrapper = styled.div``;

export default Container;
