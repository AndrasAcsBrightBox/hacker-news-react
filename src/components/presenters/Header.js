import React, { Component } from "react";

class Header extends Component {
  render() {
    let childComponent = React.Children.map(this.props.children, child =>
      React.cloneElement(child)
    );

    return (
      <div className="header">
        <div className="page-title">
          <h1 className="page-title__text">Hacker News App</h1>
          <div />
          {childComponent && childComponent.length > 0 ? (
            childComponent
          ) : (
            <div />
          )}
        </div>
        <h4>To learn React by building a real world application.</h4>
      </div>
    );
  }
}

export default Header;
