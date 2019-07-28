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
      <React.Fragment>
        <div className="title">
          <h1>Hacker News App</h1>
          <div />
          <div className="search">
            <Search onFilter={this.onFilter} />
          </div>
        </div>
        <h4>To learn React by building a real world application.</h4>
      </React.Fragment>
    );
  }
}

export default Header;
