import React, { Component } from "react";
import Search from "./Search";

class Header extends Component {
  constructor(props) {
    super(props);
    if(typeof this.props.onFilter != 'function') {
      throw new Error('Props must contain an "onFilter()" function.');
    }
    this.onFilter = this.props.onFilter.bind(this);
  }

  render() {
    return (
      <div className="header">
        <div className="page-title">
          <h1 className="page-title__text">Hacker News App</h1>
          <div />
          <Search onFilter={this.onFilter} />
        </div>
        <h4>To learn React by building a real world application.</h4>
        </div>
    );
  }
}

export default Header;
