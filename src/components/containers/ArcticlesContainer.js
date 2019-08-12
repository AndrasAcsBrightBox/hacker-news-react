import React, { Component } from "react";
import PubSub from "pubsub-js";
import HnBaseUrlContext from "../../contexts/HnBaseUrlContext";

class ArcticlesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arcticleCount: 0,
      arcticles: [],
      filterTerm: ""
    };
  }

  async resolveStoryPromise(data, index) {
    const response = await fetch(
      `${this.context.url}item/${data[index]}.json`
    );
    const arcticle = await response.json();

    // We need to promisify the set timeout, as it is not returning with a Promise.
    return await new Promise(resolve =>
      setTimeout(
        this.resolveSingleArcticle(arcticle, index, resolve),
        1000 * Math.random() + index * 500 * Math.random()
      )
    );
  }

  resolveSingleArcticle = (arcticle, index, resolve) => {
    resolve({
      index: index,
      id: arcticle.id,
      title: arcticle.title,
      author: arcticle.by,
      url: arcticle.url,
      time: arcticle.time,
      commentCount: arcticle.kids ? arcticle.kids.length : 0,
      score: arcticle.score,
      visible: true
    });
  };

  onFilter = (message, searchValue) => {
    this.setState({
      arcticles: this.state.arcticles.map(arcticle => {
        arcticle.visible =
          arcticle.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        return arcticle;
      }),
      filterTerm: searchValue
    });
  };

  async componentDidMount() {
    const arcticles = [];
    const arcticleCount = 30;
    const startIndex =
      this.props.startArcticlesFrom != null
        ? parseInt(this.props.startArcticlesFrom)
        : 0;
    for (let index = startIndex; index < arcticleCount + startIndex; index++) {
      arcticles[index] = {
        index: index,
        url: "",
        title: "",
        score: "",
        author: "",
        time: new Date(),
        commentCount: 0,
        visible: true
      };
    }

    this.setState({ arcticles: arcticles });

    const response = await fetch(`${this.context.url}topstories.json`);
    const topStories = await response.json();
    this.setState({ arcticleCount: topStories.length });

    arcticles.forEach(async (arcticle, index) => {
      const storyDetails = await this.resolveStoryPromise(topStories, index);
      arcticles[index] = storyDetails;
      this.setState({ arcticles: arcticles });
      if (this.state.filterTerm) {
        this.onFilter(this.state.filterTerm);
      }
    });

    PubSub.subscribe("search__value--change", this.onFilter);
  }

  render() {
    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            arcticles: this.state.arcticles,
            filterTerm: this.state.filterTerm,
            arcticleCount: this.state.arcticleCount
          })
        )}
      </React.Fragment>
    );
  }
}

ArcticlesContainer.contextType = HnBaseUrlContext;

export default ArcticlesContainer;
