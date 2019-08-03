import React from "react";

import ThemeSwitcher from "./ThemeSwitch";
import ArcticlesContainer from "../containers/ArcticlesContainer";
import Arcticles from "./Arcticles";
import Header from "./Header";

class Home extends React.Component {
  render() {
    return (
      <ArcticlesContainer startArcticlesFrom={this.props.match.params.id}>
        <Header />
        <Arcticles />
        <ThemeSwitcher />
      </ArcticlesContainer>
    );
  }
}

export default Home;
