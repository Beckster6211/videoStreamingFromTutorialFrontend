import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import the router package
import Home from "./home";
import Player from "./player";
// import components
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/player/:id" component={Player}></Route>
        {/* notice the dynamic :id which would match anything that matches the pattern. This is how we pass the id to the Player component. */}
      </Switch>
    </Router>
  );
}

// single video element and the src is the route on our server that serves the sample video file.
export default App;
