import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatComponent from "./ChatComponent";
import MainPage from "./MainPage";

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/play">
          <ChatComponent />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
