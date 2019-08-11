import React from "react";

class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false
    };
  }

  swithChange = () => {
    const nightCssClass = "page-container--night";
    const lightCssClass = "page-container--light";

    let newState = { isDark: !this.state.isDark };
    this.setState(newState);

    const body = document.getElementsByTagName("body")[0];
    body.classList.add(newState.isDark ? nightCssClass : lightCssClass);
    body.classList.remove(newState.isDark ? lightCssClass : nightCssClass);
  };

  render() {
    return (
      <div
        className={
          "theme-switcher " +
          (this.state.isDark
            ? "theme-switcher--night"
            : "theme-switcher--light")
        }
        onClick={this.swithChange}
      />
    );
  }
}

export default ThemeSwitcher;
