import React from "react";
import "./App.css";
import ThemeSwitcher from "./components/presenters/ThemeSwitch";
import ArcticlesContainer from "./components/containers/ArcticlesContainer";
import Arcticles from "./components/presenters/Arcticles";
import Header from "./components/presenters/Header";

class App extends React.Component {
 
  render() {
    return (
      <div className="App">
        <div className="arcticles">
        <ArcticlesContainer>
            <Header />
            <Arcticles />
            <ThemeSwitcher />
        </ArcticlesContainer>
        </div>
      </div>
    );
  }
}

export default App;
