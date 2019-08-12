import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import Home from "./components/presenters/Home";
import CommentsContainer from "./components/containers/CommentsContainer";
import Header from "./components/presenters/Header";
import Search from "./components/presenters/Search";

class App extends React.Component {
  render() {
    return (
      <div className="full-content">
          <Router>
            <Header>
              {/* Search, for now should be only presented on the Home page. */}
              <Route path="/:id?" exact component={Search} />
            </Header>
            <Route path="/:id?" exact component={Home} />
            <Route path="/comments/:id" exact component={CommentsContainer} />
          </Router>
      </div>
    );
  }
}

export default App;
