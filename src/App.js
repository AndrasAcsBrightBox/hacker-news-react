import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"

import "./App.css";

import Home from './components/presenters/Home';

class App extends React.Component {
 
  render() {
    return (
      <div className="App">
        <div className="arcticles">
          <Router>
            <Route path="/:id?" exact component={Home} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
