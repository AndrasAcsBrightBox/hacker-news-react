import React, { Component } from "react";

class ArcticlesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arcticles: [],
      filterTerm: ""
    };

    this.hnBaseEndpoint = `https://hacker-news.firebaseio.com/v0/`;
  }

  async resolveStoryPromise(data, index, startArcticlesFromIndex) {

    // TODO: find out why I end up with duplicated arcticles sometimes.
    let calculatedIndex = index;
    if(startArcticlesFromIndex != null) {
      calculatedIndex = index + parseInt(startArcticlesFromIndex);
    }

    const response = await fetch(
      `${this.hnBaseEndpoint}item/${data[calculatedIndex]}.json`
    );
    const arcticle = await response.json();

    // We need to promisify the set timeout, as it is not returning with a Promise.
    return await new Promise(resolve =>
      setTimeout(
        () =>
          resolve({
            index: calculatedIndex,
            id: arcticle.id,
            title: arcticle.title,
            author: arcticle.by,
            url: arcticle.url,
            time: arcticle.time,
            commentCount: arcticle.kids ? arcticle.kids.length : 0,
            score: arcticle.score,
            visible: true
          }),
        1000 * Math.random() + index * 500 * Math.random()
      )
    );
  }

  onFilter = searchValue => {
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
    for (let index = 0; index < arcticleCount; index++) {
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

    const response = await fetch(`${this.hnBaseEndpoint}topstories.json`);
    const topStories = await response.json();

    arcticles.forEach(async (arcticle, index) => {
      const storyDetails = await this.resolveStoryPromise(topStories, index, this.props.startArctclesFrom);
      arcticles[index] = storyDetails;
      this.setState({ arcticles: arcticles });
      if (this.state.filterTerm) {
        this.onFilter(this.state.filterTerm);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child, {
            arcticles: this.state.arcticles,
            onFilter: this.onFilter,
            filterTerm: this.state.filterTerm
          })
        )}
      </React.Fragment>
    );
  }
}

export default ArcticlesContainer;
