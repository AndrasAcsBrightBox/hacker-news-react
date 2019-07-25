import React from "react";

class Search extends React.Component {
  onchange(eventArgs) {
    this.props.onSearch(eventArgs.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Search.."
        onChange={this.onchange.bind(this)}
      />
    );
  }
}

export default Search;
