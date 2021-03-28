import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GamePage from "./Pages/GamePage";
import MainPage from "./Pages/MainPage";

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/play">
          <GamePage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}