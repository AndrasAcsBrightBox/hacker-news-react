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

  resolveStoryPromise = (resolve, data, index) => {
    fetch(`${this.hnBaseEndpoint}item/${data[index]}.json`)
      .then(res => res.json())
      .then(arcticle => {
        // TODO - remove this - only to demo the `skeleton` effect
        setTimeout(() => {
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
        }, 1000 * Math.random() + index * 500 * Math.random());
      });
  };

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

  componentDidMount = () => {
    fetch(`${this.hnBaseEndpoint}topstories.json`)
      .then(result => {
        return result.json();
      })
      .then(data => {
        const arcticlePromises = [];
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
          arcticlePromises.push(
            new Promise(resolve => {
              this.resolveStoryPromise(resolve, data, index);
            }).then(arcticle => {
              arcticles[arcticle.index] = arcticle;
              this.setState({ arcticles: arcticles });
              if (this.state.filterTerm) {
                this.onFilter(this.state.filterTerm);
              }
            })
          );
        }
        this.setState({ arcticles: arcticles });
      });
  }

  render() {
    return (
      <React.Fragment>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              arcticles: this.state.arcticles,
              onFilter: this.onFilter,
              filterTerm: this.state.filterTerm
            })
          )
        }
      </React.Fragment>
    );
  }
}

export default ArcticlesContainer;
