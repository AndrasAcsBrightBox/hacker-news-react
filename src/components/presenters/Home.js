import React from "react";

import ThemeSwitcher from "./ThemeSwitch";
import ArcticlesContainer from "../containers/ArcticlesContainer";
import ArticlesPresenter from "./ArticlesPresenter";
import Pager from "./Pager";

class Home extends React.Component {
  render() {
    return (
      <ArcticlesContainer startArcticlesFrom={this.props.match.params.id}>
        <ArticlesPresenter />
        <ThemeSwitcher />
        <Pager startArcticlesFrom={this.props.match.params.id} />
      </ArcticlesContainer>
    );
  }
}

export default Home;
