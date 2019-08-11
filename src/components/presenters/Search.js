import React from "react";
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onchange = this.onchange.bind(this);
  }
  
  onchange(eventArgs) {
    this.props.onFilter(eventArgs.target.value);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="Search.."
        onChange={this.onchange}
        className="search"
      />
    );
  }
}

Search.propTypes = {
  onFilter: PropTypes.func.isRequired
}

export default Search;
