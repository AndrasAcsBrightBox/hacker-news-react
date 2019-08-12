import React from "react";
import PubSub from 'pubsub-js'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onchange = this.onchange.bind(this);
  }
  
  onchange(eventArgs) {
    PubSub.publish('search__value--change', eventArgs.target.value);
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

export default Search;
