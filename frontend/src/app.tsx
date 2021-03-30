import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingGamePage from "./Pages/LoadingGamePage";
import MainPage from "./Pages/MainPage";

export default function App(): React.ReactElement {
  useEffect(() => {
    document.title = "Charades.me!";
  }, []);

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/play/:gameId">
          <LoadingGamePage />
        </Route>
        <Route path="/">
          <MainPage gameId={undefined} />
        </Route>
      </Routes>
    </Router>
  );
}
