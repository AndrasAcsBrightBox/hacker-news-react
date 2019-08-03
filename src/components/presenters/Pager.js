import React from "react";

class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.arcticleCountOnPage = 30;
    this.startIndex = 0;
    if (this.props.startArcticlesFrom) {
      this.startIndex = parseInt(this.props.startArcticlesFrom);
    }
  }

  createGoHome = startIndex => {
    if (startIndex > 0) {
      return <a href="/">First</a>;
    }
    return <React.Fragment />;
  };

  createGoBack = startIndex => {
    if (startIndex >= 30) {
      return (
        <a href={"/" + (startIndex - this.arcticleCountOnPage).toString()}>
          Previous ({startIndex - this.arcticleCountOnPage + 1}..
          {startIndex})
        </a>
      );
    }
    return <React.Fragment />;
  };

  createGoForward = (startIndex, arcticleCount) => {
    if (startIndex + this.arcticleCountOnPage < arcticleCount) {
      return (
        <a href={"/" + (startIndex + this.arcticleCountOnPage).toString()}>
          Next ({startIndex + this.arcticleCountOnPage + 1}..
          {startIndex + 2 * this.arcticleCountOnPage})
        </a>
      );
    }
    return <React.Fragment />;
  };

  createGoLast = (startIndex, arcticleCount) => {
    if (startIndex + this.arcticleCountOnPage < arcticleCount) {
      return (
        <a href={"/" + (arcticleCount - this.arcticleCountOnPage).toString()}>
          Last
        </a>
      );
    }
    return <React.Fragment />;
  };

  render() {
    return (
      <div class="pager">
        {this.createGoHome(this.startIndex)} &nbsp;&nbsp;
        {this.createGoBack(this.startIndex)} &nbsp;&nbsp;
        {this.createGoForward(this.startIndex, this.props.arcticleCount)} &nbsp;&nbsp;
        {this.createGoLast(this.startIndex, this.props.arcticleCount)}
      </div>
    );
  }
}

export default Pager;
